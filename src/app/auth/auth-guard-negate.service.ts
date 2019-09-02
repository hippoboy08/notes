
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Route } from '@angular/compiler/src/core';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducers';
import * as fromAuth from './store/auth.reducers';
import { map, take } from 'rxjs/operators';
import { AuthGuard } from './auth-guard.service';

@Injectable()
export class NegateAuthGuard implements CanActivate {

  constructor(private store: Store<fromApp.AppState>,
    private router: Router,
    private authGuard: AuthGuard) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.validateAuth()
  }

  validateAuth() {
    return this.store.select('auth')
    .pipe(
      take(1),
      map((authState: fromAuth.State) => authState),
      map((state) => {
        /* Auth route is not allowed if the user is already logged in */
        if (state.authenticated) {
          return false;
        } else {
          return true
        }
      })
    );
  }


}
