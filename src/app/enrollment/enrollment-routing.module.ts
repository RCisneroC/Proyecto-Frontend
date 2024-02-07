import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EnrollCareerComponent} from "./enroll-career/enroll-career.component";
import {EnrollPeriodComponent} from "./enroll-period/enroll-period.component";
import {EnrollSubjectsComponent} from "./enroll-subjects/enroll-subjects.component";
import {EnrollAssignedRoomsComponent} from "./enroll-assigned-rooms/enroll-assigned-rooms.component";
import {EnrollDetailsComponent} from "./enroll-details/enroll-details.component";

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
  },
  {
    path:"enroll-room",
    component: EnrollAssignedRoomsComponent
  },
  {
    path:"enroll-details",
    component: EnrollDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnrollmentRoutingModule { }
