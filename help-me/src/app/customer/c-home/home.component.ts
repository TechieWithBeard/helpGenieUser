import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category, UserAddress } from 'src/app/data-model/category.model';
import 'firebase/auth';
import { Observable } from 'rxjs';
import { SupabaseAuthSettingService } from 'src/app/supabase-auth-setting.service';
// import { User } from 'firebase/auth';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { UserService } from 'src/app/servcies/user.service';
import { User } from '@capacitor-firebase/authentication';
import { CustomerService } from '../customer.service';
import OneSignal from 'onesignal-cordova-plugin';
import { environment } from 'src/environments/environment';
import { StorageServiceService } from 'src/app/storage-service.service';
import { Coordinates } from '../model/user-data.model';
import { CategoryDetailService } from '../category-detail/category-detail.service';
// import OneSignal from 'onesignal-cordova-plugin';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('placeholderAnimation', [
      state('state1', style({ opacity: 1 })),
      state('state2', style({ opacity: 1 })),
      transition('state1 => state2', animate('500ms ease-in')),
      transition('state2 => state1', animate('500ms ease-out')),
    ]),
  ]
})
export class HomeComponent  implements OnInit {
  animationState = 'state1';
  placeholders = ['Search for a genie', 'Type here', 'Try searching a service...'];
  currentPlaceholder = this.placeholders[0];
  placeholderIndex = 0;
  userId!: string;
  addressData: UserAddress[] = [];
  loading: boolean = true;
  userData!: User;
  categoryList: Category[] = [];

  constructor(
    private categoryDetailService: CategoryDetailService,
    private storageService: StorageServiceService,
    private router: Router,
    private userService: UserService,
    private customerService: CustomerService
  ) {
    setInterval(() => this.animatePlaceholders(), 3000);
  }

  ngOnInit() {
    this.storageService.get("user_data").then(e => {
      if (e) {
        this.userData = JSON.parse(e);
        this.userId = this.userData.uid;
        if (this.userId) {
          this.loadInitialData();
        }
      } else {
        this.navigateToLogin();
      }
    }).catch(this.navigateToLogin);
  }

  loadInitialData() {
    this.getUserAddress(this.userId).then(userCoordinates => {
      if (userCoordinates) {
        this.getNearbyServiceProviders(userCoordinates);
      }
    });
    this.getAllActiveCategories();
  }

  animatePlaceholders() {
    this.placeholderIndex = (this.placeholderIndex + 1) % this.placeholders.length;
    this.currentPlaceholder = this.placeholders[this.placeholderIndex];
    this.animationState = this.animationState === 'state1' ? 'state2' : 'state1';
  }

  selectService(category: Category) {
    this.router.navigate(['/home/service/category/' + category.name]);
  }

  getAllActiveCategories() {
    this.customerService.getAllCategories().subscribe(result => {
      this.loading = false;
      this.categoryList = result.filter(e => e.active);
    }, err => {
      this.loading = false;
      console.error(err);
    });
  }

  getNearbyServiceProviders(userCoordinates: Coordinates) {
    this.categoryDetailService.getNearbyService(userCoordinates.lat, userCoordinates.lng).subscribe(serviceProviders => {
      if (serviceProviders) {
        const nearbyCategories = new Set(serviceProviders.map(sp => sp.service_provider_category));
        this.categoryList = this.categoryList.map(category => ({
          ...category,
          nearby: nearbyCategories.has(category.name)
        })).sort((a, b) => (b.nearby ? 1 : 0) - (a.nearby ? 1 : 0));
      }
    }, error => {
      console.error(error);
    });
  }

  getUserAddress(userID: string): Promise<Coordinates | null> {
    return new Promise((resolve, reject) => {
      this.userService.getUserAddress(userID).subscribe(result => {
        this.addressData = result;
        const defaultAddress = this.addressData.find(e => e.default);
        if (defaultAddress) {
          resolve(defaultAddress.user_coordinates);
        } else {
          reject();
        }
      }, reject);
    });
  }

  navigateToLogin = () => {
    this.storageService.clearAll()
    this.router.navigate(['/login'])};

}
