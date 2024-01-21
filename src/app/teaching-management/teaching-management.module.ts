import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeachingManagementRoutingModule } from './teaching-management-routing.module';
import { TeacherListComponent } from './teacher-list/teacher-list.component';
import { TeacherDetailComponent } from './teacher-detail/teacher-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '@shared/components/components.module';
import { SharedModule } from '@shared';
import { StatusProcessPipe } from 'app/pipes/status-process.pipe';
import { AddCourseComponent } from './add-course/add-course.component';


@NgModule({
  declarations: [
    TeacherListComponent,
    TeacherDetailComponent,
    StatusProcessPipe,
    AddCourseComponent
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
