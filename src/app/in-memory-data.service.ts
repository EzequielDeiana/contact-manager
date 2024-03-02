import { Injectable } from '@angular/core';
import { IContact } from './contact';
import { InMemoryDbService} from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService{
  
  createDb(){
    const contacts = [
      {id:0, name: 'John Doe', description: 'Boss', phoneNumber: 1111111111},
      {id:1, name: 'Juan Mata', description: 'Football Player', phoneNumber: 1122222222}
    ];
    return {contacts};
  }
}

