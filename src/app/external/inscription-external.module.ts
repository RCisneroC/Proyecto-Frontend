import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InscriptionExternalRoutingModule } from './inscription-external-routing.module';
import { ViewActivityExternalComponent } from './view-activity-external/view-activity-external.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '@shared/components/components.module';
import { SharedModule } from '@shared';
import { VerificarBS64Pipe } from 'app/pipes/verificar-bs64.pipe';
import { DetailsAnnualComponent } from './details-annual/details-annual.component';


@NgModule({
  declarations: [
    ViewActivityExternalComponent,
    DetailsAnnualComponent
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
