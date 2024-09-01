import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ManageAddressComponent } from './manage-address/manage-address.component';
import { SettingLandingComponent } from './setting-landing/setting-landing.component';
import { SettingComponent } from './setting.component';
import { NewUserComponent } from '../customer/new-user/new-user.component';

const routes: Routes = [{
  path:'', 
  component:SettingLandingComponent,children:[{
    path:'',component:SettingComponent
  },
    {
      path:'about',component:AboutComponent
    },
    {
      path:'manage-address',component:ManageAddressComponent
    },
    {
      path:'edit-address/:mode',loadChildren:()=>import('../customer/new-user/new-user.module').then(e=>e.NewUserModule)
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
