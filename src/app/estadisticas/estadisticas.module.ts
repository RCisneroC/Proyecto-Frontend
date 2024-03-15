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
import { EstadisticasMatriculaComponent } from './estadisticas-matricula/estadisticas-matricula.component';



@NgModule({
  providers: [VerificarBS64Pipe, DatePipe],
  declarations: [
    TablaPersonalDocenteComponent,
    OnlyNumberDirective,
    EstadisticasActividadComponent,
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
