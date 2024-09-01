import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular/standalone';

@Injectable({
  providedIn: 'root'
})
export class ToastControllerService {

  constructor(private toastController: ToastController,    private loadingCtrl: LoadingController,) {}

  loader!:any
  async presentToast(message:string,color:'success'|'danger'|'warning'="success",position: 'top' | 'middle' | 'bottom'="bottom") {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: position,
      color:color
    });

    await toast.present();
  }


  async showLoading(message:string): Promise<void> {
    try {
      if(this.loader)  this.loader?.dismiss();
      this.loader = await this.loadingCtrl.create({ message: message });
      await this.loader.present();
    } catch (error) {
      console.error('Error showing loading:', error);
      this.loader?.dismiss();
    }
  }
  async dismissLoading(): Promise<void> {
    try {
      if(this.loader)  this.loader?.dismiss();
    } catch (error) {
      console.error('Error showing loading:', error);
 
    }
  }
}
