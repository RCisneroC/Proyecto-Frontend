import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ComponentsModule } from "@shared/components/components.module";
import { SharedModule } from "@shared";
import { VerificarBS64Pipe } from 'app/pipes/verificar-bs64.pipe';
import { EstadisticasRoutingModule } from './estadisticas-routing.module';
import { TablaPersonalDocenteComponent } from './PersonalDocente/tabla-personal-docente/tabla-personal-docente.component';
import { EstadisticasActividadComponent } from './estadisticas-actividad/estadisticas-actividad.component';
import { EEspecializadaComponent } from './eespecializada/eespecializada.component';
import { EstadisticasMatriculaComponent } from './estadisticas-matricula/estadisticas-matricula.component';
import { StatusTeacherPipe } from 'app/pipes/status-teacher.pipe';
import { EstadisticasParticipanteComponent } from './estadisticas-participante/estadisticas-participante.component';

import { TablaDocenteGraficaComponent } from './PersonalDocente/tabla-docente-grafica/tabla-docente-grafica.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { EfgraficasComponent } from './graficas/efgraficas/efgraficas.component';
import { EcgraficasComponent } from './graficas/ecgraficas/ecgraficas.component';
import { MEFgraficasComponent } from './graficas/mefgraficas/mefgraficas.component';
import { MECgraficasComponent } from './graficas/mecgraficas/mecgraficas.component';


@NgModule({
  providers: [VerificarBS64Pipe, DatePipe, StatusTeacherPipe],
  declarations: [
    TablaPersonalDocenteComponent,
    EstadisticasActividadComponent,
    EEspecializadaComponent,
    EstadisticasMatriculaComponent,
    EstadisticasParticipanteComponent,
    TablaDocenteGraficaComponent,
    EfgraficasComponent,
    EcgraficasComponent,
    MEFgraficasComponent,
    MECgraficasComponent
  ],
  imports: [
    CommonModule,
    EstadisticasRoutingModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgxChartsModule
  ]
})
export class EstadisticasModule { }
