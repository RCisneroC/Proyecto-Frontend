import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoungeListComponent } from './maestros/lounge-list/lounge-list.component';
import { ScheduleActivitiesListComponent } from './schedule-activities-list/schedule-activities-list.component';
import { ScheduleActivityFormComponent } from './schedule-activity-form/schedule-activity-form.component';
import { ActivityListComponent } from './maestros/activity-list/activity-list.component';
import { ScheduleActivityDetailComponent } from './schedule-activity-detail/schedule-activity-detail.component';
import {BackofficeComponent} from './inscription/backoffice/backoffice.component'
import { ModalityListComponent } from './maestros/modality-list/modality-list.component';
import { TypeActivityListComponent } from './maestros/type-activity-list/type-activity-list.component';
import { ReasonListComponent } from './maestros/reason-list/reason-list.component';
import { SourceFundsListComponent } from './maestros/source-funds-list/source-funds-list.component';
import {ActivityListInscriptionComponent} from './inscription/activity-list-inscription/activity-list-inscription.component'
import {ScheduleListComponent}  from './inscription/schedule-list/schedule-list.component'
import { ActivityParticipantsListComponent } from './inscription/activity-participants-list/activity-participants-list.component';
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
    path: "lounge-list",
    component: LoungeListComponent,
  },
  {
    path: "activity-list",
    component: ActivityListComponent,
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
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdmissionRoutingModule { }

