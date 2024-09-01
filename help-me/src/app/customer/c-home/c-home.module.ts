import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CHomeRoutingModule } from './c-home-routing.module';
import { HomeComponent } from './home.component';
import { IonicModule } from '@ionic/angular';
import { CategoryDetailComponent } from '../category-detail/category-detail.component';
import { StarRatingModule } from 'src/app/reusable/star-rating/star-rating.module';
import { CategoryHomeComponent } from '../category-home/category-home.component';
import { Storage } from '@ionic/storage';
// import { ServiceLandingComponent } from '../service-detail/service-landing/service-landing.component';


@NgModule({
  declarations: [
    HomeComponent,
    CategoryDetailComponent,
    CategoryHomeComponent,
    // ServiceLandingComponent
  ],
  imports: [
    CommonModule,
    CHomeRoutingModule,
    IonicModule,
    StarRatingModule
  ],
  providers:[Storage]
})
export class CHomeModule { }
