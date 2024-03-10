import { Component, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EventEmitter } from '@angular/core';
import { IContact } from '../contact';
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Output() searchResult = new EventEmitter<IContact[]>();
  term: string = '';

  constructor(private _router: Router, private _contactsService:ContactsService) { }

  search(): void {
    this._contactsService.searchContacts(this.term)
    .then(contacts => this.searchResult.emit(contacts))
    .catch(err => console.error(err));
  }

  ngOnInit(): void {
  }

  redirectToContacts(){
    this._router.navigate(['contacts']);
  }

}
