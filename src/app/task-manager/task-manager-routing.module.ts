import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './Components/task-list/task-list.component';

const routes: Routes = [
 {
    path: "task-list",
    component: TaskListComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskManagerRoutingModule { }
