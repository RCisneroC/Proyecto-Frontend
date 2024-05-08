import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { SharedModule } from "@shared";
import { TreasuryRoutingModule } from './treasury-routing.module';
import { ListBudgetSubCodificationCatalogComponent } from './Components/list-budget-sub-codification-catalog/list-budget-sub-codification-catalog.component';
import { FormBudgetSubCodificationCatalogComponent } from './Components/form-budget-sub-codification-catalog/form-budget-sub-codification-catalog.component';
import { ComponentsModule } from "../shared/components/components.module";
import { BudgetCodingListComponent } from './Components/BudgetCoding/budget-coding-list/budget-coding-list.component';
import { AddBudgetCodingComponent } from './Components/BudgetCoding/add-budget-coding/add-budget-coding.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddIncomeComponent } from './Components/Income/add-income/add-income.component';
import { IncomeListComponent } from './Components/Income/income-list/income-list.component';


@NgModule({
    providers: [DatePipe],
    declarations: [
        ListBudgetSubCodificationCatalogComponent,
        FormBudgetSubCodificationCatalogComponent,
        BudgetCodingListComponent,
        AddBudgetCodingComponent,
        AddIncomeComponent,
        IncomeListComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        TreasuryRoutingModule,
        ComponentsModule
    ]
})
export class TreasuryModule { }
