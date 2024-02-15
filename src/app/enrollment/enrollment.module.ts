import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnrollmentRoutingModule } from './enrollment-routing.module';
import { EnrollCareerComponent } from './enroll-career/enroll-career.component';
import { EnrollPeriodComponent } from './enroll-period/enroll-period.component';
import { EnrollSubjectsComponent } from './enroll-subjects/enroll-subjects.component';
import { EnrollAssignedRoomsComponent } from './enroll-assigned-rooms/enroll-assigned-rooms.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ComponentsModule } from "@shared/components/components.module";
import { SharedModule } from "@shared";
import { EnrollDetailsComponent } from './enroll-details/enroll-details.component';
import { EncuestaSubjectComponent } from './Encuestas/encuesta-subject/encuesta-subject.component';
import { EncuestaActivityComponent } from './Encuestas/encuesta-activity/encuesta-activity.component';
import { EnrollDetailsMeshComponent } from './enroll-details-mesh/enroll-details-mesh.component';


@NgModule({
  declarations: [
    EnrollCareerComponent,
    EnrollPeriodComponent,
    EnrollSubjectsComponent,
    EnrollAssignedRoomsComponent,
    EnrollDetailsComponent,
    EncuestaSubjectComponent,
    EncuestaActivityComponent,
    EnrollDetailsMeshComponent,
  ],
  imports: [
    CommonModule,
    EnrollmentRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    SharedModule,
  ]
})
export class EnrollmentModule { }
