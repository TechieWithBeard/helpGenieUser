import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { CategoryDetailComponent } from '../category-detail/category-detail.component';
import { CategoryHomeComponent } from '../category-home/category-home.component';

//import { ServiceLandingComponent } from '../service-detail/service-landing/service-landing.component';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent,pathMatch:'full'
  },
  {
    path:'category',component:CategoryHomeComponent,children:[
      {
        path:':categoryID',component:CategoryDetailComponent,

      },
   

    ],
    
  },
  {
    path:'provider/:providerID',loadChildren:()=>import('../category-detail/provider-detail/provider-detail.module').then(m=>m.ProviderDetailPageModule)
    }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CHomeRoutingModule { }
