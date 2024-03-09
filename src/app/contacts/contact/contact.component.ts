import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { IContact } from '../../contact';
import { ContactsService } from '../../contacts.service';
import { InMemoryDataService } from '../../in-memory-data.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contact: IContact;

  constructor(private _activatedRoute: ActivatedRoute, private _router: Router, private _contactsService: ContactsService, private _inMemoryDB: InMemoryDataService) { }

  ngOnInit(): void {
    const idParam = this._activatedRoute.snapshot.paramMap.get('id');
    if (idParam !== null) {
      const id = +idParam;
      this.getContact(id)
    }
  }

  getContact(id: number) {
    this._contactsService.getContact(id).then(contact => { this.contact = contact })
  }

}
