export interface DetallePlanes{
    statusId:number;
    id:number;
    name:string;
    description:string;
    startDate:Date;
    endDate:Date;
    approvedBy:string;
    approvalDate:Date;
    approvalMessage: string;
    annualPlanDegreeCurriculumDesigns:[];
    periods:[];
}
