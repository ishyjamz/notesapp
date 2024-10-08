import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { Router } from 'express';
import { NotesListComponent } from './pages/notes-list/notes-list.component';
import { MainLayoutComponent } from './pages/main-layout/main-layout.component';
import { NoteDetailComponent } from './pages/note-detail/note-detail.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: NotesListComponent },
      { path: 'new', component: NoteDetailComponent },
      { path: ':id', component: NoteDetailComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
