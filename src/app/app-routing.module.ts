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
        path: 'security',
        loadChildren: () =>
          import('./security/security.module').then((m) => m.SecurityModule),
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
        path: 'tutor',
        loadChildren: () =>
          import('./tutor/tutor.module').then((m) => m.TutorModule),
      },
      {
        path: 'exchange',
        loadChildren: () =>
          import('./exchange/exchange.module').then((m) => m.ExchangeModule),
      },
      {
        path: 'intranet-academic',
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
      {
        path: 'estadisticas',
        loadChildren: () =>
          import('./estadisticas/estadisticas.module').then((m) => m.EstadisticasModule),
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

  //Colocar el path aca
  {
    path: 'student',
    component: AuthLayoutComponent,
    loadChildren: () =>
      import('./external/inscription-external.module').then(
        (m) => m.InscriptionExternalModule
      ),
  },
  {
    path: 'teacher',
    component: AuthLayoutComponent,
    loadChildren: () =>
      import('./teaching-management/teaching-management.module').then(
        (m) => m.TeachingManagementModule
      ),
  },

  { path: '**', component: Page404Component },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule],
})
export class AppRoutingModule { }
