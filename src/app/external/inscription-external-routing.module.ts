import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {InscriptionExternalComponent} from './inscription-external/inscription-external.component'
import { ViewActivityExternalComponent } from './view-activity-external/view-activity-external.component';
const routes: Routes = [
  {
    path: "external-inscription/:id",
    component: InscriptionExternalComponent,
  },
  {
    path: "details-inscription/:id",
    component: ViewActivityExternalComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InscriptionExternalRoutingModule { }
