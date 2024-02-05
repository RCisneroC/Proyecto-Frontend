import { Subject } from "./Subject";

export interface PlanEstudioList {
    year: number;
    periods: Period[];
}

export interface Period {
    statusId: number;
    id: number;
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
    maxNumOfParticipants: number;
    subjects: Subject[];
}
