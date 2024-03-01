import { Component, OnInit, OnDestroy } from '@angular/core';
import { ContactsService } from '../contacts.service';
import { Contact } from '../contact';
import { Router } from '@angular/router';


@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  contacts: Contact[];
  show: boolean = true;

  ngOnInit(): void {
    this.getContacts();
    console.log(this.show);
  }

  avaible(){
    this.show = true;
  }
  unavaible(){
    this.show = false;
    console.log(this.show);
  }

  getContacts(){
    this._ContactsService.getContacts().subscribe(contacts => {
      this.contacts = contacts;
    });
  }

  
  constructor(private _ContactsService: ContactsService, private _router:Router){
  }

  redirectTo(id: number){
    this._router.navigate(['contacts/detail', id]);
  }

}

