import { Injectable } from '@angular/core';
import { Note } from './model/note';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  notes: Note[] = new Array<Note>();

  constructor() {}

  getAll(): Note[] {
    return this.notes;
  }

  get(id: number): Note {
    return this.notes[id];
  }

  getId(note: Note): number {
    return this.notes.indexOf(note);
  }

  add(note: Note): number {
    let index = this.notes.push(note) - 1;
    return index;
  }

  update(id: number, title: string, body: string) {
    let updateNote = this.notes[id];
    updateNote.title = title;
    updateNote.body = body;
  }

  delete(id: number) {
    this.notes.splice(id, 1);
  }
}
