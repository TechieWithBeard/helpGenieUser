import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonNav, IonTitle, IonToolbar, NavController } from '@ionic/angular/standalone';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-terms-condition',
  standalone:true,
  imports:[IonHeader,IonContent,IonToolbar,IonTitle,IonNav,IonBackButton,IonButton,IonButtons],
  templateUrl: './terms-condition.component.html',
  styleUrls: ['./terms-condition.component.scss'],
})
export class TermsConditionComponent  implements OnInit {

  // helpMail:string=environment.help_mail
  necktarMail:string=environment.help_mail
  constructor(private router:Router,private navCtrl: NavController) { }

  ngOnInit() {}

  goback(){
    // this.router.navigate(['/login'])
    this.navCtrl.back();
  }

}
