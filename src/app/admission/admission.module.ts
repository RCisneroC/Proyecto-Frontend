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


@NgModule({
  declarations: [
    ActivityListComponent,
    LoungeListComponent,
    ReasonListComponent,
    TypeActivityListComponent,
    ModalityListComponent,
    LoungeFormComponent
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
