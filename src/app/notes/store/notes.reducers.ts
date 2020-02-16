import * as NotesActions from "./notes.actions";

import { Note } from 'src/app/shared/models/note.model';

export interface State {
  notes: Note[];
  isEditing: boolean;
  isLoading: boolean;
  message: string;
}

const initialState: State = {
  notes: [],
  isEditing: false,
  isLoading: false,
  message: null
}

export function reducer(state = initialState, action: NotesActions.Actions ): State {
  switch (action.type) {
    case NotesActions.actionTypes.GET_NOTES: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case NotesActions.actionTypes.SYNC_NOTES: {
      // console.log(action.payload.notes)
      return {
        ...state,
        isLoading: false,
        notes: action.payload.notes
      };
    }
    case NotesActions.actionTypes.SUCCESSFUL: {
      return {
        ...state,
        message: action.message
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