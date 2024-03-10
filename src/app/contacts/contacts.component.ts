import { Component, OnInit, OnDestroy } from '@angular/core';
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

  constructor(private _contactsService: ContactsService, private _router: Router) { }

  redirectTo(id: number) {
    this._router.navigate(['contacts/detail', id]);
  }

}

