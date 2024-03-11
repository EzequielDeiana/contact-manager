import { Component, OnInit} from '@angular/core';
import { ContactsService } from '../contacts.service';
import { IContact } from '../contact';
import { Router } from '@angular/router';


@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  contacts: IContact[];

  ngOnInit(): void {
    this.getContacts();
  }

  getContacts() {
    this._contactsService.getContacts().then(contacts => { this.contacts = contacts; })
      .catch(error => { console.error(error); })
  };

  updateContacts(contacts: IContact[]): void {
    this.contacts = contacts;
  }

  addContact(name: string, description: string, phoneNumber: string): void {
    name = name.trim();
    description = description.trim();
    phoneNumber = phoneNumber.trim();

    if (!name || !description || !phoneNumber) { return; }

    const phoneNumberAsNumber = parseInt(phoneNumber, 10);

    if (isNaN(phoneNumberAsNumber)) {
      console.error('Invalid');
      return;
    }

    this._contactsService.addContact({ name, description, phoneNumber: phoneNumberAsNumber } as IContact)
      .then(contact => {
        this.contacts.push(contact);
        name = '';
        description = '';
        phoneNumber = '';
        this.redirectTo(contact.id);
      })
      .catch(err => console.error(err));

  }

  constructor(private _contactsService: ContactsService, private _router: Router) { }

  redirectTo(id: number) {
    this._router.navigate(['contacts/detail', id]);
  }

}

