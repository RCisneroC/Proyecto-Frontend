import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeachingManagementRoutingModule } from './teaching-management-routing.module';
import { TeacherListComponent } from './teacher-list/teacher-list.component';
import { TeacherDetailComponent } from './teacher-detail/teacher-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '@shared/components/components.module';
import { SharedModule } from '@shared';


@NgModule({
  declarations: [
    TeacherListComponent,
    TeacherDetailComponent
  ],
  imports: [
    CommonModule,
    TeachingManagementRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    SharedModule,
  ]
})
export class TeachingManagementModule { }
