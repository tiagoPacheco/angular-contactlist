import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  @Input() contact = {};
  @Output() contactDeleted = new EventEmitter();
  @Output() contactToUpdate = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  remove() {
    this.contactDeleted.emit();
  }

  edit() {
    this.contactToUpdate.emit();
  }

}
