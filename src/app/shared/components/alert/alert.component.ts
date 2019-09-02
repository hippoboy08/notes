import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  @Input() message: string = null;
  @Output() close = new EventEmitter<void>();
  constructor() { }

  ngOnInit() {
  }

  closeModal() {
    this.close.emit();
  }

  /* Trigger the event when Escape key is pressed */
  @HostListener('document:keydown.escape', ['$event'])
  triggerClose() {
    // console.log(event);
    this.closeModal()
  }
  /* Another usage */
  /*
  @HostListener('document:keydown', ['$event'])
  triggerClose(event: KeyboardEvent) {
    if(event.key === "Escape")
      this.closeModal()
  }*/

}
