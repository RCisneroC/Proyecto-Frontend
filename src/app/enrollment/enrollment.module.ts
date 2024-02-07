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


@NgModule({
  declarations: [
    EnrollCareerComponent,
    EnrollPeriodComponent,
    EnrollSubjectsComponent,
    EnrollAssignedRoomsComponent,
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
