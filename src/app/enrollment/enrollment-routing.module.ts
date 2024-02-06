import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EnrollCareerComponent} from "./enroll-career/enroll-career.component";

const routes: Routes = [
  {
    path:"enroll-career",
    component: EnrollCareerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnrollmentRoutingModule { }
