import { Component, inject } from '@angular/core';
import '@stripe/stripe-js';
import { StorageServiceService } from './storage-service.service';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { Auth, idToken, authState, User } from '@angular/fire/auth';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  private auth = inject(Auth);
  private idToken$ = idToken(this.auth);
  private authState$ = authState(this.auth);
  private authStateSubscription!: Subscription;
  private idTokenSubscription!: Subscription;

  constructor(
    private storageService: StorageServiceService,
    private router: Router
  ) {
    this.initializeStorage();
    this.subscribeToAuthState();
  }

  async initializeStorage(): Promise<void> {
    await this.storageService.init();
    console.log("Storage Initialized");
  }

  subscribeToAuthState(): void {
    this.authStateSubscription = this.authState$.subscribe((aUser: User | null) => {
      console.log("Auth State Changed:", aUser);
      // Handle auth state changes here
    });
  }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      console.log("Navigated to:", this.router.url);
      this.handleNavigation(this.router.url);
    });
  }


  async handleNavigation(url: string): Promise<void> {
    try {
    
      const isValidUser = await this.storageService.get("validUser");
      const isVerified = await this.storageService.get("verified");
      console.log(url,isValidUser,isVerified)
      if (!url || url === '/') {
        if (isValidUser) {
          if(isVerified){
            this.router.navigate(['/home']);
          }else{
            this.router.navigate(['/register']);
          }
        
        } else {
          this.router.navigate(['/login']);
        }
      } else if (!isValidUser) {
        this.router.navigate(['/login']);
      }
      // If the URL is not empty and the user is valid, do nothing.
    } catch (error) {
      console.error("Navigation Error:", error);
      this.router.navigate(['/login']);
    }
  }


  ngOnDestroy(): void {
    if (this.authStateSubscription) {
      this.authStateSubscription.unsubscribe();
    }
    if (this.idTokenSubscription) {
      this.idTokenSubscription.unsubscribe();
    }
  }
}
