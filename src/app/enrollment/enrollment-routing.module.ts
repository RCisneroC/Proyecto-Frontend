import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EnrollCareerComponent} from "./enroll-career/enroll-career.component";
import {EnrollPeriodComponent} from "./enroll-period/enroll-period.component";
import {EnrollSubjectsComponent} from "./enroll-subjects/enroll-subjects.component";
import {EnrollAssignedRoomsComponent} from "./enroll-assigned-rooms/enroll-assigned-rooms.component";
import {EnrollDetailsComponent} from "./enroll-details/enroll-details.component";
import {EnrollDetailsMeshComponent} from "./enroll-details-mesh/enroll-details-mesh.component";
import { InfoStudentComponent } from './info-student/info-student.component';

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
    path:"enroll-details/:id",
    component: EnrollDetailsComponent
  },
  {
    path:"enroll-details-mesh",
    component: EnrollDetailsMeshComponent
  },
  {
    path:"info-student",
    component: InfoStudentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnrollmentRoutingModule { }
