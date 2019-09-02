import { Component, OnInit, ComponentFactoryResolver, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from "../../store/app.reducers";
import * as AuthActions from "../store/auth.actions";
import { FacebookRedirectCredential, Stitch, GoogleRedirectCredential } from 'mongodb-stitch-browser-sdk';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {
  signUpMode: boolean = false;
  isLoading: boolean;
  error: string = null;
  errorSubscription: Subscription;
  closeSubscription: Subscription;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
    private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    // this.errorSubscription = this.authService.error.subscribe(error => this.showAlertModal(error.message));
    this.errorSubscription = this.store.select('auth').subscribe(authState => {
      this.isLoading = authState.isLoading;
      if (authState.errorMessage) {
        // console.log(authState.errorMessage);
        this.error = authState.errorMessage
      }
    })

    if (Stitch.defaultAppClient.auth.hasRedirectResult()) {
      Stitch.defaultAppClient.auth.handleRedirectResult().then(user => {
        // console.log(user);
        this.store.dispatch(new AuthActions.Signedin(user))
      });
    }
  }

  closeAlert() {
    this.error = null;
  }

  toggleMode() {
    this.signUpMode = !this.signUpMode;
  }

  authenticate(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    if (this.signUpMode) {
      this.store.dispatch(new AuthActions.SignupStart({ email: email, password: password }))
    } else {
      this.store.dispatch(new AuthActions.SigninStart({ email: email, password: password }))
    }
  }

  loginWithFB() {
    const credential = new FacebookRedirectCredential();
    Stitch.defaultAppClient.auth.loginWithRedirect(credential);
  }

  loginWithGG() {
    const credential = new GoogleRedirectCredential();
    Stitch.defaultAppClient.auth.loginWithRedirect(credential);
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if (this.closeSubscription) {
      this.closeSubscription.unsubscribe();
    }
  }
}
