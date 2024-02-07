import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoSolicitudesComponent } from './Solicitudes/listado-solicitudes/listado-solicitudes.component';

const routes: Routes = [
  {
    path: 'list-requests-various',
    component: ListadoSolicitudesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IntranetAcademicRegistrationRoutingModule { }
