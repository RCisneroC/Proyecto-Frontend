
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainLayoutComponent } from './layout/app-layout/main-layout/main-layout.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [],
    children: [
      { path: '', redirectTo: '/task-manager/task-list', pathMatch: 'full' },

      {
        path: 'task-manager',
        loadChildren: () =>
          import('./task-manager/task-manager.module').then((m) => m.TaskManagerModule),
      },

    ],
  },






  { path: '**', redirectTo: '/task-manager/task-list' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule],
})
export class AppRoutingModule { }
