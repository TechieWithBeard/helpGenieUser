import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingComponent } from '../settings/setting.component';
import { CustomerSideNavComponent } from './customer-side-nav/customer-side-nav.component';
9
const routes: Routes = [
  {path:'',component:CustomerSideNavComponent,children:[
    {
      path:'',redirectTo:'service',pathMatch:'full'
    },
    {
      path:'service',loadChildren:()=>import('./c-home/c-home.module').then(m=>m.CHomeModule)
    },
    {
      path:'settings',loadChildren:()=>import('../settings/settings.module').then(m=>m.SettingsModule)
    },
    {
      path:'order',loadChildren:()=>import('../customer/order-page/order-page.module').then(m=>m.OrderPageModule)
    },
    {
      path:'payment',loadChildren:()=>import('../customer/payment/payment.module').then(m=>m.PaymentModule)
    },
    

  ]},
  {
    path: 'provider-detail',
    loadChildren: () => import('./category-detail/provider-detail/provider-detail.module').then( m => m.ProviderDetailPageModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
