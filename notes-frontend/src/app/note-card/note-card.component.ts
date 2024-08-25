import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  Renderer2,
  AfterViewInit,
  Input,
  input,
  Output,
  EventEmitter,
} from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-note-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './note-card.component.html',
  styleUrl: './note-card.component.scss',
})
export class NoteCardComponent implements OnInit, AfterViewInit {
  @Input() title!: string;
  @Input() body!: string;
  @Input() link!: string;

  @Output('delete') deleteNoteEvent = new EventEmitter<void>();

  @ViewChild('truncator') truncator!: ElementRef<HTMLElement>;
  @ViewChild('bodyText') bodyText!: ElementRef<HTMLElement>;

  constructor(private renderer: Renderer2) {}
  ngOnInit(): void {}

  ngAfterViewInit(): void {
    let style = window.getComputedStyle(this.bodyText.nativeElement, null);
    let viewableHeight = parseInt(style.getPropertyValue('height'), 10);

    if (this.bodyText.nativeElement.scrollHeight > viewableHeight) {
      this.renderer.setStyle(this.truncator.nativeElement, 'display', 'block');
    } else {
      this.renderer.setStyle(this.truncator.nativeElement, 'display', 'none');
    }
  }

  deleteNote() {
    this.deleteNoteEvent.emit();
  }
}
