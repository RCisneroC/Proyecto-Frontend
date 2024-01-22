import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InscriptionExternalRoutingModule } from './inscription-external-routing.module';
import { ViewActivityExternalComponent } from './view-activity-external/view-activity-external.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '@shared/components/components.module';
import { SharedModule } from '@shared';
import { VerificarBS64Pipe } from 'app/pipes/verificar-bs64.pipe';


@NgModule({
  declarations: [
    ViewActivityExternalComponent
  ],
  providers: [
     VerificarBS64Pipe
  ],
  imports: [
    CommonModule,
    InscriptionExternalRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    SharedModule,
  ]
})
export class InscriptionExternalModule { }
