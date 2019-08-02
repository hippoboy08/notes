import * as NotesActions from "./notes.actions";

import { Note } from 'src/app/shared/models/note.model';

export interface State {
  notes: Note[];
  isEditing: boolean;
}

const initialState: State = {
  notes: [],
  isEditing: false
}

export function reducer(state = initialState, action: NotesActions.Actions ): State {
  switch (action.type) {
    case NotesActions.actionTypes.SYNC_NOTES: {
      // console.log(action.payload.notes)
      return {
        ...state,
        notes: action.payload.notes
      };
    }
    case NotesActions.actionTypes.ADD_NOTE: {
      return {
        ...state,
        notes: [...state.notes, action.note],
      };
    }
    // case NotesActions.actionTypes.UPDATE_NOTE: {
    //   const updatedNote = {...action.updatedNote};
    //   const updatedNotes = state.notes.map(note => {
    //     if(note.id === updatedNote.id) {
    //       note = updatedNote
    //     }
    //     return note
    //   })
    //   return {
    //     ...state,
    //     notes: updatedNotes,
    //     isEditing: false
    //   };
    // }
    // case NotesActions.actionTypes.DELETE_NOTE: {
    //   return {
    //     ...state,
    //     notes: state.notes.filter((note) => note.id !== action.noteId)
    //   };
    // }
    case NotesActions.actionTypes.EDIT_NOTE_START: {
      return {
        ...state,
        isEditing: true
      };
    }
    case NotesActions.actionTypes.EDIT_NOTE_STOP: {
      return {
        ...state,
        isEditing: false
      };
    }

    default: {
      return state;
    }
  }
}