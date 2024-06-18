export interface BudgetRequest {
    getBudgets: GetBudget[];
    message:    string;
    isError:    boolean;
    statusCode: number;
}

export interface GetBudget {
    id?:                             number;
    typeOfBudget?:                   string;
    year?:                           string;
    administrativeUnitOrDependency?: string;
    subProgramOrProject?:            string;
    statusId?:                       number;
    actions?:                        string;
}
