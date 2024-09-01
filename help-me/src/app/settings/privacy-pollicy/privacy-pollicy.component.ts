import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonNav, IonTitle, IonToolbar, NavController } from '@ionic/angular/standalone';
import { LoginComponent } from 'src/app/login/login.component';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-privacy-pollicy',
  imports:[IonHeader,IonContent,IonToolbar,IonTitle,IonNav,IonBackButton,IonButton,IonButtons],
  templateUrl: './privacy-pollicy.component.html',
  styleUrls: ['./privacy-pollicy.component.scss'],
  standalone: true,
})
export class PrivacyPollicyComponent  implements OnInit {
  component=LoginComponent
  constructor(private router:Router,private navCtrl: NavController) { }
  // helpMail:string=environment.help_mail
  necktarMail:string=environment.help_mail
  ngOnInit() {}

  goback(){
    // this.router.navigate(['/login'])
    this.navCtrl.back();
  }

}
