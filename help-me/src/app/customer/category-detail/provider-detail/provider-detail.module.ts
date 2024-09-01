import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProviderDetailPageRoutingModule } from './provider-detail-routing.module';

import { ProviderDetailPage } from './provider-detail.page';
import { StarRatingModule } from 'src/app/reusable/star-rating/star-rating.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProviderDetailPageRoutingModule,
    StarRatingModule
  ],
  declarations: [ProviderDetailPage]
})
export class ProviderDetailPageModule {}
