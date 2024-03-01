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
import { ViewCalificacionesComponent } from './Forms/view-calificaciones/view-calificaciones.component';
import { EnrollAttendenceFormComponent } from './enroll-attendence-form/enroll-attendence-form.component';
import { ViewSurveyComponent } from './Encuestas/view-survey/view-survey.component';
import { InfoStudentComponent } from './info-student/info-student.component';
import { VerificarBS64Pipe } from 'app/pipes/verificar-bs64.pipe';


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
    ViewCalificacionesComponent,
    EnrollAttendenceFormComponent,
    ViewSurveyComponent,
    InfoStudentComponent,
  ],
  providers: [VerificarBS64Pipe],
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
