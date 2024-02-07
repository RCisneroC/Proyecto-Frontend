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


@NgModule({
  declarations: [
    ListadoSolicitudesComponent,
    CreateSolicitudComponent,
    DetalleSolicitudComponent,
    ApprovedSolicitudComponent,
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
