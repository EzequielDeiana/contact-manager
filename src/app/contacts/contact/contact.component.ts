import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IContact } from '../../contact';
import { ContactsService } from '../../contacts.service';
import { InMemoryDataService } from '../../in-memory-data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contact: IContact;
  contactForm: FormGroup;
  isEditMode: boolean = false;

  constructor(private _activatedRoute: ActivatedRoute, private _router: Router, private _formBuilder: FormBuilder, private _contactsService: ContactsService, private _inMemoryDB: InMemoryDataService) {
    this.contactForm = this._formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      phoneNumber: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const idParam = this._activatedRoute.snapshot.paramMap.get('id');
    if (idParam !== null) {
      const id = +idParam;
      this.getContact(id)
    }
  }

  changeMode() {
    if (this.isEditMode == false) {
      this.isEditMode = true;
    } else {
      this.isEditMode = false;
    }
  }

  redirectToContacts() {
    this._router.navigate(['contacts']);
  }

  getContact(id: number): void {
    this._contactsService.getContact(id)
      .then(contact => {
        this.contact = contact;
        this.contactForm.patchValue({
          name: contact.name,
          description: contact.description,
          phoneNumber: contact.phoneNumber
        });
      })
      .catch(error => console.error(error));
  }

  editContact(): void {
    this.isEditMode = true;
  }

  cancelEdit(): void {
    this.isEditMode = false;
    this.contactForm.reset({
      name: this.contact.name,
      description: this.contact.description,
      phoneNumber: this.contact.phoneNumber
    })
  }

  saveContact(): void {
    const editedContact: IContact = { ...this.contact, ...this.contactForm.value };
    this._contactsService.modifyContact(editedContact)
      .then(() => {
        this.isEditMode = false;
        this.contact = { ...editedContact };
        this.contactForm.reset();
      })
      .catch(err => console.error(err));
  }

  deleteContact(id: number) {
    this._contactsService.deleteContact(id).then((response => { console.log("deleted " + this.contact.id) }))
  }

}
