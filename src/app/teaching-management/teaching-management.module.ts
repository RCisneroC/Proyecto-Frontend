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
import { RequiredDocumentListComponent } from './required-document-list/required-document-list.component';
import { RequiredDocumentFormComponent } from './required-document-form/required-document-form.component';
import { AddActivityComponent } from './add-activity/add-activity.component';
import { AddSubjectComponent } from './add-subject/add-subject.component';
import { InfoTeacherComponent } from './info-teacher/info-teacher.component';
import { DetailSubjectComponent } from './detail-subject/detail-subject.component';
import { DetailTaskComponent } from './detail-task/detail-task.component';
import { VerificarBS64Pipe } from 'app/pipes/verificar-bs64.pipe';
import { ListStudentsComponent } from './list-students/list-students.component';
import { AddAttendanceFormsComponent } from './add-attendance-forms/add-attendance-forms.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { AddCalifComponent } from './add-calif/add-calif.component';
import { FinalGradeComponent } from './final-grade/final-grade.component';
import { AddFinalGradeComponent } from './add-final-grade/add-final-grade.component';
import { CareerListComponent } from './career-list/career-list.component';
import { StatisticsListComponent } from './statistics-list/statistics-list.component';
import { FullCalendarModule } from '@fullcalendar/angular';


@NgModule({
  providers: [VerificarBS64Pipe,StatusProcessPipe],
  declarations: [
    TeacherListComponent,
    TeacherDetailComponent,
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
    InfoTeacherComponent,
    DetailSubjectComponent,
    DetailTaskComponent,
    AddTaskComponent,
    AddCalifComponent,
    AddAttendanceFormsComponent,
    ListStudentsComponent,
    FinalGradeComponent,
    AddFinalGradeComponent,
    CareerListComponent,
    StatisticsListComponent
  ],
  imports: [
    CommonModule,
    TeachingManagementRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    SharedModule,
    FullCalendarModule
  ]
})
export class TeachingManagementModule { }
