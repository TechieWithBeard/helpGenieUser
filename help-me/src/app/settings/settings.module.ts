import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingComponent } from './setting.component';
import { IonicModule } from '@ionic/angular';
import { AboutComponent } from './about/about.component';
import { SettingLandingComponent } from './setting-landing/setting-landing.component';
import { ManageAddressComponent } from './manage-address/manage-address.component';
import { MaskitoModule } from '@maskito/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrivacyPollicyComponent } from './privacy-pollicy/privacy-pollicy.component';
import { TermsConditionComponent } from './terms-condition/terms-condition.component';


@NgModule({
  declarations: [SettingComponent,AboutComponent,SettingLandingComponent,ManageAddressComponent],
  imports: [
    CommonModule,
    IonicModule,
    SettingsRoutingModule,
    MaskitoModule,
    PrivacyPollicyComponent,
    TermsConditionComponent,
    FormsModule,ReactiveFormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SettingsModule { }
