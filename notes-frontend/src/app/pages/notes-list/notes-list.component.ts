import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NoteCardComponent } from '../../note-card/note-card.component';
import { Note } from '../../shared/model/note';
import { NotesService } from '../../shared/notes.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notes-list',
  standalone: true,
  imports: [NoteCardComponent, RouterLink, CommonModule],
  templateUrl: './notes-list.component.html',
  styleUrl: './notes-list.component.scss',
})
export class NotesListComponent implements OnInit {
  @ViewChild('filterInput') filterInput!: ElementRef<HTMLInputElement>;

  notes: Note[] = new Array<Note>();
  filteredNotes: Note[] = new Array<Note>();

  constructor(private notesService: NotesService) {}

  ngOnInit(): void {
    this.notes = this.notesService.getAll();
    this.filteredNotes = this.notesService.getAll();
  }

  onDeleteNote(note: Note) {
    let noteId = this.notesService.getId(note);
    this.notesService.delete(noteId);
    this.filter(this.filterInput.nativeElement.value);
  }

  filter(query: string) {
    query = query.toLowerCase().trim();

    let allResults: Note[] = new Array<Note>();
    let terms: string[] = query.split(' ');

    terms = this.removeDuplicates(terms);

    terms.forEach((term) => {
      let results = this.relevantNotes(term);
      allResults = [...allResults, ...results];
    });

    let uniqueResults = this.removeDuplicates(allResults);
    this.filteredNotes = uniqueResults;

    this.sortResults(allResults);
  }

  removeDuplicates(arr: Array<any>): Array<any> {
    let uniqueResults: Set<any> = new Set<any>();
    arr.forEach((e) => uniqueResults.add(e));

    return Array.from(uniqueResults);
  }

  relevantNotes(query: string): Array<Note> {
    query = query.toLowerCase().trim();

    let relevantNotes = this.notes.filter((note) => {
      if (
        note.body?.toLowerCase().includes(query) ||
        note.title.toLowerCase().includes(query)
      ) {
        return true;
      } else {
        return false;
      }
    });

    return relevantNotes;
  }

  sortResults(searchResults: Note[]) {
    let noteCountObj: Map<number, number> = new Map<number, number>();

    searchResults.forEach((note) => {
      let noteId = this.notesService.getId(note);

      if (noteCountObj.has(noteId)) {
        noteCountObj.set(noteId, noteCountObj.get(noteId)! + 1);
      } else {
        noteCountObj.set(noteId, 1);
      }
    });

    this.filteredNotes = this.filteredNotes.sort((a: Note, b: Note) => {
      let aId = this.notesService.getId(a);
      let bId = this.notesService.getId(b);

      let aCount = noteCountObj.get(aId);
      let bCount = noteCountObj.get(bId);

      return bCount! - aCount!;
    });
  }

  generateNoteUrl(note: Note): string {
    let noteId = this.notesService.getId(note);
    return noteId.toString();
  }
}
