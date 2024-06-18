export interface BudgetDetailsRequest {
    getBudgetDetails: GetBudgetDetail[];
    message:          string;
    isError:          boolean;
    statusCode:       number;
}

export interface GetBudgetDetail {
    id?:                number;
    description?:       string;
    code?:              number;
    budgetId?:          number;
    categoriaId?:       number;
    statusId?:          number;
    annualTotalAmount?: number;
    actions?:string;
    budgetTermDtos?:    BudgetTermDto[];
}

export interface BudgetTermDto {
    id?:                              number;
    name?:                            string;
    description?:                     string;
    subTotal?:                        number;
    budgetDetailBudgetTermMonthDtos: BudgetDetailBudgetTermMonthDto[];
}

export interface BudgetDetailBudgetTermMonthDto {
    amount?:              number;
    budgetTermMonthId?:   number;
    budgetTermMonthName?: string;
}

export class BudgetDetailBudgetTermMonthDtClass{
    amount?:              number;
    budgetTermMonthId?:   number;
    budgetTermMonthName?: string;
}
