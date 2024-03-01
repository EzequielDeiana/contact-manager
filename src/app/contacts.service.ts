import { Injectable } from '@angular/core';
import { Contact } from './contact';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators'
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  private contactsUrl = 'api/contacts'

  private handleError<T>(operation = 'operation', result?: T){
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    }
  }

  getContacts(): Observable<Contact[]>{
    return this.http.get<Contact[]>(this.contactsUrl)
    .pipe(catchError(this.handleError<Contact[]>('getContacts', [])));
  }

  getContact(id: number): Observable<Contact>{
    const url = `${this.contactsUrl}/${id}`;
    return this.http.get<Contact>(url)
    .pipe(tap(_ => console.log(`fetched Contact from id: ${id}`)));
  } 

  addContact(contact: Contact): Observable<Contact>{
    return this.http.post<Contact>(this.contactsUrl, contact, this.httpOptions)
    .pipe(tap((newContact: Contact) => console.log(`added Contact ${newContact.name} with id = ${newContact.id}`)),
    catchError(this.handleError<Contact>('addContact')));
  }

  deleteContact(id: number): Observable<Contact>{
    const url = `${this.contactsUrl}/${id}`;
    return this.http.delete<Contact>(url, this.httpOptions)
    .pipe(tap(_ => console.log(`Deleted publication id= ${id}`)),
    catchError(this.handleError<Contact>('deletedContact')))
  }

  modifyContact(contact: Contact): Observable<any>{
    return this.http.put(this.contactsUrl, contact, this.httpOptions).
    pipe(tap(_ => console.log(`updated contact with id = ${contact.id}`)),
    catchError(this.handleError<any>('updateContact')));
  }

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({'Contact-Type' : 'application/json'})
  }
}