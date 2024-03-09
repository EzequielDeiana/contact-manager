import { Injectable } from '@angular/core';
import { IContact } from './contact';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators'
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  private contactsUrl = 'api/contacts';

  private handleError<T>(operation = 'operation', result?: T){
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    }
  }
/*
  getContacts(): Observable<IContact[]>{
    return this.http.get<IContact[]>(this.contactsUrl)
    .pipe(catchError(this.handleError<IContact[]>('getContacts', [])));
  }
*/
  getContacts(): Promise<IContact[]>{
    return this.http.get<IContact[]>(this.contactsUrl)
    .pipe(catchError(this.handleError<IContact[]>('getContacts', [])))
    .toPromise();
  }  

  /*
  getContact(id: number): Observable<IContact>{
    const url = `${this.contactsUrl}/${id}`;
    return this.http.get<IContact>(url)
    .pipe(tap(_ => console.log(`fetched Contact from id: ${id}`)));
  } 
  */
   getContact(id: number): Promise<IContact>{
    const url = `${this.contactsUrl}/${id}`;
    return this.http.get<IContact>(url)
    .pipe(tap(_ => console.log(`fetched contact from id: ${id}`)))
    .toPromise();
   }

   /*
  addContact(contact: IContact): Observable<IContact>{
    return this.http.post<IContact>(this.contactsUrl, contact, this.httpOptions)
    .pipe(tap((newContact: IContact) => console.log(`added Contact ${newContact.name} with id = ${newContact.id}`)),
    catchError(this.handleError<IContact>('addContact')));
  }
  */
   addContact(contact: IContact): Promise<IContact>{
    return this.http.post<IContact>(this.contactsUrl, contact, this.httpOptions)
    .pipe(tap((newContact: IContact) => console.log(`added Contact ${newContact.name} with id = ${newContact.id}`)),
    catchError(this.handleError<IContact>('addContact')))
    .toPromise();
   }

   /*
  deleteContact(id: number): Observable<IContact>{
    const url = `${this.contactsUrl}/${id}`;
    return this.http.delete<IContact>(url, this.httpOptions)
    .pipe(tap(_ => console.log(`Deleted contact id= ${id}`)),
    catchError(this.handleError<IContact>('deletedContact')))
  }
  */
 
  deleteContact(id: number): Promise<IContact>{
    const url = `${this.contactsUrl}/${id}`;
    return this.http.delete<IContact>(url, this.httpOptions)
    .pipe(tap(_ => console.log(`Deleted contact with the id = ${id}`)),
    catchError(this.handleError<IContact>('deletedContact')))
    .toPromise();
  }

  /*
  modifyContact(contact: IContact): Observable<any>{
    return this.http.put(this.contactsUrl, contact, this.httpOptions).
    pipe(tap(_ => console.log(`updated contact with id = ${contact.id}`)),
    catchError(this.handleError<any>('updateContact')));
  }
  */

  modifyContact(contact: IContact): Promise<IContact>{
    return this.http.put(this.contactsUrl, contact, this.httpOptions)
    .pipe(tap(_ => console.log(`updated the contact with id = ${contact.id}`)),
    catchError(this.handleError<any>('updateContact')))
    .toPromise();
  }

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({'Contact-Type' : 'application/json'})
  }
}