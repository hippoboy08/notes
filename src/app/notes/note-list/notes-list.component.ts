import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from '../../store/app.reducers';
import * as NoteActions from '../store/notes.actions';
import { Note } from '../../shared/models/note.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Stitch } from 'mongodb-stitch-browser-sdk';

declare let marked: any;

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss']
})
export class NotesListComponent implements OnInit {
  notes: Note[] = [];
  isEditing: boolean = false;
  isLoading: boolean = false;
  isConfirmed: boolean = true;
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
      this.isLoading = notesState.isLoading;
    })
    // this.store.select('auth').subscribe(authState => {
    //   this.user = authState.user
    // })
    // this.db = Stitch.defaultAppClient.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas-notesapp').db('notes-app');
  }

  renderPreview(content: string) {
    return marked(content);
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

  /* remove selected note */
  onDelete(noteId: string) {
    this.store.dispatch(new NoteActions.DeleteNote(noteId));
    this.isConfirmed = true;
  }

  /* Navigate to the editor with the selected note id */
  editNote(id: string) {
    this.router.navigate([id], {relativeTo: this.route})
  }

  /* Get current user ID */
  getUser(): string {
    return Stitch.defaultAppClient.auth.user.id;
  }
}
