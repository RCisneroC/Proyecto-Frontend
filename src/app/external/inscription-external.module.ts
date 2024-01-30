import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InscriptionExternalRoutingModule } from './inscription-external-routing.module';
import { ViewActivityExternalComponent } from './view-activity-external/view-activity-external.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '@shared/components/components.module';
import { SharedModule } from '@shared';
import { VerificarBS64Pipe } from 'app/pipes/verificar-bs64.pipe';
import { DetailsAnnualComponent } from './details-annual/details-annual.component';
import { InscriptionFormsExternalComponent } from './inscription-forms-external/inscription-forms-external.component';
import { InfoAcademicaComponent } from './Forms/info-academica/info-academica.component';
import { InfoLaboralComponent } from './Forms/info-laboral/info-laboral.component';


@NgModule({
  declarations: [
    ViewActivityExternalComponent,
    DetailsAnnualComponent,
    InscriptionFormsExternalComponent,
    InfoAcademicaComponent,
    InfoLaboralComponent
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
