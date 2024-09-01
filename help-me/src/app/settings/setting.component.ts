import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Browser } from '@capacitor/browser';
import { Platform } from '@ionic/angular';
import { SupabaseAuthSettingService } from '../supabase-auth-setting.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
})
export class SettingComponent  implements OnInit {

  isProduction=environment.production
  constructor(private router:Router,platform: Platform, public firebaseService:SupabaseAuthSettingService) { 

    platform.ready().then(() => {
      this.OneSignalInit();
    });
  }

  ngOnInit() {}

  openAbout(){
this.router.navigate(['/home/settings/about'])
  }


  // Call this function when your app starts
 async OneSignalInit(): Promise<void> {
  // Uncomment to set OneSignal device logging to VERBOSE  
  // OneSignal.Debug.setLogLevel(6);
  
  // Uncomment to set OneSignal visual logging to VERBOSE  
  // OneSignal.Debug.setAlertLevel(6);

  // NOTE: Update the init value below with your OneSignal AppId.
  // this.oneSignal.init({
  //   appId: "139af684-e9c9-4018-9fd3-4e6cbc7af8ad",
  //   allowLocalhostAsSecureOrigin:true
  // });


}




openBookings(){
  this.router.navigate(['/home/order/bookings'])
}


logout(){
  this.firebaseService.logout().then(e=>{
    if(e){
      this.router.navigate(['/login'])
    }
  })
}

manageAddress(){
  this.router.navigate(['/home/settings/manage-address'])
}


}
