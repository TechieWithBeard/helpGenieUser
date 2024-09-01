import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyBookingsLandingPageComponent } from './my-bookings-landing-page/my-bookings-landing-page.component';
import { MyBookingsListPageComponent } from './my-bookings-list-page/my-bookings-list-page.component';
import { OrderPageComponent } from './order-page.component';
import { OrderHelpComponent } from './order-help/order-help.component';
import { PaymentsuccessComponent } from './paymentsuccess/paymentsuccess.component';

const routes: Routes = [
  {
    path:'',component:MyBookingsLandingPageComponent,children:[
      {
        path:'',redirectTo:'bookings',pathMatch:"full",

      },
      {
        path:'payment-status/:orderId',component:PaymentsuccessComponent
      },
      {
        path:'bookings',component:MyBookingsListPageComponent
      },
      {
        path:'help/:orderId',component:OrderHelpComponent
      },
      {
        path:':orderId',component:OrderPageComponent
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderPageRoutingModule { }
