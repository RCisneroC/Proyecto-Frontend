import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { CategoryComponent } from './Maestras/category/category.component';
import { CompanyComponent } from './Maestras/company/company.component';
import { ContractTypeComponent } from './Maestras/contract-type/contract-type.component';
import { JobsComponent } from './Maestras/jobs/jobs.component';
import { ProvinceComponent } from './Maestras/province/province.component';
import { StatusComponent } from './Maestras/status/status.component';
import { CompanyAddressComponent } from './Maestras/Forms/company-address/company-address.component';
import { JobFormsComponent } from './Maestras/Forms/job-forms/job-forms.component';
import { ProvinceFormsComponent } from './Maestras/Forms/province-forms/province-forms.component';
import { StatusFormsComponent } from './Maestras/Forms/status-forms/status-forms.component';
import { CategoryFormsComponent } from './Maestras/Forms/category-forms/category-forms.component';
import { CompanyFormsComponent } from './Maestras/Forms/company-forms/company-forms.component';
import { ViewJobsComponent } from './Externals/view-jobs/view-jobs.component';
import { PostulationComponent } from './Externals/postulation/postulation.component';
import { PostulationFormsComponent } from './Externals/postulation-forms/postulation-forms.component';
import { JobRoutingModule } from './job-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '@shared/components/components.module';
import { SharedModule } from '@shared';
import { VerificarBS64Pipe } from 'app/pipes/verificar-bs64.pipe';
import { ContractTypeFormsComponent } from './Maestras/Forms/contract-type-forms/contract-type-forms.component';
import { UbicationsComponent } from './Maestras/ubications/ubications.component';
import { UbicationsFormsComponent } from './Maestras/Forms/ubications-forms/ubications-forms.component';



@NgModule({
  declarations: [
    CategoryComponent,
    CompanyComponent,
    ContractTypeComponent,
    JobsComponent,
    ProvinceComponent,
    StatusComponent,
    CompanyAddressComponent,
    JobFormsComponent,
    ProvinceFormsComponent,
    StatusFormsComponent,
    CategoryFormsComponent,
    CompanyFormsComponent,
    ViewJobsComponent,
    PostulationComponent,
    PostulationFormsComponent,
    ContractTypeFormsComponent,
    UbicationsComponent,
    UbicationsFormsComponent
  ],
  providers: [VerificarBS64Pipe, DatePipe],
  imports: [
    CommonModule,
    JobRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    SharedModule
  ]
})
export class JobModuleModule { }
