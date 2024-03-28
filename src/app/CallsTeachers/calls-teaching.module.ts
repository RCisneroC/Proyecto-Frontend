import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ComponentsModule } from "@shared/components/components.module";
import { SharedModule } from "@shared";
import { VerificarBS64Pipe } from 'app/pipes/verificar-bs64.pipe';
import { TeacherListComponent } from './teacher-list/teacher-list.component';
import { TeacherDetailComponent } from './teacher-detail/teacher-detail.component';
import { AprovedTeacherComponent } from './aproved-teacher/aproved-teacher.component';
import { AddActivityComponent } from './add-activity/add-activity.component';
import { AddExperienceComponent } from './add-experience/add-experience.component';
import { AddSubjectComponent } from './add-subject/add-subject.component';
import { AddTrainingComponent } from './add-training/add-training.component';



import { CallsTeachingRoutingModule } from './calls-teaching-routing.module';


@NgModule({
  providers: [VerificarBS64Pipe, DatePipe],
  declarations: [
    TeacherListComponent,
    TeacherDetailComponent,
    AprovedTeacherComponent,
    AddActivityComponent,
    AddExperienceComponent,
    AddSubjectComponent,
    AddTrainingComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    CallsTeachingRoutingModule
  ]
})
export class CallsTeachingModule { }
