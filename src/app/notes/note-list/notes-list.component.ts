import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Stitch, RemoteMongoClient, UserPasswordCredential, RemoteMongoDatabase, StitchUser, AnonymousCredential } from "mongodb-stitch-browser-sdk";

import * as fromApp from '../../store/app.reducers';
import * as NoteActions from '../store/notes.actions';
import { Note } from '../../shared/models/note.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss']
})
export class NotesListComponent implements OnInit {
  notes: Note[] = [];
  isEditing: boolean = false;
  filterInput: string;

  constructor(private store: Store<fromApp.AppState>,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.store.dispatch(new NoteActions.GetNotes())
    this.store.select('notes').subscribe(notesState => {
      this.notes = notesState.notes;
      // console.log(this.notes.map((note) => {
      //   return note.id
      // }))
      this.isEditing = notesState.isEditing;
    })
    // this.store.select('auth').subscribe(authState => {
    //   this.user = authState.user
    // })
    // this.db = Stitch.defaultAppClient.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas-notesapp').db('notes-app');
  }

  addNote() {
    // console.log(this.route);
    this.store.dispatch(new NoteActions.EditNoteStart());
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  /* Save documents under the logged in user */
  saveData() {
    // this.db.collection('notes').insertMany(this.notes)
    // .then(result => {
    //   console.log(`Successfully inserted ${result.insertedIds} items!`);
    // })
    // .catch(err => console.error(`Failed to insert documents: ${err}`))
    
  }

  /* Load all documents issued by the logged in user */
  findData() {
    // this.store.dispatch(new NoteActions.GetNotes());
  }

  // /* save new note */
  // onSave() {
  //   this.store.dispatch(new NoteActions.EditNoteStop());
  // }

  // /* discard new note */
  // onDiscard() {
  //   this.store.dispatch(new NoteActions.EditNoteStop());
  // }

  /* discard new note */
  onDelete(noteId: string) {
    this.store.dispatch(new NoteActions.DeleteNote(noteId));
  }

  editNote(id: string) {

  }

}
