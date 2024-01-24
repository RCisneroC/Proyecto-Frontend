export interface Subject {
    statusId:           number;
    id:                 number;
    name:               string;
    description:        string;
    number:             number;
    acronym:            string;
    code:               string;
    numOfCredits:       number;
    numOfHours:         number;
    numOfClasses:       number;
    hasLaboratory:      boolean | string;
    evaluationCriteria: string;
}
