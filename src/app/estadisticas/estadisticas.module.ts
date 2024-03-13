import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EstadisticasRoutingModule } from './estadisticas-routing.module';
import { TablaPersonalDocenteComponent } from './PersonalDocente/tabla-personal-docente/tabla-personal-docente.component';


@NgModule({
  declarations: [
    TablaPersonalDocenteComponent
  ],
  imports: [
    CommonModule,
    EstadisticasRoutingModule
  ]
})
export class EstadisticasModule { }
