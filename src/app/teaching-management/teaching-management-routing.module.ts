import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeacherListComponent } from './teacher-list/teacher-list.component';
import { TeacherDetailComponent } from './teacher-detail/teacher-detail.component';
import { TeachingAdmissionExternalComponent } from './teaching-admission-external/teaching-admission-external.component';
import { TeachingHistoryListComponent } from './teaching-history-list/teaching-history-list.component';
import { InfoTeacherComponent } from './info-teacher/info-teacher.component';
import { DetailSubjectComponent } from './detail-subject/detail-subject.component';
import { DetailTaskComponent } from './detail-task/detail-task.component';
import { ListStudentsComponent } from './list-students/list-students.component';
import { FinalGradeComponent } from './final-grade/final-grade.component';
import { CareerListComponent } from './career-list/career-list.component';
import { StatisticsListComponent } from './statistics-list/statistics-list.component';

const routes: Routes = [
  {
    path: "teacher-list",
    component: TeacherListComponent,
  },
  {
    path: "teacher-detail/:cedula",
    component: TeacherDetailComponent,
  },
  {
    path: "teacher-admission-external",
    component: TeachingAdmissionExternalComponent,
  },
  {
    path: "teacher-admission-external/:id/:type",
    component: TeachingAdmissionExternalComponent,
  },
  {
    path: "teacher-history-list/:cedula",
    component: TeachingHistoryListComponent,
  },
  {
    path: "teacher-history-list",
    component: TeachingHistoryListComponent,
  },
  {
    path: "info-teacher",
    component: InfoTeacherComponent,
  },
  {
    path: "info-teacher/:cedula",
    component: InfoTeacherComponent,
  },
  {
    path: "detail-subject/:id",
    component: DetailSubjectComponent,
  },
  {
    path: "detail-task/:id",
    component: DetailTaskComponent,
  },
  {
    path: "detail-asignatura/:id",
    component: ListStudentsComponent,
  },
  {
    path: "list-students/:id",
    component: FinalGradeComponent,
  },
  {
    path: "career-list",
    component: CareerListComponent,
  },
  {
    path: "career-list/:cedula",
    component: CareerListComponent,
  },
  {
    path: "statistics-list",
    component: StatisticsListComponent,
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeachingManagementRoutingModule { }
