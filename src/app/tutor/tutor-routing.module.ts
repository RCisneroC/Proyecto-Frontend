import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TutorStudentDetailComponent} from "./tutor-student-detail/tutor-student-detail.component";

const routes: Routes = [
  {
    path: "student-detail/:id",
    component: TutorStudentDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TutorRoutingModule { }
