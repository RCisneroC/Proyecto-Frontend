import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EstadisticasActividadComponent } from './estadisticas-actividad/estadisticas-actividad.component';
import { TablaPersonalDocenteComponent } from './PersonalDocente/tabla-personal-docente/tabla-personal-docente.component';

const routes: Routes = [
  {
    path: 'actividades',
    component: EstadisticasActividadComponent,
  },
  {
    path: "docentes",
    component: TablaPersonalDocenteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstadisticasRoutingModule { }
