import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoungeListComponent } from './maestros/lounge-list/lounge-list.component';

const routes: Routes = [

  {
    path: "lounge-list",
    component: LoungeListComponent,
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdmissionRoutingModule { }

