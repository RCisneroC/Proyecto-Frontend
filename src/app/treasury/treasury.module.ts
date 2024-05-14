import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { SharedModule } from "@shared";
import { TreasuryRoutingModule } from './treasury-routing.module';
import { ListBudgetSubCodificationCatalogComponent } from './Components/list-budget-sub-codification-catalog/list-budget-sub-codification-catalog.component';
import { FormBudgetSubCodificationCatalogComponent } from './Components/form-budget-sub-codification-catalog/form-budget-sub-codification-catalog.component';
import { ComponentsModule } from "../shared/components/components.module";
import { ListTicketComponent } from './Components/list-ticket/list-ticket.component';
import { FormTicketComponent } from './Components/form-ticket/form-ticket.component';
import { AddIncomeComponent } from './Components/Income/add-income/add-income.component';
import { IncomeListComponent } from './Components/Income/income-list/income-list.component';
import { BudgetCodingListComponent } from './Components/BudgetCoding/budget-coding-list/budget-coding-list.component';
import { AddBudgetCodingComponent } from './Components/BudgetCoding/add-budget-coding/add-budget-coding.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListAccountPeriodComponent } from './Components/list-account-period/list-account-period.component';
import { FormAccountPeriodComponent } from './Components/form-account-period/form-account-period.component';
import { PettyCashListComponent } from './Components/PettyCash/petty-cash-list/petty-cash-list.component';
import { AddPettyCashComponent } from './Components/PettyCash/add-petty-cash/add-petty-cash.component';
import { AssetLocationListComponent } from './Components/AssetLocation/asset-location-list/asset-location-list.component';
import { AddAssetLocationComponent } from './Components/AssetLocation/add-asset-location/add-asset-location.component';
import { AddAssignmentPeriodComponent } from './Components/AssignmentPeriod/add-assignment-period/add-assignment-period.component';
import { AssignmentPeriodListComponent } from './Components/AssignmentPeriod/assignment-period-list/assignment-period-list.component';
import { AssetLocationDetailComponent } from './Components/AssetLocation/asset-location-detail/asset-location-detail.component';
import { AddAssetLocationDetailComponent } from './Components/AssetLocation/add-asset-location-detail/add-asset-location-detail.component';
import { RequestEstateListComponent } from './Components/request-estate-list/request-estate-list.component';
import { DetailsRequestEstateComponent } from './Components/details-request-estate/details-request-estate.component';
import { FormRequestEstateListComponent } from './Components/form-request-estate-list/form-request-estate-list.component';


@NgModule({
    providers: [DatePipe],
    declarations: [
        ListBudgetSubCodificationCatalogComponent,
        FormBudgetSubCodificationCatalogComponent,
        ListTicketComponent,
        FormTicketComponent,
        BudgetCodingListComponent,
        AddBudgetCodingComponent,
        AddIncomeComponent,
        IncomeListComponent,
        ListAccountPeriodComponent,
        FormAccountPeriodComponent,
        PettyCashListComponent,
        AddPettyCashComponent,
        AssetLocationListComponent,
        AddAssetLocationComponent,
        AddAssignmentPeriodComponent,
        AssignmentPeriodListComponent,
        AssetLocationDetailComponent,
        AddAssetLocationDetailComponent,
        RequestEstateListComponent,
        DetailsRequestEstateComponent,
        FormRequestEstateListComponent
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
