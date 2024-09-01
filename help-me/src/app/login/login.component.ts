import { Component, NgZone, OnInit, inject } from '@angular/core';
// import { supabase } from '../supabase-auth-setting.service';

import { SupabaseAuthSettingService } from '../supabase-auth-setting.service';
// import * as  firebase  from 'firebase/auth';
// import { Storage } from '@ionic/storage-angular';
import { Router, RouterOutlet } from '@angular/router';
import { StorageServiceService } from '../storage-service.service';
// import { FirebaseApp } from 'firebase/app';
import { LoadingController, Platform } from '@ionic/angular';
// import { Auth} from '@angular/fire/auth';
// import { Subscription } from 'rxjs';
import { FirebaseAuthentication, Persistence } from '@capacitor-firebase/authentication';
import { Toast } from '@capacitor/toast';

declare const gapi: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {
  userImage: string = "";
  public crrrr: any[] = [];
  userData: any;
  loading: HTMLIonLoadingElement | null = null;
  storageInitialized: boolean = false;

  constructor(
    private loadingCtrl: LoadingController,
    public platform: Platform,
    private storageService: StorageServiceService,
    public firebaseService: SupabaseAuthSettingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeStorage();
  }

  async initializeStorage(): Promise<void> {
    await this.storageService.init();
    this.storageInitialized = true;
    console.log("Storage Initialized");
  }

  async getCurrentUser(): Promise<any> {
    const result = await FirebaseAuthentication.getCurrentUser();
    await this.storageService.set("user_data", JSON.stringify(result.user));
    return result.user;
  }

  async finalAuth(): Promise<void> {
    try {
 
      const currentUser = await this.getCurrentUser();

      if (!currentUser) {
        this.loading?.dismiss();
        return;
      }

      await this.storageService.set('providerID', currentUser.uid);
      await this.storageService.set("validUser", true);
      this.checkRegisteredUser(currentUser.uid);
      
    } catch (error) {
      console.error('Error in finalAuth:', error);
      this.loading?.dismiss();
    }
  }

  async signIn(): Promise<void> {
    try {
      await this.showLoading();
      const result = await FirebaseAuthentication.signInWithGoogle();
      if (result) {
        console.log('Authenticated');
        this.finalAuth();
      } else {
        console.log("Error in authentication");
      }
    } catch (error) {
      console.error('Error in signIn:', error);
      this.loading?.dismiss();
    }
  }

  async showLoading(): Promise<void> {
    try {
      this.loading = await this.loadingCtrl.create({ message: 'Loading.....' });
      await this.loading.present();
    } catch (error) {
      console.error('Error showing loading:', error);
      this.loading?.dismiss();
    }
  }

  public async checkRegisteredUser(userId: string): Promise<void> {
    try {
      await this.storageService.set("userid", userId);
      this.firebaseService.CheckUserRegistered(userId).subscribe(async (response) => {
        if (response && response.user_phone) {

          const user = await this.firebaseService.getUserData();
          if (user) {
            console.log("getUserData:", user);
            await this.storageService.set('user-email', user.email);
            await this.storageService.set('verified', true);
          await  this.storageService.set("validUser", true);
            this.loading?.dismiss();
            this.router.navigate(['/home']);
          } else {
            this.loading?.dismiss();
          }
        } else {
          await this.storageService.set('verified', false);
          console.log("It's a new user");
          this.loading?.dismiss();
          this.router.navigate(['/register']);
        }
      }, error => {
        console.error("API error", error);
        this.loading?.dismiss();
        this.unableToVerifyToast()
      });
    } catch (error) {
      console.error('Error in checkRegisteredUser:', error);
      this.loading?.dismiss();
      this.unableToVerifyToast()
    }
  }



  unableToVerifyToast(){
    const showHelloToast = async () => {
      await Toast.show({
        text: 'Unable to authenticate! Please try in some time',
      });
    };

    showHelloToast();
    
  }

  async signInAnonymously(): Promise<void> {
    try {
      await this.showLoading();
      const result = await FirebaseAuthentication.signInWithEmailAndPassword({ email: "test@gmail.com", password: "test@123" });
      if (result) {
        console.log('Authenticated');
        this.checkRegisteredUser("INbUEdnjI9ZYzqqj74LuNXjlKrP2");
      } else {
        console.log("Error in authentication");
        this.loading?.dismiss();
      }
    } catch (error) {
      console.error('Error in signInAnonymously:', error);
      this.loading?.dismiss();
    }
  }

  Login(): void {
    this.signIn();
  }

  ngOnDestroy(): void {
    console.log("Login destroyed");
  }
}
