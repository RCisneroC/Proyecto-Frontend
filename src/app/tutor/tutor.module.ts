import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ComponentsModule} from "@shared/components/components.module";
import {SharedModule} from "@shared";
import {TutorRoutingModule} from "./tutor-routing.module";
import { TutorStudentDetailComponent } from './tutor-student-detail/tutor-student-detail.component';
import { TutorStudentSubjectDetailComponent } from './tutor-student-subject-detail/tutor-student-subject-detail.component';



@NgModule({
  declarations: [
    TutorStudentDetailComponent,
    TutorStudentSubjectDetailComponent
  ],
  imports: [
    CommonModule,
    TutorRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    SharedModule,
  ]
})
export class TutorModule { }
