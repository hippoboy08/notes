import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  @Input() title: string = null;
  @Input() message: string = null;
  @Input() enableCheck: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() check = new EventEmitter<void>();
  constructor() { }

  ngOnInit() {
  }

  checkModal() {
    this.check.emit();
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
