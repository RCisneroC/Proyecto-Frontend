import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskManagerRoutingModule } from './task-manager-routing.module';
import { TaskListComponent } from './Components/task-list/task-list.component';
import { TaskFormComponent } from './Components/task-form/task-form.component';
import { ComponentsModule } from '@shared/components/components.module';
import { SharedModule } from '@shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TaskListComponent,
    TaskFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,   
    SharedModule,
    ComponentsModule,
    TaskManagerRoutingModule
  ]
})
export class TaskManagerModule { }
