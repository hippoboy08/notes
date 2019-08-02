import { ActionReducerMap } from '@ngrx/store';

import * as fromNotes from '../notes/store/notes.reducers';
import * as fromAuth from '../auth/store/auth.reducers';

export interface AppState {
  notes: fromNotes.State;
  auth: fromAuth.State;
}

export const appReducers: ActionReducerMap<AppState> = {
  notes: fromNotes.reducer,
  auth: fromAuth.reducer
}