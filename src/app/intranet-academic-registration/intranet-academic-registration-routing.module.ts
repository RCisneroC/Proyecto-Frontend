import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoSolicitudesComponent } from './Solicitudes/listado-solicitudes/listado-solicitudes.component';
import { ListTaskActivityComponent } from './Task/Activity/list-task-activity/list-task-activity.component';
import { ListTaskSubjectComponent } from './Task/Subject/list-task-subject/list-task-subject.component';
import { DetailsInfoTaskComponent } from './Task/Subject/details-info-task/details-info-task.component';
import { DetailsInfoTaskActivityComponent } from './Task/Activity/details-info-task-activity/details-info-task-activity.component';
import { CreditosNoOficialesComponent } from './creditos-no-oficiales/creditos-no-oficiales.component';
import { CreditosOficialesComponent } from './creditos-oficiales/creditos-oficiales.component';

const routes: Routes = [
  {
    path: 'list-requests-various',
    component: ListadoSolicitudesComponent,
  },
  {
    path: 'list-task-subject',
    component: ListTaskSubjectComponent,
  },
  {
    path: 'details-task-subject/:id',
    component: DetailsInfoTaskComponent,
  },
  {
    path: 'details-task-activity/:id',
    component: DetailsInfoTaskActivityComponent,
  },
  {
    path: 'list-task-activity',
    component: ListTaskActivityComponent,
  },
  {
    path: 'creditos-no-oficiales',
    component: CreditosNoOficialesComponent,
  },
  {
    path: 'creditos-oficiales',
    component: CreditosOficialesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IntranetAcademicRegistrationRoutingModule { }
