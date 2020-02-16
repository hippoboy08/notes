import { Action } from "@ngrx/store";
import { Note } from 'src/app/shared/models/note.model';

export enum actionTypes {
  GET_NOTES = '[Note] GET_NOTES',
  SYNC_NOTES = '[Note] SYNC_NOTES',
  ADD_NOTE = '[Note] ADD_NOTE',
  ADD_NOTE_START = '[Note] ADD_NOTE_START',
  UPDATE_NOTE = '[Note] UPDATE_NOTE',
  DELETE_NOTE = '[Note] DELETE_NOTE',
  EDIT_NOTE_START = '[Note] EDIT_NOTE_START',
  EDIT_NOTE_STOP = '[Note] EDIT_NOTE_STOP',
  SUCCESSFUL = '[Note] SUCCESSFUL',
}

export class GetNotes implements Action {
  readonly type = actionTypes.GET_NOTES;
}
export class SyncNotes implements Action {
  readonly type = actionTypes.SYNC_NOTES;
  constructor(public payload: {notes: Note[]}) {}
}
export class EditNoteStart implements Action {
  readonly type = actionTypes.EDIT_NOTE_START;
}
export class EditNoteStop implements Action {
  readonly type = actionTypes.EDIT_NOTE_STOP;
}
export class AddNoteStart implements Action {
  readonly type = actionTypes.ADD_NOTE_START;
  constructor(public note: Note) {}
}
export class AddNote implements Action {
  readonly type = actionTypes.ADD_NOTE;
  constructor(public note: Note) {}
}
export class UpdateNote implements Action {
  readonly type = actionTypes.UPDATE_NOTE;
  constructor(public updatedNote: Note) {}
}
export class DeleteNote implements Action {
  readonly type = actionTypes.DELETE_NOTE;
  constructor(public noteId: string) {}
}
export class Successful implements Action {
  readonly type = actionTypes.SUCCESSFUL;
  constructor(public message: string) {}
}
export type Actions = 
GetNotes
| SyncNotes
| AddNote
| AddNoteStart
| UpdateNote
| DeleteNote
| EditNoteStart
| EditNoteStop
| Successful
;