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
import { AcceptanceRequestComponent } from './Components/acceptance-request/acceptance-request.component';
import { ExpensesComponent } from './Components/expenses/expenses.component';
import { BudgetComponent } from './Components/budget/budget.component';
import { BudgetDetailsComponent } from './Components/budget-details/budget-details.component';
import { BudgetTermComponent } from './Components/budget-term/budget-term.component';
import { BudgetTermMonthComponent } from './Components/budget-term-month/budget-term-month.component';
import { TemplateListComponent } from './Components/template-list/template-list.component';
import { ProductListComponent } from './Components/product-list/product-list.component';

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
  },
  {
    path: "acceptance-request",
    component: AcceptanceRequestComponent,
  },
  {
    path: "expenses",
    component: ExpensesComponent,
  },
  {
    path: "budget",
    component: BudgetComponent,
  },
  {
    path: "budget-details/:id",
    component: BudgetDetailsComponent,
  },
  {
    path: "budget-term",
    component: BudgetTermComponent,
  },
  {
    path: "budget-term-details/:id",
    component: BudgetTermMonthComponent,
  },
  
  {
    path: "template-list",
    component: TemplateListComponent,
  },
  {
    path: "product-list",
    component: ProductListComponent,
  },





];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TreasuryRoutingModule { }
