import { Component, OnInit } from '@angular/core';
import { Form, FormsModule, NgForm } from '@angular/forms';
import { Note } from '../../shared/model/note';
import { NotesService } from '../../shared/notes.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-note-detail',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './note-detail.component.html',
  styleUrl: './note-detail.component.scss',
})
export class NoteDetailComponent implements OnInit {
  note!: Note;
  noteId!: number;
  new!: boolean;

  constructor(
    private notesService: NotesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.note = new Note();

      if (params['id']) {
        this.note = this.notesService.get(params['id']);
        this.noteId = params['id'];
        this.new = false;
      } else {
        this.new = true;
      }
    });
  }

  onSubmit(form: NgForm) {
    if (this.new) {
      this.notesService.add(form.value);
    } else {
      this.notesService.update(this.noteId, form.value.title, form.value.body);
      console.log(this.noteId, form.value.title, form.value.body);
    }

    this.router.navigateByUrl('/');
  }

  onCancel() {
    this.router.navigateByUrl('/');
  }
}
