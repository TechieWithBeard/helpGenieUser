import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {
  //   path:'',
  //   pathMatch:'full',
  //   redirectTo:'login'
  //   },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./customer/new-user/new-user.module').then(m => m.NewUserModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule)
  },
  {
    path: 'genie',
    loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule)
  },
  {
    path:'terms-condition',
    loadComponent:()=>import('./settings/terms-condition/terms-condition.component').then(m=>m.TermsConditionComponent)
  },
  {
    path:'privacy-policy',
    loadComponent:()=>import('./settings/privacy-pollicy/privacy-pollicy.component').then(m=>m.PrivacyPollicyComponent)

  },
  {
    path:'*',
    redirectTo:"login",
    pathMatch:"full"
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules  })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
