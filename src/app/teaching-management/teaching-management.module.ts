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
import { AddExperienceComponent } from './add-experience/add-experience.component';
import { AprovedTeacherComponent } from './aproved-teacher/aproved-teacher.component';
import { AddTrainingComponent } from './add-training/add-training.component';
import { TeachingAdmissionExternalComponent } from './teaching-admission-external/teaching-admission-external.component';
import { TeachingHistoryListComponent } from './teaching-history-list/teaching-history-list.component';
import { VerificarBS64Pipe } from 'app/pipes/verificar-bs64.pipe';
import { RequiredDocumentListComponent } from './required-document-list/required-document-list.component';
import { RequiredDocumentFormComponent } from './required-document-form/required-document-form.component';
import { AddActivityComponent } from './add-activity/add-activity.component';
import { AddSubjectComponent } from './add-subject/add-subject.component';


@NgModule({
  declarations: [
    TeacherListComponent,
    TeacherDetailComponent,
    StatusProcessPipe,
    AddCourseComponent,
    AddExperienceComponent,
    AprovedTeacherComponent,
    AddTrainingComponent,
    TeachingAdmissionExternalComponent,
    TeachingHistoryListComponent,
    RequiredDocumentListComponent,
    RequiredDocumentFormComponent,
    AddActivityComponent,
    AddSubjectComponent,
  
  ],
  providers: [
    VerificarBS64Pipe
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
