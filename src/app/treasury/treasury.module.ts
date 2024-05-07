import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TreasuryRoutingModule } from './treasury-routing.module';
import { BudgetCodingListComponent } from './Components/BudgetCoding/budget-coding-list/budget-coding-list.component';
import { AddBudgetCodingComponent } from './Components/BudgetCoding/add-budget-coding/add-budget-coding.component';
import { ComponentsModule } from "../shared/components/components.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';


@NgModule({
    declarations: [
        BudgetCodingListComponent,
        AddBudgetCodingComponent
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
