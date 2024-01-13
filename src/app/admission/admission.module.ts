import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdmissionRoutingModule } from './admission-routing.module';
import { ActivityListComponent } from './maestros/activity-list/activity-list.component';
import { LoungeListComponent } from './maestros/lounge-list/lounge-list.component';
import { ReasonListComponent } from './maestros/reason-list/reason-list.component';
import { TypeActivityListComponent } from './maestros/type-activity-list/type-activity-list.component';
import { ModalityListComponent } from './maestros/modality-list/modality-list.component';
import { LoungeFormComponent } from './maestros/lounge-form/lounge-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '@shared/components/components.module';
import { SharedModule } from '@shared';
import { ScheduleActivityFormComponent } from './schedule-activity-form/schedule-activity-form.component';
import { ScheduleActivitiesListComponent } from './schedule-activities-list/schedule-activities-list.component';
import { ActivityFormComponent } from './maestros/activity-form/activity-form.component';
import { ScheduleActivityDetailComponent } from './schedule-activity-detail/schedule-activity-detail.component';
import { ScheduleActivityDetailFormComponent } from './schedule-activity-detail-form/schedule-activity-detail-form.component';
import { BackofficeComponent } from './inscription/backoffice/backoffice.component';
import { ExternalUserComponent } from './inscription/external-user/external-user.component';
import { InternalUserComponent } from './inscription/internal-user/internal-user.component';
import { ModalityFormComponent } from './maestros/modality-form/modality-form.component';
import { TypeActivityFormComponent } from './maestros/type-activity-form/type-activity-form.component';
import { ReasonFormComponent } from './maestros/reason-form/reason-form.component';
import { SourceFundsFormComponent } from './maestros/source-funds-form/source-funds-form.component';
import { SourceFundsListComponent } from './maestros/source-funds-list/source-funds-list.component';
import { ActivityUbicationListComponent } from './maestros/activity-ubication-list/activity-ubication-list.component';
import { ActivityUbicationFormComponent } from './maestros/activity-ubication-form/activity-ubication-form.component';
import { SuppliesListComponent } from './maestros/supplies-list/supplies-list.component';
import { SuppliesListFormComponent } from './maestros/supplies-list-form/supplies-list-form.component';
import { DocumentRequiredFormComponent } from './maestros/document-required-form/document-required-form.component';
import { DocumentRequiredListComponent } from './maestros/document-required-list/document-required-list.component';
import { StatusListComponent } from './maestros/status-list/status-list.component';
import { StatusFormComponent } from './maestros/status-form/status-form.component';
import { ActivitydetailComponent } from './activitydetail/activitydetail.component';
import { StatusPipePipe } from 'app/pipes/status-pipe.pipe';
import { ListCurriculumDesignComponent } from './Approvals/list-curriculum-design/list-curriculum-design.component';
import { DeatilActivityCurriculumDesignComponent } from './Approvals/deatil-activity-curriculum-design/deatil-activity-curriculum-design.component';



@NgModule({
  declarations: [
    ActivityListComponent,
    LoungeListComponent,
    ReasonListComponent,
    TypeActivityListComponent,
    ModalityListComponent,
    LoungeFormComponent,
    ScheduleActivityFormComponent,
    ScheduleActivitiesListComponent,
    ActivityFormComponent,
    ScheduleActivityDetailComponent,
    ScheduleActivityDetailFormComponent,
    BackofficeComponent,
    ExternalUserComponent,
    InternalUserComponent,
    ModalityFormComponent,
    TypeActivityFormComponent,
    ReasonFormComponent,
    SourceFundsFormComponent,
    SourceFundsListComponent,
    ActivityUbicationListComponent,
    ActivityUbicationFormComponent,
    SuppliesListComponent,
    SuppliesListFormComponent,
    DocumentRequiredFormComponent,
    DocumentRequiredListComponent,
    StatusListComponent,
    StatusFormComponent,
    ActivitydetailComponent,
    StatusPipePipe,
    ListCurriculumDesignComponent,
    DeatilActivityCurriculumDesignComponent
  ],
  imports: [
    CommonModule,
    AdmissionRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    SharedModule
  ]
})
export class AdmissionModule { }
