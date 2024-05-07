import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListBudgetSubCodificationCatalogComponent } from './Components/list-budget-sub-codification-catalog/list-budget-sub-codification-catalog.component';


const routes: Routes = [
  {
    path: "list-budget-sub-codification-catalog",
    component: ListBudgetSubCodificationCatalogComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TreasuryRoutingModule {   }
