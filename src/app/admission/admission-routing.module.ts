import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoungeListComponent } from './maestros/lounge-list/lounge-list.component';
import { ScheduleActivitiesListComponent } from './schedule-activities-list/schedule-activities-list.component';
import { ScheduleActivityFormComponent } from './schedule-activity-form/schedule-activity-form.component';
import { ActivityListComponent } from './maestros/activity-list/activity-list.component';
import { ScheduleActivityDetailComponent } from './schedule-activity-detail/schedule-activity-detail.component';

const routes: Routes = [

  {
    path: "schedule-activities-list",
    component: ScheduleActivitiesListComponent,
  },
  {
    path: "schedule-activity-form",
    component: ScheduleActivityFormComponent,
  },
  {
    path: "schedule-activity-detail/:id",
    component: ScheduleActivityDetailComponent,
  },
  {
    path: "lounge-list",
    component: LoungeListComponent,
  },
  {
    path: "activity-list",
    component: ActivityListComponent,
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdmissionRoutingModule { }

