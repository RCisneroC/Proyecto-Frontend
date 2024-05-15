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
import { RequestEstateListComponent } from "./Components/request-estate-list/request-estate-list.component";
import { DetailsRequestEstateComponent } from "./Components/details-request-estate/details-request-estate.component";
import { PdfRefundComponent } from './Components/Reportes/pdf-refund/pdf-refund.component';
import { PdfRecapCashieComponent } from './Components/Reportes/pdf-recap-cashie/pdf-recap-cashie.component';
import { PdfExpenseReportComponent } from './Components/Reportes/pdf-expense-report/pdf-expense-report.component';
import { PdfIncomeReportComponent } from './Components/Reportes/pdf-income-report/pdf-income-report.component';

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
    path: "list-confirm-purchase/:id",
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
  {
    path: "request-estate-list",
    component: RequestEstateListComponent,
  },
  {
    path: 'request-estate-detail/:id',
    component: DetailsRequestEstateComponent,
  },
  {
    path: 'pdf-refund',
    component: PdfRefundComponent,
  },
  
  {
    path: 'pdf-recap-cashie',
    component: PdfRecapCashieComponent,
  },
  
  {
    path: 'pdf-expense-report',
    component: PdfExpenseReportComponent,
  },
  {
    path: 'pdf-income-report',
    component: PdfIncomeReportComponent,
  }

  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TreasuryRoutingModule { }
