import { RouteInfo } from "./sidebar.metadata";
export const ROUTES: RouteInfo[] = [
  {
    path: "",
    title: "MENU",
    iconType: "",
    icon: "",
    class: "",
    groupTitle: true,
    badge: "",
    badgeClass: "",
    submenu: [],
  },
  {
    path: "",
    title: "Admisión",
    iconType: "feather",
    icon: "calendar",
    class: "menu-toggle",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    submenu: [
    {
      path: "/admission/schedule-activities-list",
      title: "Cronograma de actividades",
      iconType: "",
      icon: "",
      class: "ml-menu",
      groupTitle: false,
      badge: "",
      badgeClass: "",
      submenu: []
    }
    ]
  },
  {
      path: "",
      title: "Maestros",
      iconType: "",
      icon: "database",
      class: "menu-toggle",
      groupTitle: false,
      badge: "",
      badgeClass: "",
    submenu: [
      //  {
      //     path: "admission/activity-list",
      //     title: "Actividad",
      //     iconType: "",
      //     icon: "",
      //     class: "",
      //     groupTitle: false,
      //     badge: "",
      //     badgeClass: "",
      //     submenu: []
      //   },
        {
          path: "/admission/source-funds-list",
          title: "Origen de fondos",
          iconType: "",
          icon: "",
          class: "ml-menu",
          groupTitle: false,
          badge: "",
          badgeClass: "",
          submenu: []
        },{
          path: "/admission/activity-ubication-list",
          title: "Ubicación Actividades",
          iconType: "",
          icon: "",
          class: "ml-menu",
          groupTitle: false,
          badge: "",
          badgeClass: "",
          submenu: []
        },
          {
          path: "/admission/modality-list",
          title: "Modalidad",
          iconType: "",
          icon: "",
          class: "ml-menu",
          groupTitle: false,
          badge: "",
          badgeClass: "",
          submenu: []
        },
         {
          path: "/admission/reason-list",
          title: "Motivo",
          iconType: "",
          icon: "",
          class: "ml-menu",
          groupTitle: false,
          badge: "",
          badgeClass: "",
          submenu: []
        },
        {
          path: "/admission/type-activity-list",
          title: "Tipo de actividad",
          iconType: "",
          icon: "",
          class: "ml-menu",
          groupTitle: false,
          badge: "",
          badgeClass: "",
          submenu: []
        },
        {
          path: "/admission/supplies-list",
          title: "Insumos",
          iconType: "",
          icon: "",
          class: "ml-menu",
          groupTitle: false,
          badge: "",
          badgeClass: "",
          submenu: []
        },
        {
          path: "/admission/lounge-list",
          title: "Salón",
          iconType: "",
          icon: "",
          class: "ml-menu",
          groupTitle: false,
          badge: "",
          badgeClass: "",
          submenu: []
        },
        {
          path: "/admission/documentation-required-list",
          title: "Documentación",
          iconType: "",
          icon: "",
          class: "ml-menu",
          groupTitle: false,
          badge: "",
          badgeClass: "",
          submenu: []
        },
        {
          path: "/admission/status-list",
          title: "Estados",
          iconType: "",
          icon: "",
          class: "ml-menu",
          groupTitle: false,
          badge: "",
          badgeClass: "",
          submenu: []
        }
        
      ]
  },
  //inscripcion
  {
      path: "",
      title: "Inscripciones",
      iconType: "",
      icon: "cast",
      class: "menu-toggle",
      groupTitle: false,
      badge: "",
      badgeClass: "",
      submenu: [
        {
          path: "/admission/backoffice",
          title: "BackOffice",
          iconType: "",
          icon: "",
          class: "ml-menu",
          groupTitle: false,
          badge: "",
          badgeClass: "",
          submenu: []
        },
        {
          path: "/admission/external-user",
          title: "Usuario externo",
          iconType: "",
          icon: "",
          class: "ml-menu",
          groupTitle: false,
          badge: "",
          badgeClass: "",
          submenu: []
        },
        {
          path: "/admission/internal-user",
          title: "Usuario interno",
          iconType: "",
          icon: "",
          class: "ml-menu",
          groupTitle: false,
          badge: "",
          badgeClass: "",
          submenu: []
        },
      ]
  },
  //Seguridad
  {
    path: "",
    title: "Seguridad",
    iconType: "feather",
    icon: "lock",
    class: "menu-toggle",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    submenu: [
      {
        path: "/security/user-list",
        title: "Usuario",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        submenu: [],
      },
      {
        path: "/security/role-list",
        title: "Rol",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        submenu: [],
      },
    ]
  
  }
];
