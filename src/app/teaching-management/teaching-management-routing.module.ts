import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeacherListComponent } from './teacher-list/teacher-list.component';
import { TeacherDetailComponent } from './teacher-detail/teacher-detail.component';

const routes: Routes = [
  {
    path: "teacher-list",
    component: TeacherListComponent,
  },
  {
    path: "teacher-detail/:cedula",
    component: TeacherDetailComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeachingManagementRoutingModule { }
