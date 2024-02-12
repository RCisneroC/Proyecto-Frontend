export interface EditActivity {
    id: number; //LISTO
    statusId: number; //LISTO
    name: string; //LISTO
    description: string; //LISTO
    curriculumDesignId: number; //LISTO
    activityModeId: number; //LISTO
    activityTypeId: number; //LISTO
    activityLocationId: number; //LISTO
    activityFundsSourceId: number; //LISTO
    activityReasonId: number; //LISTO
    assignedCoordinatorId: string; //LISTO
    studentQuota: number; //LISTO
    planningDate: Date; //LISTO
    startDate: Date; //LISTO
    plannedEndDate: Date; //LISTO
    effectiveEndDate: Date; //LISTO
    startTime: Date | string; //LISTO
    endTime: Date | string; //LISTO
    inscriptionStartDate: Date; //LISTO
    inscriptionEndDate: Date; //LISTO
    studentWithdrawalEndDate: Date; //LISTO
    dataSheetDeliveryDate: Date; //LISTO
    digitalReportDeliveryDate: Date; //LISTO
    physicalReportDeliveryDate: Date; //LISTO
    isExecuted: boolean; //LISTO
    hasDataSheet: boolean; //LISTO
    hasCertificate: boolean; //LISTO
    hasSurvey: boolean | string; //LISTO
    isEvaluation: boolean; //LISTO
    observations: string; //LISTO
    duration: number; //LISTO
    totalHours: number; //LISTO
    onSiteHours: number; //LISTO
    synchronousHours: number; //LISTO
    asynchronousHours: number; //LISTO
    competencies: string; // LUEGO ->LISTO
    content: string; // LUEGO ->LISTO
    learningActivities: string; // LUEGO ->LISTO
    electronicEvaluation: boolean | string; //LISTO
    participationProfile: number; //LISTO
    activityTarget: number; //LISTO
    virtualRoom: string; //  NO VA
    meetLink: string; //LISTO
    justification: string; // LUEGO ->LISTO
    generalGoals: string; // LUEGO ->LISTO
    specificGoals: string; // LUEGO ->LISTO
    participantAdmissionProfile: string; // LUEGO ->LISTO
    participantGraduateProfile: string; // LUEGO ->LISTO
    teachingMethodology: string; // LUEGO ->LISTO
    certificatesReceived: number; // LUEGO
}