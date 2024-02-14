export interface ApiResponseInternal {
    statusCode: number;
    success: boolean;
    message: string | null;
    data: TypeTaskInternal[];
}
export interface TypeTaskInternal {
    id: number;
    createdDate: string;
    createdBy: string;
    lastModifiedDate: string;
    lastModifiedBy: string;
    name: string;
}


export interface ApiResponseGenerico {
    statusCode: number;
    success: boolean;
    message: string | null;
    data: [];
}
