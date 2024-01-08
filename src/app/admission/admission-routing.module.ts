import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoungeListComponent } from './maestros/lounge-list/lounge-list.component';
import { ScheduleActivitiesListComponent } from './schedule-activities-list/schedule-activities-list.component';
import { ScheduleActivityFormComponent } from './schedule-activity-form/schedule-activity-form.component';
import { ActivityListComponent } from './maestros/activity-list/activity-list.component';
import { ScheduleActivityDetailComponent } from './schedule-activity-detail/schedule-activity-detail.component';
import {BackofficeComponent} from './inscription/backoffice/backoffice.component'
import {InternalUserComponent} from './inscription/internal-user/internal-user.component'
import { ExternalUserComponent } from './inscription/external-user/external-user.component';
import { ModalityListComponent } from './maestros/modality-list/modality-list.component';
import { TypeActivityListComponent } from './maestros/type-activity-list/type-activity-list.component';
import { ReasonListComponent } from './maestros/reason-list/reason-list.component';
import { SourceFundsListComponent } from './maestros/source-funds-list/source-funds-list.component';
import { ActivityUbicationListComponent } from './maestros/activity-ubication-list/activity-ubication-list.component';
import { SuppliesListComponent } from './maestros/supplies-list/supplies-list.component';
import { DocumentRequiredFormComponent } from './maestros/document-required-form/document-required-form.component';
import { StatusListComponent } from './maestros/status-list/status-list.component';
import { DocumentRequiredListComponent } from './maestros/document-required-list/document-required-list.component';

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

  //maestras
  //    {
  //   path: "activity-list",
  //   component: ActivityListComponent,
  // },

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
    path: "backoffice",
    component: BackofficeComponent,
  },
  {
    path: "internal-user",
    component: InternalUserComponent,
  },
  {
    path: "external-user",
    component: ExternalUserComponent,
  },
  
 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdmissionRoutingModule { }

