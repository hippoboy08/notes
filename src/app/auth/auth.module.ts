import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth/auth.component';
import { AuthConfirmComponent } from './auth-confirm/auth-confirm.component';

@NgModule({
  declarations: [
    AuthComponent,
    AuthConfirmComponent,
  ],
  imports: [ 
    CommonModule,
    FormsModule,
    AuthRoutingModule
  ]
})
export class AuthModule {}