import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TutorStudentDetailComponent} from "./tutor-student-detail/tutor-student-detail.component";
import {
  TutorStudentSubjectDetailComponent
} from "./tutor-student-subject-detail/tutor-student-subject-detail.component";

const routes: Routes = [
  {
    path: "student-detail/:id",
    component: TutorStudentDetailComponent
  },
  {
    path: "subject-detail/:id",
    component: TutorStudentSubjectDetailComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TutorRoutingModule { }
