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

  constructor(private _ActivatedRoute:ActivatedRoute, private _router:Router, private _ContactsService:ContactsService, private _InMemoryDB:InMemoryDataService) { }

  ngOnInit(): void {
    const idParam = this._ActivatedRoute.snapshot.paramMap.get('id');
    if(idParam !== null){
      const id = +idParam;
      this._ContactsService.getContact(id).subscribe(contact => {
        this.contact = contact;
      })
    }
  }
}
