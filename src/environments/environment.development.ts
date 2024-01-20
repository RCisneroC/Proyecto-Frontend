// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrlTeacher:'http://localhost:5059/api/v1/Teacher/',
  apiUrl:'https://isjupauthenticationservice.azurewebsites.net/api/v1/account/',
  apiUrlSchedule: "https://isjupeccurriculummanagementservice.azurewebsites.net/api/v1/",
  ConsultaDocentes:'https://ecmanagementteaching-escuela-judicial.apps.revisados-attt.8ckj.p1.openshiftapps.com/api/v1/',
  consultaEstudiante: 'https://ecinscriptionservice-escuela-judicial.apps.revisados-attt.8ckj.p1.openshiftapps.com/api/Cedula/DataqueryCedula/GetDataCedula/',
  apiEC: "https://ecinscriptionservice-escuela-judicial.apps.revisados-attt.8ckj.p1.openshiftapps.com/api/v1/"
};

/*
 * For easier debugging in develong pment mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
