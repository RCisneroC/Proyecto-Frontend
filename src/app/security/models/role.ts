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


export interface MenuResponse {
    statusId: number;
    id: number;
    path: string;
    title: string;
    iconType: string;
    icon: string;
    class: string;
    groupTitle: boolean;
    badge: string;
    badgeClass: string;
    parentApplicationMenuId: number | string | null;
    subMenus: MenuResponse[];
    message: string;
    isError: boolean;
    statusCode: string;
}

