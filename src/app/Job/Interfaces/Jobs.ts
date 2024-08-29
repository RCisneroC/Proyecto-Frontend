export interface Jobs {
    statusId: number;
    id: number;
    name: string;
    description: string;
    categoryId: number;
    categoryName: string;
    companyId: number;
    endDate:Date;
    startDate:Date;
    companyName: string;
    companyProvinceId: number;
    companyProvinceName: string;
    companyAddressId: number;
    companyAddress: string;
    contractTypeId: number;
    contractTypeName: string;
    companyContactPersonFullName: string;
    companyEmail: string;
    numOfYearsOfExperienceRequired: string;
}

export interface SaveJobs {
    statusId: number;
    id: number;
    name: string;
    description: string;
    categoryId: number;
    companyId: number;
    companyAddressId: number;
    contractTypeId: number;
    numOfYearsOfExperienceRequired: string;
}
