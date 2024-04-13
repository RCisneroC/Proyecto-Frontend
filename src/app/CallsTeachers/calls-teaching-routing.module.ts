import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TeacherListComponent} from './teacher-list/teacher-list.component';
import { CallsListComponent } from './calls-list/calls-list.component';
import { TeacherApplyCallsComponent } from './teacher-apply-calls/teacher-apply-calls.component';
import { CallsNewComponent } from './calls-new/calls-new.component';
import { CallsEditComponent } from './calls-edit/calls-edit.component';
import { ViewCallForApplyComponent } from './view-call-for-apply/view-call-for-apply.component';
import { TeacherDetailComponent } from './teacher-detail/teacher-detail.component';
import { TeachingHistoryListComponent } from './teaching-history-list/teaching-history-list.component';
import { ListStudentsComponent } from './list-students/list-students.component';
import { CareerListComponent } from './career-list/career-list.component';
import { DetailSubjectComponent } from './detail-subject/detail-subject.component';
import { FinalGradeComponent } from './final-grade/final-grade.component';
import { TeacherEditComponent } from './teacher-edit/teacher-edit.component';
import { TeacherDocumentStatusComponent } from './teacher-document-status/teacher-document-status.component';

const routes: Routes = [
  {
    path: 'teacher-list',
    component: TeacherListComponent,
  },
  {
    path: 'calls-list',
    component: CallsListComponent,
  },
  {
    path: 'calls-new',
    component: CallsNewComponent,
  },
  {
    path: 'calls-edit/:id',
    component: CallsEditComponent,
  },
  {
    path: 'teacher-apply-calls',
    component: TeacherApplyCallsComponent,
  },
  {
    path: 'view-call-for-apply/:id',
    component: ViewCallForApplyComponent,
  },
  {
    path: 'teacher-detail/:cedula',
    component: TeacherDetailComponent,
  },
  {
    path: 'teacher-history-list/:cedula',
    component: TeachingHistoryListComponent,
  },
{
    path: 'detail-asignatura/:id',
    component: ListStudentsComponent,
  },
{
    path: 'career-list/:cedula',
    component: CareerListComponent,
  },
{
    path: 'detail-subject/:id',
    component: DetailSubjectComponent,
  },
{
    path: 'list-students/:id',
    component: FinalGradeComponent,
  },
  {
    path: 'teacher-edit',
    component: TeacherEditComponent,
  },
  {
    path: 'teacher-document-status',
    component: TeacherDocumentStatusComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CallsTeachingRoutingModule { }
