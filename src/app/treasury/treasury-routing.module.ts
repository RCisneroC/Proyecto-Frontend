import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BudgetCodingListComponent } from './Components/BudgetCoding/budget-coding-list/budget-coding-list.component';
import { IncomeListComponent } from './Components/Income/income-list/income-list.component';
import { PettyCashListComponent } from './Components/PettyCash/petty-cash-list/petty-cash-list.component';

const routes: Routes = [

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
  }




];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TreasuryRoutingModule {   }
