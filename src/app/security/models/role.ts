export class Role {
    id!: string;
    name!: string;
    statusId!: number;
    users!: [];
}

export interface Menu {
    id: number;
    name: string;
}
export interface SubMenu {
    id: number;
    idMenu: number;
    name: string;
}
