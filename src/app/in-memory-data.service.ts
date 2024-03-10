import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  createDb() {
    const contacts = [
      { id: 0, name: 'John Doe', description: 'Boss', phoneNumber: 1111111111 },
      { id: 1, name: 'Juan Mata', description: 'Football Player', phoneNumber: 1122222222 },
      { id: 3, name: 'Risa Tsumugi', description: 'DJ', phoneNumber: 1133333333 }
    ];
    return { contacts };
  }
}

