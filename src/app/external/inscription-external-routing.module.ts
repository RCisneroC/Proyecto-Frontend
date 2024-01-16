import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {InscriptionExternalComponent} from './inscription-external/inscription-external.component'
const routes: Routes = [
  {
    path: "external-inscription",
    component: InscriptionExternalComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InscriptionExternalRoutingModule { }
