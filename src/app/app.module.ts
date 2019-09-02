import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from "@ngrx/store-devtools";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotesModule } from './notes/notes.module';

import { appReducers } from "./store/app.reducers";
import { environment } from 'src/environments/environment';
import { CommonModule } from '@angular/common';
import { AuthModule } from './auth/auth.module';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from "./auth/store/auth.effects";
import { NotesEffects } from './notes/store/notes.effects';
import { AuthGuard } from './auth/auth-guard.service';
import { NegateAuthGuard } from './auth/auth-guard-negate.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CommonModule,
    NotesModule,
    AuthModule,
    AppRoutingModule,
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot([AuthEffects, NotesEffects]),
    StoreDevtoolsModule.instrument({
      logOnly: environment.production
    }),

  ],
  providers: [AuthGuard, NegateAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
