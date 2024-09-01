import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewUserComponent } from './new-user.component';

const routes: Routes = [{
  path:'',
  component:NewUserComponent,
  pathMatch:"full"
},
{
  path:'open-map/:mode',loadComponent:()=>import('./map-view/map-view.component').then(e=>e.MapViewComponent)
}


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewUserRoutingModule { }
