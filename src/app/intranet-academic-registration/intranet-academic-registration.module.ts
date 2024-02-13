import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IntranetAcademicRegistrationRoutingModule } from './intranet-academic-registration-routing.module';
import { ListadoSolicitudesComponent } from './Solicitudes/listado-solicitudes/listado-solicitudes.component';
import { CreateSolicitudComponent } from './Forms/create-solicitud/create-solicitud.component';
import { DetalleSolicitudComponent } from './Solicitudes/detalle-solicitud/detalle-solicitud.component';
import { ApprovedSolicitudComponent } from './Forms/approved-solicitud/approved-solicitud.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '@shared/components/components.module';
import { SharedModule } from '@shared';
import { ListTaskActivityComponent } from './Task/Activity/list-task-activity/list-task-activity.component';
import { ListTaskSubjectComponent } from './Task/Subject/list-task-subject/list-task-subject.component';
import { FormsCreateTaskComponent } from './Task/Activity/Forms/forms-create-task/forms-create-task.component';


@NgModule({
  declarations: [
    ListadoSolicitudesComponent,
    CreateSolicitudComponent,
    DetalleSolicitudComponent,
    ApprovedSolicitudComponent,
    ListTaskActivityComponent,
    ListTaskSubjectComponent,
    FormsCreateTaskComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    SharedModule,
    IntranetAcademicRegistrationRoutingModule,
  ]
})
export class IntranetAcademicRegistrationModule { }
