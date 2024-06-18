export interface BudgetTermRequest {
    getBudgetTerms: GetBudgetTerm[];
    message:        string;
    isError:        boolean;
    statusCode:     number;
}

export interface GetBudgetTerm {
    id?:          number;
    name?:        string;
    description?: string;
    actions?: string;
    statusId?:    number;
}
