import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ComponentsModule } from "@shared/components/components.module";
import { SharedModule } from "@shared";
import { VerificarBS64Pipe } from 'app/pipes/verificar-bs64.pipe';
import { TeacherListComponent } from './teacher-list/teacher-list.component';
import { TeacherDetailComponent } from './teacher-detail/teacher-detail.component';
import { AprovedTeacherComponent } from './aproved-teacher/aproved-teacher.component';
import { AddActivityComponent } from './add-activity/add-activity.component';
import { AddExperienceComponent } from './add-experience/add-experience.component';
import { AddSubjectComponent } from './add-subject/add-subject.component';
import { AddTrainingComponent } from './add-training/add-training.component';
import { CallsListComponent } from './calls-list/calls-list.component';
import { TeacherApplyCallsComponent } from './teacher-apply-calls/teacher-apply-calls.component';
import { StatusProcessPipe } from 'app/pipes/status-process.pipe';
import { CallsTeachingRoutingModule } from './calls-teaching-routing.module';
import { CallsNewComponent } from './calls-new/calls-new.component';
import { CallsEditComponent } from './calls-edit/calls-edit.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { AprovedCallsTeachersComponent } from './aproved-calls-teachers/aproved-calls-teachers.component';
import { ViewCallForApplyComponent } from './view-call-for-apply/view-call-for-apply.component';
import { TeachingHistoryListComponent } from './teaching-history-list/teaching-history-list.component';
import { ListStudentsComponent } from './list-students/list-students.component';
import { CareerListComponent } from './career-list/career-list.component';
import { DetailSubjectComponent } from './detail-subject/detail-subject.component';
import { FinalGradeComponent } from './final-grade/final-grade.component';


@NgModule({
  providers: [VerificarBS64Pipe, DatePipe, StatusProcessPipe],
  declarations: [
    TeacherListComponent,
    TeacherDetailComponent,
    AprovedTeacherComponent,
    AddActivityComponent,
    AddExperienceComponent,
    AddSubjectComponent,
    AddTrainingComponent,
    CallsListComponent,
    TeacherApplyCallsComponent,
    CallsNewComponent,
    CallsEditComponent,
    AprovedCallsTeachersComponent,
    ViewCallForApplyComponent,
    TeachingHistoryListComponent,
    ListStudentsComponent,
    CareerListComponent,
    DetailSubjectComponent,
    FinalGradeComponent

  ],
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    CallsTeachingRoutingModule,
    CKEditorModule
  ]
})
export class CallsTeachingModule { }
