import { RouteInfo } from "./sidebar.metadata";
export const ROUTES: RouteInfo[] = [
  {
    path: "",
    title: "MENUITEMS.MAIN.TEXT",
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
    title: "MENUITEMS.DASHBOARD.TEXT",
    iconType: "feather",
    icon: "home",
    class: "",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    submenu: [
      // {
      //   path: "dashboard/dashboard1",
      //   title: "MENUITEMS.DASHBOARD.LIST.DASHBOARD1",
      //   iconType: "",
      //   icon: "user-check",
      //   class: "",
      //   groupTitle: false,
      //   badge: "",
      //   badgeClass: "",
      //   submenu: [],
      // }
    ],
  },
  // Common Modules
  
  {
    path: "",
    title: "MENUITEMS.ADMISSION.TEXT",
    iconType: "feather",
    icon: "user-check",
    class: "menu-toggle",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    submenu: [
    {
      path: "admission/schedule-activities-list",
      title: "Cronograma de actividades",
      iconType: "",
      icon: "",
      class: "",
      groupTitle: false,
      badge: "",
      badgeClass: "",
      submenu: []
    },
    // {
    //   path: "admission/",
    //   title: "Inscripción",
    //   iconType: "",
    //   icon: "",
    //   class: "",
    //   groupTitle: false,
    //   badge: "",
    //   badgeClass: "",
    //   submenu: []
    // },
    // {
    //   path: "admission/",
    //   title: "Admisión",
    //   iconType: "",
    //   icon: "",
    //   class: "",
    //   groupTitle: false,
    //   badge: "",
    //   badgeClass: "",
    //   submenu: []
    // },
    // {
    //   path: "admission/",
    //   title: "Notificaciones",
    //   iconType: "",
    //   icon: "",
    //   class: "",
    //   groupTitle: false,
    //   badge: "",
    //   badgeClass: "",
    //   submenu: []
    // },
    // {
    //   path: "admission/",
    //   title: "Convocatorias",
    //   iconType: "",
    //   icon: "",
    //   class: "",
    //   groupTitle: false,
    //   badge: "",
    //   badgeClass: "",
    //   submenu: []
    // },
    {
      path: "admission/",
      title: "Maestros",
      iconType: "",
      icon: "user-check",
      class: "menu-toggle",
      groupTitle: false,
      badge: "",
      badgeClass: "",
      submenu: [
        {
          path: "admission/activity-list",
          title: "Actividad",
          iconType: "",
          icon: "",
          class: "",
          groupTitle: false,
          badge: "",
          badgeClass: "",
          submenu: []
        },
        {
          path: "admission/lounge-list",
          title: "Salón",
          iconType: "",
          icon: "",
          class: "",
          groupTitle: false,
          badge: "",
          badgeClass: "",
          submenu: []
        },
        {
          path: "admission/reason-list",
          title: "Motivo",
          iconType: "",
          icon: "",
          class: "",
          groupTitle: false,
          badge: "",
          badgeClass: "",
          submenu: []
        },
        {
          path: "admission/type-activity-list",
          title: "Tipo de actividad",
          iconType: "",
          icon: "",
          class: "",
          groupTitle: false,
          badge: "",
          badgeClass: "",
          submenu: []
        },
        {
          path: "admission/modality-list",
          title: "Modalidad",
          iconType: "",
          icon: "",
          class: "",
          groupTitle: false,
          badge: "",
          badgeClass: "",
          submenu: []
        }
      ]
    }
    ]
  },
  // {
  //   path: "",
  //   title: "MENUITEMS.ENROLLMENT.TEXT",
  //   iconType: "feather",
  //   icon: "user-check",
  //   class: "menu-toggle",
  //   groupTitle: false,
  //   badge: "",
  //   badgeClass: "",
  //   submenu: []
  // },
  // {
  //   path: "",
  //   title: "MENUITEMS.INTRANETACADEMICREGISTRATION.TEXT",
  //   iconType: "feather",
  //   icon: "user-check",
  //   class: "menu-toggle",
  //   groupTitle: false,
  //   badge: "",
  //   badgeClass: "",
  //   submenu: []
  // },
  // {
  //   path: "",
  //   title: "MENUITEMS.TEACHINGMANAGEMENT.TEXT",
  //   iconType: "feather",
  //   icon: "user-check",
  //   class: "menu-toggle",
  //   groupTitle: false,
  //   badge: "",
  //   badgeClass: "",
  //   submenu: []
  // },
  // {
  //   path: "",
  //   title: "MENUITEMS.VIRTUALLEARNING.TEXT",
  //   iconType: "feather",
  //   icon: "user-check",
  //   class: "menu-toggle",
  //   groupTitle: false,
  //   badge: "",
  //   badgeClass: "",
  //   submenu: []
  
  // },
  {
    path: "",
    title: "Seguridad",
    iconType: "feather",
    icon: "user-check",
    class: "menu-toggle",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    submenu: [
      {
        path: "security/user-list",
        title: "Usuario",
        iconType: "",
        icon: "",
        class: "",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        submenu: [],
      },
      {
        path: "security/role-list",
        title: "Rol",
        iconType: "",
        icon: "",
        class: "",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        submenu: [],
      },
    ]
  
  }
];
