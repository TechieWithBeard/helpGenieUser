import { Component, OnInit } from '@angular/core';
import { Share } from '@capacitor/share';
import { Platform, ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent  implements OnInit {

  scope:'about_HG'|'share'|'privacy'|'terms'|null=null
  constructor(private platform: Platform,private toastController: ToastController) { }
  necktarMail:string=environment.help_mail
  ngOnInit() {}

  setOpen(){
    this.scope=null
  }
async share(){

  if (this.platform.is('desktop'))
  {
    this.presentToast("bottom")
    return 
  }

  if (this.platform.is('ios')) {
    await Share.share({
      url: 'http://ionicframework.com/',
    });
    // Code for iOS platform
  } else if (this.platform.is('android')) {
    await Share.share({
      url: 'http://ionicframework.com/',
    });
    // Code for Android platform
  } else if (this.platform.is('mobileweb')) {
    this.presentToast("bottom")
    // Code for web platform
  } else {
    this.presentToast("bottom")
    // Code for other platforms (if needed)
  }
// Share url only

}


async presentToast(position: 'top' | 'middle' | 'bottom') {
  const toast = await this.toastController.create({
    message: 'Unable to share',
    duration: 1500,
    position: position,
  });

  await toast.present();
}
}
