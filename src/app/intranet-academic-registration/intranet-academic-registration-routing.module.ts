import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoSolicitudesComponent } from './Solicitudes/listado-solicitudes/listado-solicitudes.component';
import { ListTaskActivityComponent } from './Task/Activity/list-task-activity/list-task-activity.component';
import { ListTaskSubjectComponent } from './Task/Subject/list-task-subject/list-task-subject.component';

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
    path: 'list-task-activity',
    component: ListTaskActivityComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IntranetAcademicRegistrationRoutingModule { }
