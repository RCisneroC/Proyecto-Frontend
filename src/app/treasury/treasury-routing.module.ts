import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListBudgetSubCodificationCatalogComponent } from './Components/list-budget-sub-codification-catalog/list-budget-sub-codification-catalog.component';

import { ListTicketComponent } from './Components/list-ticket/list-ticket.component';
import { BudgetCodingListComponent } from './Components/BudgetCoding/budget-coding-list/budget-coding-list.component';
import { IncomeListComponent } from './Components/Income/income-list/income-list.component';
import { ListAccountPeriodComponent } from './Components/list-account-period/list-account-period.component';
import { PettyCashListComponent } from './Components/PettyCash/petty-cash-list/petty-cash-list.component';
import { ListMinorPurchaseComponent } from './Components/list-minor-purchase/list-minor-purchase.component';
import { ListConfirmPurchaseComponent } from './Components/list-confirm-purchase/list-confirm-purchase.component';
import { AssetLocationListComponent } from './Components/AssetLocation/asset-location-list/asset-location-list.component';
import { AssignmentPeriodListComponent } from './Components/AssignmentPeriod/assignment-period-list/assignment-period-list.component';
import { AssetLocationDetailComponent } from './Components/AssetLocation/asset-location-detail/asset-location-detail.component';

const routes: Routes = [
  {
    path: "list-budget-sub-codification-catalog",
    component: ListBudgetSubCodificationCatalogComponent,
  },
  {
    path: "list-ticket",
    component: ListTicketComponent,
  },
  {
    path: "list-account-period",
    component: ListAccountPeriodComponent,
  },
  {
    path: "budget-coding-list",
    component: BudgetCodingListComponent,
  },
  {
    path: "income-list",
    component: IncomeListComponent,
  },
  {
    path: "petty-cash-list",
    component: PettyCashListComponent,
  },
  {
    path: "list-minor-purchase",
    component: ListMinorPurchaseComponent,
  },
  {
    path: "list-confirm-purchase",
    component: ListConfirmPurchaseComponent,
  },
  {
    path: "asset-location-list",
    component: AssetLocationListComponent,
  },
  {
    path: "assignment-period-list",
    component: AssignmentPeriodListComponent,
  },
  {
    path: "asset-location-detail/:id",
    component: AssetLocationDetailComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TreasuryRoutingModule { }
