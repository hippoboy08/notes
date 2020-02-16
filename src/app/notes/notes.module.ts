import { NgModule } from "@angular/core";
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { NotesListComponent } from './note-list/notes-list.component';
import { NoteEditComponent } from './note-edit/note-edit.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NotesRoutingModule } from './notes-routing.module';
import { NoteStartComponent } from './note-start/note-start.component';
import { FilterPipe } from '../shared/pipes/filter.pipe';
import { HighlightPipe } from '../shared/pipes/highlight.pipe';
import { SharedModule } from '../shared/shared.module';
import { NotePreviewComponent } from './note-preview/note-preview.component';

@NgModule({
  declarations: [
    NotesListComponent,
    NoteEditComponent,
    NavBarComponent,
    NoteStartComponent,
    FilterPipe,
    HighlightPipe,
    NotePreviewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NotesRoutingModule,
    SharedModule
  ],
})
export class NotesModule { }