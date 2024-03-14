import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EstadisticasRoutingModule } from './estadisticas-routing.module';
import { TablaPersonalDocenteComponent } from './PersonalDocente/tabla-personal-docente/tabla-personal-docente.component';
import { EstadisticasActividadComponent } from './estadisticas-actividad/estadisticas-actividad.component';


@NgModule({
  declarations: [
    TablaPersonalDocenteComponent,
    EstadisticasActividadComponent
  ],
  imports: [
    CommonModule,
    EstadisticasRoutingModule
  ]
})
export class EstadisticasModule { }
