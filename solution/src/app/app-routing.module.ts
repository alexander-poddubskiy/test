import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EstablishmentListComponent } from './components/establishment-list/establishment-list.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "establishments",
    pathMatch: "full"
},
{ path: "establishments", component: EstablishmentListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
