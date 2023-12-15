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
    class: "menu-toggle",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    submenu: [
      {
        path: "dashboard/dashboard1",
        title: "MENUITEMS.DASHBOARD.LIST.DASHBOARD1",
        iconType: "",
        icon: "user-check",
        class: "",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        submenu: [],
      }
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
      path: "admission/",
      title: "Cronograma de actividades",
      iconType: "",
      icon: "",
      class: "",
      groupTitle: false,
      badge: "",
      badgeClass: "",
      submenu: []
    },
    {
      path: "admission/",
      title: "Maestros",
      iconType: "",
      icon: "",
      class: "",
      groupTitle: false,
      badge: "",
      badgeClass: "",
      submenu: [
        {
          path: "admission/",
          title: "Tipo Matricula",
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
  {
    path: "",
    title: "MENUITEMS.ENROLLMENT.TEXT",
    iconType: "feather",
    icon: "user-check",
    class: "menu-toggle",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    submenu: []
  },
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
  {
    path: "",
    title: "MENUITEMS.TEACHINGMANAGEMENT.TEXT",
    iconType: "feather",
    icon: "user-check",
    class: "menu-toggle",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    submenu: []
  },
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
