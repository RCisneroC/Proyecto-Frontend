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
import { ListMinorPurchaseComponent } from './Components/list-minor-purchase/list-minor-purchase.component';
import { FormMinorPurchaseComponent } from './Components/form-minor-purchase/form-minor-purchase.component';
import { FormAddPurchaseComponent } from './Components/form-add-purchase/form-add-purchase.component';
import { ListConfirmPurchaseComponent } from './Components/list-confirm-purchase/list-confirm-purchase.component';
import { FormConfirmPurchaseComponent } from './Components/form-confirm-purchase/form-confirm-purchase.component';
import { AssetLocationListComponent } from './Components/AssetLocation/asset-location-list/asset-location-list.component';
import { AddAssetLocationComponent } from './Components/AssetLocation/add-asset-location/add-asset-location.component';
import { AddAssignmentPeriodComponent } from './Components/AssignmentPeriod/add-assignment-period/add-assignment-period.component';
import { AssignmentPeriodListComponent } from './Components/AssignmentPeriod/assignment-period-list/assignment-period-list.component';
import { AssetLocationDetailComponent } from './Components/AssetLocation/asset-location-detail/asset-location-detail.component';
import { AddAssetLocationDetailComponent } from './Components/AssetLocation/add-asset-location-detail/add-asset-location-detail.component';
import { RequestEstateListComponent } from './Components/request-estate-list/request-estate-list.component';
import { DetailsRequestEstateComponent } from './Components/details-request-estate/details-request-estate.component';
import { FormRequestEstateListComponent } from './Components/form-request-estate-list/form-request-estate-list.component';
import { PdfRefundComponent } from './Components/Reportes/pdf-refund/pdf-refund.component';
import { PdfRecapCashieComponent } from './Components/Reportes/pdf-recap-cashie/pdf-recap-cashie.component';
import { PdfExpenseReportComponent } from './Components/Reportes/pdf-expense-report/pdf-expense-report.component';
import { PdfIncomeReportComponent } from './Components/Reportes/pdf-income-report/pdf-income-report.component';
import { FormDetailsRequestEstateComponent } from './Components/form-details-request-estate/form-details-request-estate.component';
import { AcceptanceRequestComponent } from './Components/acceptance-request/acceptance-request.component';
import { ExpensesComponent } from './Components/expenses/expenses.component';
import { FormAcceptanceRequestComponent } from './Components/form-acceptance-request/form-acceptance-request.component';
import { FormUpdateExpensesComponent } from './Components/form-update-expenses/form-update-expenses.component';
import { LisBienesIsjupComponent } from './Components/lis-bienes-isjup/lis-bienes-isjup.component';
import { BudgetComponent } from './Components/budget/budget.component';
import { BudgetDetailsComponent } from './Components/budget-details/budget-details.component';
import { BudgetTermComponent } from './Components/budget-term/budget-term.component';
import { BudgetTermMonthComponent } from './Components/budget-term-month/budget-term-month.component';
import { BudgetFormsComponent } from './Components/FormsBudget/budget-forms/budget-forms.component';
import { BudgetDetailsFormsComponent } from './Components/FormsBudget/budget-details-forms/budget-details-forms.component';
import { BudgetTermFormsComponent } from './Components/FormsBudget/budget-term-forms/budget-term-forms.component';
import { BudgetTermMonthFormsComponent } from './Components/FormsBudget/budget-term-month-forms/budget-term-month-forms.component';
import { BudgetDetailsMonthFormsComponent } from './Components/FormsBudget/budget-details-month-forms/budget-details-month-forms.component';
import { TemplateListComponent } from './Components/template-list/template-list.component';
import { TemplateFormComponent } from './Components/template-form/template-form.component';
import { VerificarBS64Pipe } from 'app/pipes/verificar-bs64.pipe';
import { ProductListComponent } from './Components/product-list/product-list.component';
import { ProductFormComponent } from './Components/product-form/product-form.component';


@NgModule({
    providers: [VerificarBS64Pipe,DatePipe],
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
        ListMinorPurchaseComponent,
        FormMinorPurchaseComponent,
        FormAddPurchaseComponent,
        ListConfirmPurchaseComponent,
        FormConfirmPurchaseComponent,
        AssetLocationListComponent,
        AddAssetLocationComponent,
        AddAssignmentPeriodComponent,
        AssignmentPeriodListComponent,
        AssetLocationDetailComponent,
        AddAssetLocationDetailComponent,
        RequestEstateListComponent,
        DetailsRequestEstateComponent,
        FormRequestEstateListComponent,
        PdfRefundComponent,
        PdfRecapCashieComponent,
        PdfExpenseReportComponent,
        PdfIncomeReportComponent,
        FormDetailsRequestEstateComponent,
        AcceptanceRequestComponent,
        ExpensesComponent,
        FormAcceptanceRequestComponent,
        FormUpdateExpensesComponent,
        LisBienesIsjupComponent,
        BudgetComponent,
        BudgetDetailsComponent,
        BudgetTermComponent,
        BudgetTermMonthComponent,
        BudgetFormsComponent,
        BudgetDetailsFormsComponent,
        BudgetTermFormsComponent,
        BudgetTermMonthFormsComponent,
        BudgetDetailsMonthFormsComponent,
        TemplateListComponent,
        TemplateFormComponent,
        ProductListComponent,
        ProductFormComponent
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
