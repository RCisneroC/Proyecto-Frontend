export interface ValidateDateResponse {
    status: string;
    daysRemaining: number;
    inscriptionStartDate: string;
    inscriptionEndDate: string;
    duration: number;
    totalHours: number;
    participants: number;
}

export interface ResponseValidDate {
    validateDateResponse: ValidateDateResponse[];
    message: string;
    isError: boolean;
    statusCode: number;
}