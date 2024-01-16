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
import { ActivityParticipantsListComponent } from './inscription/activity-participants-list/activity-participants-list.component';
import { ListRequestPosterComponent } from './Approvals/list-request-poster/list-request-poster.component';
import { ListRequestRoomsComponent } from './Approvals/list-request-rooms/list-request-rooms.component';
import { ListCooperatingOrganizationComponent } from './maestros/list-cooperating-organization/list-cooperating-organization.component';
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
    component: ActivityParticipantsListComponent,
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
  } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdmissionRoutingModule { }

