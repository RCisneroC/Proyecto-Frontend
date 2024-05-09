import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TreasuryRoutingModule } from './treasury-routing.module';
import { BudgetCodingListComponent } from './Components/BudgetCoding/budget-coding-list/budget-coding-list.component';
import { AddBudgetCodingComponent } from './Components/BudgetCoding/add-budget-coding/add-budget-coding.component';
import { ComponentsModule } from "../shared/components/components.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { AddIncomeComponent } from './Components/Income/add-income/add-income.component';
import { IncomeListComponent } from './Components/Income/income-list/income-list.component';
import { PettyCashListComponent } from './Components/PettyCash/petty-cash-list/petty-cash-list.component';
import { AddPettyCashComponent } from './Components/PettyCash/add-petty-cash/add-petty-cash.component';


@NgModule({
    declarations: [
        BudgetCodingListComponent,
        AddBudgetCodingComponent,
        AddIncomeComponent,
        IncomeListComponent,
        PettyCashListComponent,
        AddPettyCashComponent
    ],
    imports: [
        CommonModule,
        TreasuryRoutingModule,
        ComponentsModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule
    ]
})
export class TreasuryModule {  }
