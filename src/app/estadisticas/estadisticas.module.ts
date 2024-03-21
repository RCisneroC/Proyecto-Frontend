import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ComponentsModule } from "@shared/components/components.module";
import { SharedModule } from "@shared";
import { VerificarBS64Pipe } from 'app/pipes/verificar-bs64.pipe';
import { EstadisticasRoutingModule } from './estadisticas-routing.module';
import { TablaPersonalDocenteComponent } from './PersonalDocente/tabla-personal-docente/tabla-personal-docente.component';
import { OnlyNumberDirective } from './directives/only-number.directive';
import { EstadisticasActividadComponent } from './estadisticas-actividad/estadisticas-actividad.component';
import { StatusPipePipe } from 'app/pipes/status-pipe.pipe';
import { EEspecializadaComponent } from './eespecializada/eespecializada.component';
import { EstadisticasMatriculaComponent } from './estadisticas-matricula/estadisticas-matricula.component';
import { StatusTeacherPipe } from 'app/pipes/status-teacher.pipe';



@NgModule({
  providers: [VerificarBS64Pipe, DatePipe, StatusTeacherPipe],
  declarations: [
    TablaPersonalDocenteComponent,
    OnlyNumberDirective,
    EstadisticasActividadComponent,
    EEspecializadaComponent,
    EstadisticasMatriculaComponent
  ],
  imports: [
    CommonModule,
    EstadisticasRoutingModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class EstadisticasModule { }
