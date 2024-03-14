import { NgModule } from '@angular/core';
import { CommonModule,DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ComponentsModule } from "@shared/components/components.module";
import { SharedModule } from "@shared";
import { VerificarBS64Pipe } from 'app/pipes/verificar-bs64.pipe';



import { EstadisticasRoutingModule } from './estadisticas-routing.module';
import { TablaPersonalDocenteComponent } from './PersonalDocente/tabla-personal-docente/tabla-personal-docente.component';



@NgModule({
   providers: [VerificarBS64Pipe, DatePipe],
    declarations: [
        TablaPersonalDocenteComponent
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
