import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Location } from '@angular/common';

import * as NotesActions from "../store/notes.actions";
import { switchMap, map, catchError, exhaustMap, take, tap } from 'rxjs/operators';
import { Stitch, RemoteMongoClient, BSON } from 'mongodb-stitch-browser-sdk';
import { from, of, pipe } from 'rxjs';
import { Note } from 'src/app/shared/models/note.model';

@Injectable()
export class NotesEffects {

  @Effect() getNotes = this.action.pipe(
    ofType(NotesActions.actionTypes.GET_NOTES),
    switchMap((actionData: NotesActions.GetNotes) => {
      /** Select the database in Stitch via the AppClient */
      const db = Stitch.defaultAppClient.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas-notesapp').db('notes-app');
      /** Return the notes collection to process */
      return from(db.collection('notes').find().toArray())
        .pipe(
          map((notes: any[]) => {
            /** Log the result to the screen */
            console.log('Notes Effect Sync: ', notes)
            const processedNotes = notes.map((note) => {
              return new Note(note.content, note._id.toString(), note.user, note.createdDate, note.isShared)
            })
            return new NotesActions.SyncNotes({ notes: processedNotes })
          })
        )
    })
  )

  @Effect() addNote = this.action.pipe(
    ofType(NotesActions.actionTypes.ADD_NOTE_START),
    switchMap((actionData: NotesActions.AddNoteStart) => {
      const db = Stitch.defaultAppClient.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas-notesapp').db('notes-app');
      delete actionData.note.id;
      // console.log(actionData.note)
      return from(db.collection('notes').insertOne(actionData.note))
        .pipe(
          exhaustMap(response => {
            // console.log('Notes Effect Insert One: ', response.insertedId.toString())
            return from(db.collection('notes').findOne({ _id: response.insertedId }))
              .pipe(
                map((note: any) => {
                  // console.log('Notes Effect Found One: ', note)
                  const processedNote = new Note(note.content, note._id.toString(), note.user, note.createdDate)
                  // return new NotesActions.AddNote(processedNote);
                  return new NotesActions.Successful("Successfully Inserted!");
                }),
                catchError(errorResponse => {
                  console.log('Note Effect Error Log, could not find:', errorResponse);
                  return of()
                })
              )
          }),
          catchError(errorResponse => {
            console.log('Note Effect Error Log, could not insert:', errorResponse);
            return of()
          })
        )
    })
  )

  @Effect() updateNote = this.action.pipe(
    ofType(NotesActions.actionTypes.UPDATE_NOTE),
    switchMap((action: NotesActions.UpdateNote) => {
      const db = Stitch.defaultAppClient.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas-notesapp').db('notes-app');
      return from(db.collection('notes').updateOne({ _id: new BSON.ObjectId(action.updatedNote.id) }, {
        $set: {
          content: action.updatedNote.content,
          createdDate: action.updatedNote.createdDate,
          isShared: action.updatedNote.isShared
        }
      }, { upsert: false }))
        .pipe(
          map((note) => {
            // console.log('Notes Effect Updated One: ', note)
            return new NotesActions.Successful("Successfully Updated!");
          }),
          catchError(errorResponse => {
            console.log('Note Effect Update Note Error Log, could not find:', errorResponse);
            return of()
          })
        )
    })
  )

  @Effect() deleteNote = this.action.pipe(
    ofType(NotesActions.actionTypes.DELETE_NOTE),
    switchMap((action: NotesActions.DeleteNote) => {
      const db = Stitch.defaultAppClient.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas-notesapp').db('notes-app');
      return from(db.collection('notes').deleteOne({ _id: new BSON.ObjectId(action.noteId) }))
        .pipe(
          map((response) => {
            // console.log('Notes Effect Updated One: ', response)
            return new NotesActions.GetNotes();
          }),
          catchError(errorResponse => {
            console.log('Note Effect Delete Note Error Log, could not find:', errorResponse);
            return of()
          })
        )
    })
  )

  /* Navigate back when an action is successfully dispatched */
  @Effect({ dispatch: false }) succeed = this.action.pipe(
    ofType(NotesActions.actionTypes.SUCCESSFUL),
    tap(() => {
      this.location.back()
    })
  )

  constructor(private action: Actions, private location: Location) { }
}