import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TeacherListComponent} from './teacher-list/teacher-list.component';
import { CallsListComponent } from './calls-list/calls-list.component';
import { TeacherApplyCallsComponent } from './teacher-apply-calls/teacher-apply-calls.component';
import { CallsNewComponent } from './calls-new/calls-new.component';
import { CallsEditComponent } from './calls-edit/calls-edit.component';
import { ViewCallForApplyComponent } from './view-call-for-apply/view-call-for-apply.component';

const routes: Routes = [
  {
    path: 'teacher-list',
    component: TeacherListComponent,
  },
  {
    path: 'calls-list',
    component: CallsListComponent,
  },
  {
    path: 'calls-new',
    component: CallsNewComponent,
  },
  {
    path: 'calls-edit/:id',
    component: CallsEditComponent,
  },
  {
    path: 'teacher-apply-calls',
    component: TeacherApplyCallsComponent,
  },
  {
    path: 'view-call-for-apply/:id',
    component: ViewCallForApplyComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CallsTeachingRoutingModule { }
