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
    },
    ]
  },
  {
      path: "admission/",
      title: "Inscripciones",
      iconType: "",
      icon: "user-check",
      class: "menu-toggle",
      groupTitle: false,
      badge: "",
      badgeClass: "",
      submenu: [
        {
          path: "admission/schedule-list",
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
          path: "admission/activity-participants-list",
          title: "Participantes",
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
    
  // {
  //     path: "admission/",
  //     title: "Inscripciones EF",
  //     iconType: "",
  //     icon: "user-check",
  //     class: "menu-toggle",
  //     groupTitle: false,
  //     badge: "",
  //     badgeClass: "",
  //     submenu: [
  //       {
  //         path: "admission/form-ef",
  //         title: "BackOffice",
  //         iconType: "",
  //         icon: "",
  //         class: "ml-menu",
  //         groupTitle: false,
  //         badge: "",
  //         badgeClass: "",
  //         submenu: []
  //       }
  //     ]
  // },
    
  {
    path: "",
    title: "Aprobaciones",
    iconType: "feather",
    icon: "check-circle",
    class: "menu-toggle",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    submenu: [
      {
        path: "admission/list-curriculum-approve",
        title: "Cronograma de actividades",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        submenu: []
      },
      {
      path: "admission/list-rooms-approve",
      title: "Solicitud de Salones",
      iconType: "",
      icon: "",
      class: "ml-menu",
      groupTitle: false,
      badge: "",
      badgeClass: "",
      submenu: []
      },
      {
      path: "admission/list-post-approve",
      title: "Solicitud de Afiche",
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
      title: "Ajustes",
      iconType: "",
      icon: "database",
      class: "menu-toggle",
      groupTitle: false,
      badge: "",
      badgeClass: "",
    submenu: [
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
        },
        {
          path: "/admission/cooperating-organization",
          title: "Organización cooperativa",
          iconType: "",
          icon: "",
          class: "ml-menu",
          groupTitle: false,
          badge: "",
          badgeClass: "",
          submenu: []
        },
        {
          path: "/admission/cooperating-organization",
          title: "Crear Programa",
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
  // //inscripcion
  // {
  //   path: "",
  //   title: "Gestión Docente",
  //   iconType: "feather",
  //   icon: "lock",
  //   class: "menu-toggle",
  //   groupTitle: false,
  //   badge: "",
  //   badgeClass: "",
  //   submenu: [
  //     {
  //       path: "/teaching-management/teacher-list",
  //       title: "Docentes",
  //       iconType: "",
  //       icon: "",
  //       class: "ml-menu",
  //       groupTitle: false,
  //       badge: "",
  //       badgeClass: "",
  //       submenu: [],
  //     }
  //   ]
  
  // },
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
