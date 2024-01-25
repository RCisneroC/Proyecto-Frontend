import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeacherListComponent } from './teacher-list/teacher-list.component';
import { TeacherDetailComponent } from './teacher-detail/teacher-detail.component';
import { TeachingAdmissionExternalComponent } from './teaching-admission-external/teaching-admission-external.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeachingManagementRoutingModule { }
