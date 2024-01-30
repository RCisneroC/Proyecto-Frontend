import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InscriptionExternalComponent } from './inscription-external/inscription-external.component'
import { ViewActivityExternalComponent } from './view-activity-external/view-activity-external.component';
import { DetailsAnnualComponent } from './details-annual/details-annual.component';
const routes: Routes = [
  {
    path: "external-inscription/:id",
    component: InscriptionExternalComponent,
  },
  {
    path: "details-inscription/:id",
    component: ViewActivityExternalComponent,
  },
  {
    path: "details-annual-plan/:id",
    component: DetailsAnnualComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InscriptionExternalRoutingModule { }
