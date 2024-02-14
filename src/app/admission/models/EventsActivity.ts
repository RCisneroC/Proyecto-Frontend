export interface EventsActivity {
    statusId: number;
    id: number;
    activityId: number;
    name: string;
    description: string;
    date: Date; // O Date, si prefieres trabajar con objetos Date
    startTime: Date | string; // O Date
    endTime: Date | string; // O Date
    teacherCedula: string;
    teacherFullName: string;
    teacherStatusId: string;
}