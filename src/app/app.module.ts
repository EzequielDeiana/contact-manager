import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ContactComponent } from './contacts/contact/contact.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { InMemoryDataService } from './in-memory-data.service';
import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';

@NgModule({
  declarations: [
    AppComponent,
    ContactsComponent,
    ContactComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, { dataEncapsulation: false })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
