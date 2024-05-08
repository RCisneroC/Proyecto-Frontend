import { NgModule } from '@angular/core';
import { CommonModule,DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "@shared";
import { TreasuryRoutingModule } from './treasury-routing.module';
import { ListBudgetSubCodificationCatalogComponent } from './Components/list-budget-sub-codification-catalog/list-budget-sub-codification-catalog.component';
import { FormBudgetSubCodificationCatalogComponent } from './Components/form-budget-sub-codification-catalog/form-budget-sub-codification-catalog.component';
import { ComponentsModule } from "../shared/components/components.module";
import { ListTicketComponent } from './Components/list-ticket/list-ticket.component';
import { FormTicketComponent } from './Components/form-ticket/form-ticket.component';


@NgModule({
    providers: [DatePipe],
    declarations: [
        ListBudgetSubCodificationCatalogComponent,
        FormBudgetSubCodificationCatalogComponent,
        ListTicketComponent,
        FormTicketComponent
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
export class TreasuryModule {  }
