import { Component, OnInit, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { Stitch } from 'mongodb-stitch-browser-sdk';
import { Store } from '@ngrx/store';

import * as fromApp from '../../store/app.reducers';
import * as AuthActions from '../../auth/store/auth.actions';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  @Output() newNote = new EventEmitter<any>();
  @ViewChild('dropdown', { static: false }) dropdown: ElementRef;
  user: string;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    // console.log(Stitch.defaultAppClient.auth.user)
    this.user = Stitch.defaultAppClient.auth.user.profile.email.split('@')[0] || 'User';
  }

  logout() {
    this.store.dispatch(new AuthActions.Logout())
  }

  addNote() {
    this.newNote.emit();
  }

}
