import { Component, OnInit } from '@angular/core';

import { Contact } from '../models/contact.model';
import { ContactsService } from '../services/contacts.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  contactNameInput = '';
  contactPhoneInput = '';
  contacts: Contact[] = [];

  loading = false;
  showSuccessAlert = false;
  showErrorAlert = false;
  alertText = '';
  showCreate = false;
  delegateFunction: Function;
  contactToEdit: Contact;

  constructor(private contactsService: ContactsService) { }

  ngOnInit() {
    this.loading = true;
    this.contactsService.getContacts().subscribe(items => {
      this.contacts = items;
      this.loading = false;
    });
  }

  createContact() {
    const contact: Contact = new Contact(this.contactNameInput, this.contactPhoneInput);

    if (!this.validateFields(contact)) {
      return;
    }

    this.contactsService.saveContact(contact).subscribe(item => {
      this.contacts.push(item);
      this.showSuccessNotification('Contact created!');
      this.showCreate = false;
    }, err => {
      this.showErrorNotification('Error creating the Task');
    });
  }

  editContact() {
    const contactToUpdated: Contact = new Contact(this.contactNameInput, this.contactPhoneInput);
    contactToUpdated._id = this.contactToEdit._id;

    if (!this.validateFields(contactToUpdated)) {
      return;
    }

    this.contactsService.updateContact(contactToUpdated).subscribe(item => {
      const index = this.contacts.findIndex(c => (c._id === contactToUpdated._id));
      this.contacts.splice(index, 1);
      this.contacts.splice(index, 0, contactToUpdated);
      this.showSuccessNotification('Contact updated!');
      this.showCreate = false;
    }, err => {
      this.showErrorNotification('Error updating the Task');
    });
  }

  validateFields(contact) {
    if (contact.name === '' || contact.phone === '') {
      this.showErrorNotification('Fill the name and phone');
      return false;
    }
    return true;
  }

  delete(contact) {
    if (confirm('Are you sure?')) {
      const index = this.contacts.findIndex(c => {
        return (c._id === contact._id);
      });
      this.contacts.splice(index, 1);

      this.contactsService.deleteContact(contact)
        .subscribe(success => {
            this.showSuccessNotification('Contact deleted!');
          }, err => {
            this.showErrorNotification('Error deleting the Contact');
            this.contacts.splice(index, 0, contact);
          });
    }
  }

  openEditContact(contact) {
    this.contactNameInput = contact.name;
    this.contactPhoneInput = contact.phone;
    this.showCreate = true;
    this.contactToEdit = contact;
    this.delegateFunction = this.editContact;
  }

  showNewCreateForm() {
    this.showCreate = !this.showCreate;
    this.contactNameInput = '';
    this.contactPhoneInput = '';
    this.delegateFunction = this.createContact;
  }

  showSuccessNotification(text) {
    this.alertText = text;
    this.showSuccessAlert = true;
    setTimeout(() => {
      this.showSuccessAlert  = false;
    }, 3000);
  }

  showErrorNotification(text) {
    this.alertText = text;
    this.showErrorAlert = true;
    setTimeout(() => {
      this.showErrorAlert  = false;
    }, 3000);
  }
}
