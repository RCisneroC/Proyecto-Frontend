import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

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
import { OfertasCarrerasComponent } from './OfertasAcademicas/ofertas-carreras/ofertas-carreras.component';
import { OfertasActividadesComponent } from './OfertasAcademicas/ofertas-actividades/ofertas-actividades.component';
import { BackofficeEFComponent } from './OfertasAcademicas/inscripcion/backoffice-ef.component';
import { ActivityListInscriptionComponent } from './OfertasAcademicas/inscripcion-actividades/activity-list-inscription.component';
import { BackofficeComponent } from './OfertasAcademicas/inscripcion-actividades/backoffice/backoffice.component';
import { InfoStudentComponent } from './info-student/info-student.component';
import { AddExperienceComponent } from './info-student/components/add-experience/add-experience.component';
import { ViewSurveyComponent } from './Encuestas/view-survey/view-survey.component';
import { VerificarBS64Pipe } from 'app/pipes/verificar-bs64.pipe';
import { MyTasksListComponent } from './my-tasks-list/my-tasks-list.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { SubjectHistoryComponent } from './subject-history/subject-history.component';
import { MyTaskApptivityListComponent } from './my-task-apptivity-list/my-task-apptivity-list.component';
import { FormCategoriesComponent } from './Forms/form-categories/form-categories.component';


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
    OfertasCarrerasComponent,
    OfertasActividadesComponent,
    BackofficeEFComponent,
    ActivityListInscriptionComponent,
    BackofficeComponent,
    InfoStudentComponent,
    AddExperienceComponent,
    ViewSurveyComponent,
    InfoStudentComponent,
    MyTasksListComponent,
    SubjectHistoryComponent,
    MyTaskApptivityListComponent,
    FormCategoriesComponent,
  ],
  providers: [VerificarBS64Pipe, DatePipe],
  imports: [
    CommonModule,
    EnrollmentRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    SharedModule,
    FullCalendarModule
  ]
})
export class EnrollmentModule { }
