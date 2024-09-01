import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderPageRoutingModule } from './order-page-routing.module';
import { OrderPageComponent } from './order-page.component';
import { IonicModule } from '@ionic/angular';
import { MyBookingsLandingPageComponent } from './my-bookings-landing-page/my-bookings-landing-page.component';
import { MyBookingsListPageComponent } from './my-bookings-list-page/my-bookings-list-page.component';
import { OrderHelpComponent } from './order-help/order-help.component';
import { FormsModule } from '@angular/forms';
import { PaymentsuccessComponent } from './paymentsuccess/paymentsuccess.component';
import { StarRatingReviewComponent } from "../../reusable/star-rating-review/star-rating-review.component";
import { StarRatingModule } from "../../reusable/star-rating/star-rating.module";


@NgModule({
    declarations: [OrderPageComponent, MyBookingsLandingPageComponent, MyBookingsListPageComponent, OrderHelpComponent, PaymentsuccessComponent],
    imports: [
        CommonModule,
        IonicModule,
        FormsModule,
        OrderPageRoutingModule,
        StarRatingReviewComponent,
        StarRatingModule
    ]
})
export class OrderPageModule { }
