import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EnrollCareerComponent} from "./enroll-career/enroll-career.component";
import {EnrollPeriodComponent} from "./enroll-period/enroll-period.component";
import {EnrollSubjectsComponent} from "./enroll-subjects/enroll-subjects.component";
import {EnrollAssignedRoomsComponent} from "./enroll-assigned-rooms/enroll-assigned-rooms.component";
import {EnrollDetailsComponent} from "./enroll-details/enroll-details.component";
import {EnrollDetailsMeshComponent} from "./enroll-details-mesh/enroll-details-mesh.component";
import { OfertasCarrerasComponent } from './OfertasAcademicas/ofertas-carreras/ofertas-carreras.component';
import { OfertasActividadesComponent } from './OfertasAcademicas/ofertas-actividades/ofertas-actividades.component';
import { BackofficeEFComponent } from './OfertasAcademicas/inscripcion/backoffice-ef.component';
import { ActivityListInscriptionComponent } from './OfertasAcademicas/inscripcion-actividades/activity-list-inscription.component';
import { BackofficeComponent } from './OfertasAcademicas/inscripcion-actividades/backoffice/backoffice.component';
import { InfoStudentComponent } from './info-student/info-student.component';
import { MyTasksListComponent } from './my-tasks-list/my-tasks-list.component';
import { SubjectHistoryComponent } from './subject-history/subject-history.component';

const routes: Routes = [
  {
    path: "enroll-career",
    component: EnrollCareerComponent
  },
  {
    path: "enroll-period/:id",
    component: EnrollPeriodComponent
  },
  {
    path: "enroll-subject/:id",
    component: EnrollSubjectsComponent
  },
  {
    path: "enroll-room",
    component: EnrollAssignedRoomsComponent
  },
  {
    path: "enroll-details/:id",
    component: EnrollDetailsComponent
  },
  {
    path: "enroll-details-mesh",
    component: EnrollDetailsMeshComponent
  },
  {
    path:"ofertasacademicas/ofertas-carreras",
    component: OfertasCarrerasComponent
  },
  {
    path: "ofertasacademicas/ofertas-actividades",
    component: OfertasActividadesComponent
  },
  {
    path: "ofertasacademicas/inscripcion/:id",
    component: BackofficeEFComponent
  },
  {
    path: "ofertasacademicas/inscripcion-actividades",
    component: ActivityListInscriptionComponent
  },
  {
    path: "ofertasacademicas/inscripcion-actividades/backoffice/:id",
    component: BackofficeComponent
  },
  {
    path:"info-student",
    component: InfoStudentComponent
  },
  {
    path:"my-tasks-list/:id",
    component: MyTasksListComponent
  },
  {
    path:"subject-history/:id/:cedula",
    component: SubjectHistoryComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnrollmentRoutingModule { }
