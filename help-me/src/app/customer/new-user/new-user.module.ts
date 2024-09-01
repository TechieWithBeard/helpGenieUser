import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewUserComponent } from './new-user.component';
import { NewUserRoutingModule } from './new-user-routing.module';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaskitoDirective } from '@maskito/angular';


@NgModule({
  declarations: [NewUserComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CommonModule,
    NewUserRoutingModule,
    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NewUserModule { }
