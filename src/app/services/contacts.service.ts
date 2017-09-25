import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Contact } from '../models/contact.model';

@Injectable()
export class ContactsService {

  constructor(private http: Http) { }

  url = 'https://nodejs-todolist-api.herokuapp.com/contacts/thgp';

  contacts: Contact[] = [];

  getContacts() {
    return this.http.get(this.url).map(response => response.json());
  }

  saveContact(contact) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this.http.post(this.url, JSON.stringify(contact), options)
      .map(res => res.json());
  }

  updateContact(contact) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this.http.put(this.getContactUrl(contact._id), JSON.stringify(contact), options)
      .map(res => res.json());
  }

  deleteContact(contact) {
    return this.http.delete(this.getContactUrl(contact._id))
      .map(res => res.json());
  }

  getContactUrl(id) {
    return `${this.url}/${id}`;
  }
}
