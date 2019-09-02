import { Effect, Actions, ofType } from "@ngrx/effects";
import { Injectable } from "@angular/core";

import * as AuthActions from "./auth.actions";
import { switchMap, catchError, map, tap, exhaust, exhaustMap } from 'rxjs/operators';
import { of, from } from 'rxjs';
import { Router } from '@angular/router';
import { Stitch, UserPasswordAuthProviderClient, UserPasswordCredential } from "mongodb-stitch-browser-sdk";


export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

// const postAuthenticated = (responseData: AuthResponseData) => {
//   const expirationDate = new Date(new Date().getTime() + (+responseData.expiresIn*1000));
//   // const expirationDate = new Date(new Date().getTime() - (+responseData.expiresIn*1000));
//   // console.log('Auth Effect Log:',responseData);
//   const user = new User(responseData.email, responseData.idToken, responseData.localId);
//   return new AuthActions.Signedin()
// };
const handleError = (message: string) => {
  return of(new AuthActions.AuthFailed(toCamelCase(message)));
};

const toCamelCase = function(string: string) {
  return string.substring(0, 1).toUpperCase() + string.substring(1);
};

@Injectable()
export class AuthEffects {
  @Effect() authSignup = this.actions$.pipe(
    ofType(AuthActions.SIGN_UP_START),
    switchMap((requestData: AuthActions.SignupStart) => {
      return from(
        Stitch.defaultAppClient.auth.getProviderClient(UserPasswordAuthProviderClient.factory)
          .registerWithEmail(requestData.payload.email, requestData.payload.password)
      )
        .pipe(
          map(() => {
            // console.log('Auth Effect Signup Success Log:', response);
            return new AuthActions.AuthSuccess("Sign up successfully!!!")
          }),
          catchError(errorResponse => {
            // console.log('Auth Effect Error Log:', errorResponse);
            // Stitch.defaultAppClient.auth.getProviderClient(UserPasswordAuthProviderClient.factory).resendConfirmationEmail(requestData.payload.email)
            return handleError(errorResponse.message);
          })
        )
    })
  )

  @Effect() authSignin = this.actions$.pipe(
    ofType(AuthActions.SIGN_IN_START),
    switchMap((authData: AuthActions.SigninStart) => {
      const credentials = new UserPasswordCredential(authData.payload.email, authData.payload.password)
      return from(Stitch.defaultAppClient.auth.loginWithCredential(credentials))
        .pipe(
          map((response) => {
            // console.log('Auth Effect Signin Success Log', response);
            // const user = new User(response);
            return new AuthActions.Signedin(response)
          }),
          catchError(errorResponse => {
            // console.log('[Auth Effect] Sign in FAILED Log:', errorResponse);
            return handleError(errorResponse.message);
          })
        )
    })
  )

  @Effect() authSignout = this.actions$.pipe(
    ofType(AuthActions.LOG_OUT),
    exhaustMap(() => {
      return from(Stitch.defaultAppClient.auth.logout())
      .pipe(
        map((response) => {
          // console.log('Auth Effect Signin Success Log', response);
          this.router.navigate(['/auth'])
          return new AuthActions.AuthSuccess('Logout successfully!!!')
        })
      )
    }),
    catchError(errorResponse => {
      // console.log('Auth Effect Sign out failed Log:', errorResponse);
      return handleError(errorResponse.message);
    })
  )

  /* This effect will not dispatch any action at the end (which a normal effect does),
  only navigate as an interceptor when user is logged in successfully & 
  the signedin action is dispatched*/
  @Effect({ dispatch: false }) signedIn = this.actions$.pipe(
    ofType(AuthActions.SIGNED_IN),
    tap((signedInAction: AuthActions.Signedin) => {
      if(signedInAction.redirect == true) {
        this.router.navigate(['/notes']);
      }
    })
  )

  constructor(private actions$: Actions, private router: Router) { }
}