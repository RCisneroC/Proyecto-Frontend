import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EnrollCareerComponent} from "./enroll-career/enroll-career.component";
import {EnrollPeriodComponent} from "./enroll-period/enroll-period.component";
import {EnrollSubjectsComponent} from "./enroll-subjects/enroll-subjects.component";

const routes: Routes = [
  {
    path:"enroll-career",
    component: EnrollCareerComponent
  },
  {
    path:"enroll-period/:id",
    component: EnrollPeriodComponent
  },
  {
    path:"enroll-subject/:id",
    component: EnrollSubjectsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnrollmentRoutingModule { }
