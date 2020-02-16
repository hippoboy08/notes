import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";

import { NotesListComponent } from './note-list/notes-list.component';
import { NoteEditComponent } from './note-edit/note-edit.component';
import { NoteStartComponent } from './note-start/note-start.component';
import { AuthGuard } from '../auth/auth-guard.service';
import { NotesResolverService } from './notes-resolver.service';

const routes: Routes = [
  {
    path: 'notes', component: NotesListComponent,
    // canActivate: [AuthGuard],
    // canActivateChild: [AuthGuard],
    // children: [
    //   // { path: 'list', component: NoteStartComponent },
    //   { path: ':id', component: NoteEditComponent },
    //   { path: 'new', component: NoteEditComponent },
    // ]
  },
  { path: 'notes/:id', component: NoteEditComponent, resolve: [NotesResolverService] },
  { path: 'notes/new', component: NoteEditComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotesRoutingModule { }