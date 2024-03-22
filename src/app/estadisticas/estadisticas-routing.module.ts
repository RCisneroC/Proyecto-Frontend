import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EstadisticasActividadComponent } from './estadisticas-actividad/estadisticas-actividad.component';
import { TablaPersonalDocenteComponent } from './PersonalDocente/tabla-personal-docente/tabla-personal-docente.component';
import { EEspecializadaComponent } from './eespecializada/eespecializada.component';
import { EstadisticasMatriculaComponent } from "./estadisticas-matricula/estadisticas-matricula.component";
import { EstadisticasParticipanteComponent } from "./estadisticas-participante/estadisticas-participante.component";
import { TablaDocenteGraficaComponent } from './PersonalDocente/tabla-docente-grafica/tabla-docente-grafica.component';

const routes: Routes = [
  {
    path: 'actividades',
    component: EstadisticasActividadComponent,
  },
  {
    path: 'actividades',
    component: EstadisticasActividadComponent,
  },
  {
    path: "estadisticas-especializada",
    component: EEspecializadaComponent
  },
  {
    path: 'matriculas',
    component: EstadisticasMatriculaComponent,
  },
  {
    path: 'participantes',
    component: EstadisticasParticipanteComponent,
  },
  {
    path: "docentes",
    component: TablaPersonalDocenteComponent
  },
  {
    path: "docentes/grafica",
    component: TablaDocenteGraficaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstadisticasRoutingModule { }
