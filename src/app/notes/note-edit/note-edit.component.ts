import { Component, OnInit, Output, EventEmitter, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { switchMap, map, tap } from 'rxjs/operators';

import * as fromApp from '../../store/app.reducers';
import * as NoteActions from '../store/notes.actions';
import { Note } from 'src/app/shared/models/note.model';
import { Stitch } from 'mongodb-stitch-browser-sdk';

@Component({
  selector: 'app-note-edit',
  templateUrl: './note-edit.component.html',
  styleUrls: ['./note-edit.component.scss']
})
export class NoteEditComponent implements OnInit {
  note: Note;
  noteForm: FormGroup;
  editMode: boolean;
  @Output() save = new EventEmitter<Note>();
  @Output() discard = new EventEmitter();

  constructor(private selectedRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.selectedRoute.params.subscribe((params) => {
      // console.log("Param: ", params);
      this.editMode = params.id === 'new' ? false : true;
      // console.log("Edit mode: ", this.editMode);
      this.store.select('notes').subscribe((noteState) => {
        this.note = noteState.notes.find(note => note.id === params.id)
      })
      this.initForm();
    });
  }

  initForm() {
    if(this.editMode === false) {
      this.note = new Note();
    }
    this.noteForm = new FormGroup({
      'id': new FormControl(this.note.id),
      'user': new FormControl(Stitch.defaultAppClient.auth.user.id || this.note.user),
      'content': new FormControl(this.note.content),
      'createdDate': new FormControl(this.note.createdDate),
    });
  }

  onSave() {
    // console.log(this.noteForm);
    this.note = this.noteForm.value;
    // console.log("note", this.note);
    if(this.editMode === false) {
      this.store.dispatch(new NoteActions.AddNoteStart(this.note));
    }else {
      this.store.dispatch(new NoteActions.UpdateNote({...this.note, createdDate: new Date()}));
    }
    this.store.dispatch(new NoteActions.EditNoteStop());
    this.location.back()
    this.save.emit();
  }

  onDiscard() {
    this.store.dispatch(new NoteActions.EditNoteStop());
    this.location.back()
    this.discard.emit();
  }

  @HostListener('document:keyup.escape', ['$event'])
  triggerDiscard() {
    this.onDiscard()
  }

}
