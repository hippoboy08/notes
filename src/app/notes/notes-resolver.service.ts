import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { map, take, switchMap } from 'rxjs/operators';

import * as fromApp from "../store/app.reducers";
import * as NotesActions from "../notes/store/notes.actions";
import { of } from 'rxjs';
import { Note } from '../shared/models/note.model';

@Injectable({
  providedIn: 'root'
})
export class NotesResolverService implements Resolve<Note[]> {

  constructor(
    private store: Store<fromApp.AppState>,
    private action: Actions
  ) { }

  /* Resolver will be executed before the component is loaded, this will pre-load data in case the browser is refreshed */
  resolve() {
    return this.store.select('notes').pipe(
      take(1),
      map(notesState => notesState.notes),
      switchMap(notes => {
        if(notes.length == 0) {
          this.store.dispatch(new NotesActions.GetNotes())
          return this.action.pipe(ofType(NotesActions.actionTypes.SYNC_NOTES), take(1))
        } else {
          return of(notes);
        }
      })
    )
  }
}
