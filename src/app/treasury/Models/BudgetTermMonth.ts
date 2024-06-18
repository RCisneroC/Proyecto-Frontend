export interface BudgetTermMonthRequest {
    getBudgetTermMonths: GetBudgetTermMonth[];
    message:             string;
    isError:             boolean;
    statusCode:          number;
}

export interface GetBudgetTermMonth {
    id?:           number;
    name?:         string;
    description?:  string;
    budgetTermId?: number;
    statusId?:     number;
    actions?:      string;
}
