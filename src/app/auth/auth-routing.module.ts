import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './auth/auth.component';
import { AuthConfirmComponent } from './auth-confirm/auth-confirm.component';
import { NegateAuthGuard } from './auth-guard-negate.service';
import { AuthGuard } from './auth-guard.service';

const authRoutes: Routes = [
  { path: 'auth', component: AuthComponent,
   canActivate: [NegateAuthGuard] 
  },
  { path: 'authConfirm', component: AuthConfirmComponent },
];
@NgModule({
  imports: [
    RouterModule.forChild(authRoutes)
  ],
  exports: [RouterModule],
})
export class AuthRoutingModule {}