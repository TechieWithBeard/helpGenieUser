import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerSideNavComponent } from './customer-side-nav/customer-side-nav.component';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [
    CustomerSideNavComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    IonicModule
  ]
})
export class CustomerModule { }
