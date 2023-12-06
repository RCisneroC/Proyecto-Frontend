import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Page404Component } from './authentication/page404/page404.component';
import { AuthGuard } from './core/guard/auth.guard';
import { AuthLayoutComponent } from './layout/app-layout/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layout/app-layout/main-layout/main-layout.component';
const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: '/authentication/signin', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'admission',
        loadChildren: () =>
          import('./admission/admission.module').then((m) => m.AdmissionModule),
      },
      {
        path: 'enrollment',
        loadChildren: () =>
          import('./enrollment/enrollment.module').then((m) => m.EnrollmentModule),
      },
      {
        path: 'intranet-academic-registration',
        loadChildren: () =>
          import('./intranet-academic-registration/intranet-academic-registration.module').then((m) => m.IntranetAcademicRegistrationModule),
      },
      {
        path: 'teaching-management',
        loadChildren: () =>
          import('./teaching-management/teaching-management.module').then((m) => m.TeachingManagementModule),
      },
      {
        path: 'virtual-learning',
        loadChildren: () =>
          import('./virtual-learning/virtual-learning.module').then((m) => m.VirtualLearningModule),
      },

    ],
  },
  {
    path: 'authentication',
    component: AuthLayoutComponent,
    loadChildren: () =>
      import('./authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
  },
  { path: '**', component: Page404Component },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
