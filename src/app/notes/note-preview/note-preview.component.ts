import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-note-preview',
  // templateUrl: './note-preview.component.html',
  // styleUrls: ['./note-preview.component.scss']
  template: '<div class="note-preview" [innerHTML]="content"></div>',
  styles: [
    '* { user-select: none; }'
  ]
})
export class NotePreviewComponent implements OnInit {
  @Input() content: string;
  constructor() { }

  ngOnInit() {
  }

}
