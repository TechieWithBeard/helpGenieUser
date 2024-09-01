import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseAuthSettingService } from 'src/app/supabase-auth-setting.service';
import { Storage } from '@ionic/storage-angular';
import { StorageServiceService } from 'src/app/storage-service.service';
import { User } from '@capacitor-firebase/authentication';
import { OneSignal as OneSignalWeb } from 'onesignal-ngx';
import { Platform } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import OneSignal from 'onesignal-cordova-plugin';
import { PushNotifications } from '@capacitor/push-notifications';
@Component({
  selector: 'app-customer-side-nav',
  templateUrl: './customer-side-nav.component.html',
  styleUrls: ['./customer-side-nav.component.scss'],
})
export class CustomerSideNavComponent implements OnInit {

  userData: User | undefined
  photoURL!: string | null;
  private userID!: string
  constructor(private oneSignalweb: OneSignalWeb, public platform: Platform, public storageService: StorageServiceService, public firebaseService: SupabaseAuthSettingService, public router: Router) { }


  ngOnInit(): void {
    
  }
  ionViewDidEnter() {

try{
  this.storageService.get("user_data").then(e => {
    if (e) {
      this.userData = JSON.parse(e);
      if (this.userData) {
        console.log(this.userData)
        this.userID = this.userData.uid;
        let photo = JSON.parse(e);

        if (photo) {
          if (photo.photoURL) {
            this.photoURL = photo.photoURL
          } else {
            this.photoURL = this.userData.photoUrl
          }
        }
        this.firebaseService.CheckUserRegistered(this.userData.uid).subscribe((r) => {

          if (r?.user_email) {
          
            this.storageService.set("userDetails", r)
            this.storageService.set("validUser", true);
            const isMobile = () => {
              return /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent)
            }
            if (isMobile()) {
              this.OneSignalInitMobile();
            } else {
              console.log("in web app")
              this.onsignlaWeb()
            }

          } else {
            this.storageService.clearAll()
            this.router.navigate(['/login'])
          
          }


        },error=>{
          this.storageService.clearAll()
          this.router.navigate(['/login'])
        })
      }else{
        this.storageService.clearAll()
        this.router.navigate(['/login'])
      
      }


    } else {
      this.storageService.clearAll()
      this.router.navigate(['/login'])

    }
  }).catch(ex => {
    console.error(ex);
    this.storageService.clearAll()
    this.router.navigate(['/login'])
 
  })
}
catch(ex){
  console.error(ex)
  this.storageService.clearAll()
  this.router.navigate(['/login'])

}
  

  }

  onsignlaWeb() {

    // oneSignalweb
    this.oneSignalweb.Debug.setLogLevel("log")
    this.oneSignalweb.init({
      appId: environment.ONESIGNAL_APP_ID,
      allowLocalhostAsSecureOrigin: true,
      notifyButton: {
        enable: false,
      }
    }).then(async e => {
      // this.oneSignalweb.setConsentRequired(true)
      this.oneSignalweb.setConsentGiven(true)
      let permission = await this.oneSignalweb.Notifications.permission;
      console.log(permission)
      this.oneSignalweb.Notifications.requestPermission()
      if (permission) {
        this.oneSignalweb.login("user_"+this.userID);
        if (this.userData?.email) {
          this.oneSignalweb.User.addEmail(this.userData?.email);
        }
        this.oneSignalweb.User.addTags({ key: "PROVIDER" });
      } else {
        this.oneSignalweb.Slidedown.promptPush();
        await this.oneSignalweb.Notifications.requestPermission()
      }

      //  this.oneSignalweb.Slidedown.promptPush({force:true})
      //  this.oneSignalweb.Slidedown.addEventListener('slidedownShown',e=>{
      //   console.log(e)
      //  })
      this.oneSignalweb.Notifications.addEventListener("permissionPromptDisplay", (e) => {
        console.log(e)
      })
      this.oneSignalweb.Notifications.addEventListener("foregroundWillDisplay", (e) => {
        console.log(e)
      })
      this.oneSignalweb.Notifications.addEventListener("foregroundWillDisplay", (e) => {
        console.log(e)
      })
      this.oneSignalweb.Notifications.addEventListener('click', async (e) => {
        let clickData = await e.notification;
        console.log("Notification Clicked : " + clickData);
      })






      // this.oneSignalweb.Notifications.permissi.requestPermission()
      // this.oneSignalweb.Notifications.permissionNative
      this.oneSignalweb.Notifications.addEventListener("foregroundWillDisplay", e => {
        console.log("onesignal " + e)
      });



      this.oneSignalweb.Notifications.addEventListener('permissionChange', async e => {
        console.log("********" + e)
        let permission = await this.oneSignalweb.Notifications.permission;
        console.log(permission)
        if (permission) {
          this.oneSignalweb.login("user_"+this.userID);
          if (this.userData?.email) {
            this.oneSignalweb.User.addEmail(this.userData?.email);
          }
          this.oneSignalweb.User.addTags({ key: "PROVIDER" });
        }

      })

    });
  }



  OneSignalInitMobile() {

// alert("in mobile")
    const registerNotifications = async () => {
      let permStatus = await PushNotifications.checkPermissions();
    
      if (permStatus.receive === 'prompt') {
        permStatus = await PushNotifications.requestPermissions();
      }
    
      if (permStatus.receive !== 'granted') {
        throw new Error('User denied permissions!');
      }
    
      await PushNotifications.register();
    }
    
    registerNotifications()
  
    // Remove this method to stop OneSignal Debugging
    OneSignal.Debug.setLogLevel(6)
    OneSignal.initialize(environment.ONESIGNAL_APP_ID);
    // Replace YOUR_ONESIGNAL_APP_ID with your OneSignal App ID
    OneSignal.setConsentRequired(true)

   
    OneSignal.Notifications.requestPermission(true).then((accepted: boolean) => {
     if(accepted){

       console.log("User accepted notifications: " + accepted);

       OneSignal.setConsentGiven(true);
       OneSignal.login("user_"+this.userID)
       if(this.userData?.email){
        OneSignal.User.addEmail(this.userData?.email);
       }
       OneSignal.User.addTags({key: "USER"});
       OneSignal.Notifications.addEventListener('click', async (e) => {
         let clickData = await e.notification;
         console.log("Notification Clicked : " + clickData);
         alert(JSON.stringify(clickData))
       })
       addListeners()
     }
   
 });
 
   
  

    OneSignal.Notifications.requestPermission(true).then((success: Boolean) => {
      console.log("Notification permission granted " + success);
      if(success){
       OneSignal.setConsentGiven(true);
       OneSignal.login("user_"+this.userID)
       if(this.userData?.email){
        OneSignal.User.addEmail(  this.userData?.email);
       }
      }
    })




    const addListeners = async () => {
      await PushNotifications.addListener('registration', token => {
        console.info('Registration token: ', token.value);
      });
    
      await PushNotifications.addListener('registrationError', err => {
        console.error('Registration error: ', err.error);
      });
    
      await PushNotifications.addListener('pushNotificationReceived', notification => {
        console.log('Push notification received: ', notification);
      });
    
      await PushNotifications.addListener('pushNotificationActionPerformed', notification => {
        console.log('Push notification action performed', notification.actionId, notification.inputValue);
      });
    }

    


 }


  navigateHome() {
    console.log("home")
    this.router.navigate(['/home/service'])
  }

  openSettings() {
    this.router.navigate(['/home/settings'])
  }

}
