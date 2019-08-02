import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";

import { NotesListComponent } from './note-list/notes-list.component';
import { NoteEditComponent } from './note-edit/note-edit.component';
import { NoteStartComponent } from './note-start/note-start.component';
import { AuthGuard } from '../auth/auth-guard.service';

const routes: Routes = [
  {
    path: 'notes', component: NotesListComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      // { path: 'list', component: NoteStartComponent },
      { path: ':id', component: NoteEditComponent },
      { path: 'new', component: NoteEditComponent },
    ]
  },
  // { path: ':id', component: NoteEditComponent },
  // { path: 'new', component: NoteEditComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotesRoutingModule { }