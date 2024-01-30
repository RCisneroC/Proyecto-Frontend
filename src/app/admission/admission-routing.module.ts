
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoungeListComponent } from './maestros/lounge-list/lounge-list.component';
import { ScheduleActivitiesListComponent } from './schedule-activities-list/schedule-activities-list.component';
import { ScheduleActivityFormComponent } from './schedule-activity-form/schedule-activity-form.component';
import { ScheduleActivityDetailComponent } from './schedule-activity-detail/schedule-activity-detail.component';
import {BackofficeComponent} from './inscription/backoffice/backoffice.component'
import { ModalityListComponent } from './maestros/modality-list/modality-list.component';
import { TypeActivityListComponent } from './maestros/type-activity-list/type-activity-list.component';
import { ReasonListComponent } from './maestros/reason-list/reason-list.component';
import { SourceFundsListComponent } from './maestros/source-funds-list/source-funds-list.component';
import { ActivityUbicationListComponent } from './maestros/activity-ubication-list/activity-ubication-list.component';
import { SuppliesListComponent } from './maestros/supplies-list/supplies-list.component';
import { StatusListComponent } from './maestros/status-list/status-list.component';
import { DocumentRequiredListComponent } from './maestros/document-required-list/document-required-list.component';
import { ActivitydetailComponent } from './activitydetail/activitydetail.component';
import { ListCurriculumDesignComponent } from './Approvals/list-curriculum-design/list-curriculum-design.component';
import { DeatilActivityCurriculumDesignComponent } from './Approvals/deatil-activity-curriculum-design/deatil-activity-curriculum-design.component';

import {ActivityListInscriptionComponent} from './inscription/activity-list-inscription/activity-list-inscription.component'
import {ScheduleListComponent}  from './inscription/schedule-list/schedule-list.component'
import { ActivityParticipantsListComponent } from './inscription/approval/activity-participants-list/activity-participants-list.component';
import { ListRequestPosterComponent } from './Approvals/list-request-poster/list-request-poster.component';
import { ListRequestRoomsComponent } from './Approvals/list-request-rooms/list-request-rooms.component';
import { ListCooperatingOrganizationComponent } from './maestros/list-cooperating-organization/list-cooperating-organization.component';
import { RoomRequestsComponent } from './activitydetail/forms/room-requests/room-requests.component';
import { ListscheduleComponent } from './inscription/approval/listschedule/listschedule.component';
import { ListActivityComponent } from './inscription/approval/list-activity/list-activity.component';
import { BackofficeEFComponent } from './inscription/educacionformal/forms/backoffice-ef/backoffice-ef.component';
import { DetalleParticipanteComponent } from './inscription/approval/activity-participants-list/detalle/detalle-participante/detalle-participante.component';
import { DegreeComponent } from './FormalEducations/Maestros/degree/degree.component';
import { SubjectComponent } from './FormalEducations/Maestros/subject/subject.component';
import { DegreeAdminissionRequirementComponent } from './FormalEducations/Gestions/curriculum-design/degree-adminission-requirement/degree-adminission-requirement.component';
import { DeggreeCompetenceComponent } from './FormalEducations/Gestions/curriculum-design/deggree-competence/deggree-competence.component';
import { RoomsComponent } from './FormalEducations/Maestros/rooms/rooms.component';
import { StatusComponent } from './FormalEducations/Maestros/status/status.component';
import { DegreeAdmissionRequirementComponent } from './FormalEducations/Maestros/degree-admission-requirement/degree-admission-requirement.component';
import { DegreeCompetenceComponent } from './FormalEducations/Maestros/degree-competence/degree-competence.component';
import { StudyModeComponent } from './FormalEducations/Maestros/study-mode/study-mode.component';
import {
  PlanListInscriptionComponent
} from "./inscription/educacionformal/approval/plan-list-inscription/plan-list-inscription.component";
import {
  MeshListInscriptionComponent
} from "./inscription/educacionformal/approval/mesh-list-inscription-component/mesh-list-inscription-component.component";
import {
  PartakerListInscriptionComponent
} from "./inscription/educacionformal/approval/partaker-list-inscription-component/partaker-list-inscription-component.component";
const routes: Routes = [

  {
    path: "schedule-activities-list",
    component: ScheduleActivitiesListComponent,
  },
  {
    path: "schedule-activity-form",
    component: ScheduleActivityFormComponent,
  },
  {
    path: "schedule-activity-detail/:id",
    component: ScheduleActivityDetailComponent,
  },
   {
    path: "reservar-salones/:id",
    component: RoomRequestsComponent,
  },
  {
    path: "activity-detail/:id",
    component: ActivitydetailComponent,
  },
  // aprobaciones.
  // maestras
  {
    path: "list-curriculum",
    component: ListCurriculumDesignComponent,
  },
  {
    path: "detalle-curriculum-activity",
    component: DeatilActivityCurriculumDesignComponent,
  },

   {
    path: "source-funds-list",
    component: SourceFundsListComponent,
  },
  {
    path: "activity-ubication-list",
    component: ActivityUbicationListComponent,
  },
  {
    path: "modality-list",
    component: ModalityListComponent,
  },
  {
    path: "cooperating-organization",
    component: ListCooperatingOrganizationComponent,
  },
  {
    path: "reason-list",
    component: ReasonListComponent,
  },
  {
    path: "type-activity-list",
    component: TypeActivityListComponent,
  },
  {
    path: "supplies-list",
    component: SuppliesListComponent
    ,
  },
  {
    path: "lounge-list",
    component: LoungeListComponent,
  },
  {
    path: "documentation-required-list",
    component: DocumentRequiredListComponent,
  },
  {
    path: "status-list",
    component: StatusListComponent,
  },
  {
    path: "backoffice/:id",
    component: BackofficeComponent,
  },
  {
    path: "modality-list",
    component: ModalityListComponent,
  },
  {
    path: "type-activity-list",
    component: TypeActivityListComponent,
  },
  {
    path: "reason-list",
    component: ReasonListComponent,
  },
  {
    path: "source-funds-list",
    component: SourceFundsListComponent,
  },
  {
    path: "activity-list-inscription/:id",
    component: ActivityListInscriptionComponent,
  },
  {
    path: "schedule-list",
    component: ScheduleListComponent,
  },
  {
    path: "activity-participants-list",
    component: ListscheduleComponent,
  },
  {
    path: "listado-participans/:id", //listo.
    component:ActivityParticipantsListComponent,
  },
   {
    path: "detalle-participans/:id", //listo.
    component:DetalleParticipanteComponent,
  },
    {
    path: "activity-inscription/:id",
    component: ListActivityComponent,
  },
  {
    path: "list-curriculum-approve",
    component: ListCurriculumDesignComponent,
  },
  {
    path: "list-curriculum-approve/:id",
    component: DeatilActivityCurriculumDesignComponent,
  },
  {
    path: "list-post-approve",
    component: ListRequestPosterComponent,
  },
  {
    path: "list-rooms-approve",
    component: ListRequestRoomsComponent,
  },
  {
    path:"list-inscriptions-plans",
    component: PlanListInscriptionComponent
  },
  {
    path:"list-inscriptions-mesh/:id",
    component: MeshListInscriptionComponent
  },
  {
    path:"list-inscriptions-partaker/:id",
    component: PartakerListInscriptionComponent
  },
    // ajustes  EF
  {
    path: "carreras",
    component: DegreeComponent,
  },
  {
    path: "asignaturas",
    component: SubjectComponent,
  },
  {
    path: "documentos-requeridos",
    component: DegreeAdmissionRequirementComponent,
  },
  {
    path: "competencias",
    component: DegreeCompetenceComponent,
  },
  {
    path: "modo-estudios",
    component: StudyModeComponent,
  },
  {
    path: "salones",
    component: RoomsComponent,
  },
  {
    path: "estado",
    component:StatusComponent ,
  },
  {
    path: "form-ef",
    component:BackofficeEFComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdmissionRoutingModule { }

