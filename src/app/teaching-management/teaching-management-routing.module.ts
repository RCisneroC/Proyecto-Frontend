import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeacherListComponent } from './teacher-list/teacher-list.component';
import { TeacherDetailComponent } from './teacher-detail/teacher-detail.component';
import { TeachingAdmissionExternalComponent } from './teaching-admission-external/teaching-admission-external.component';
import { TeachingHistoryListComponent } from './teaching-history-list/teaching-history-list.component';
import { InfoTeacherComponent } from './info-teacher/info-teacher.component';

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
    path: "teacher-history-list",
    component: TeachingHistoryListComponent,
  },
  {
    path: "info-teacher",
    component: InfoTeacherComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeachingManagementRoutingModule { }
