import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CreateFormComponent} from './Components/create-form/create-form.component';

const routes: Routes = [
  { path: '', component: CreateFormComponent},
  { path: 'edit/:id', component: CreateFormComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
