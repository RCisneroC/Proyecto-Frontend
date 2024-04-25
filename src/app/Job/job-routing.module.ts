import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './Maestras/category/category.component';
import { CompanyComponent } from './Maestras/company/company.component';
import { ContractTypeComponent } from './Maestras/contract-type/contract-type.component';
import { JobsComponent } from './Maestras/jobs/jobs.component';
import { ProvinceComponent } from './Maestras/province/province.component';
import { StatusComponent } from './Maestras/status/status.component';
import { UbicationsComponent } from './Maestras/ubications/ubications.component';


const routes: Routes = [
  // jobs
  {
    path: "JobCategory",
    component: CategoryComponent
  },
  {
    path: "JobCompany",
    component: CompanyComponent
  },
  {
    path: "JobCompany/Address/:IdCompany",
    component: UbicationsComponent
  },
  {
    path: "JobContractType",
    component: ContractTypeComponent
  },
  {
    path: "Jobs",
    component: JobsComponent
  },
  {
    path: "JobProvincie",
    component: ProvinceComponent
  },
  {
    path: "JobStatus",
    component: StatusComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobRoutingModule { }
