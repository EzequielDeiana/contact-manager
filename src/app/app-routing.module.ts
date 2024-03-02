import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactsComponent } from './contacts/contacts.component';
import { ContactComponent } from './contacts/contact/contact.component';

const routes: Routes = [
    {path:'', redirectTo: '/contacts', pathMatch: 'full'},
    {path: 'contacts', component: ContactsComponent},
      {path: 'contacts/detail/:id', component: ContactComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
