import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'requestVariousTypeIdPipe'
})
export class RequestVariousTypeIdPipe implements PipeTransform {

  transform(value: number): string {
    if (value == 1) {
      return 'Peticiones informativas';
    } else if (value == 2) {
      return 'Quejas';
    } else if (value == 3) {
      return 'Sugerencias';
    } else if (value == 4) {
      return 'Reclamos por actividad o examen en plataforma';
    } else if (value == 5) {
      return 'Retiros';
    }else if (value == 6) {
      return 'Reingresos';
    }
    else if (value == 7) {
      return 'Reclamos por deficiencias de servicios tecnológicas de la entidad educativa';
    }
    else if (value == 8) {
      return 'Solicitudes de estudiantes y participantes';
    }else if (value == 9) {
      return 'Convalidación de asignaturas';
    }else if (value == 10) {
      return 'Solicitud de créditos oficiales';
    }else if (value == 11) {
      return 'Solicitud de créditos no oficiales';
    }else if (value == 12) {
      return 'Certificaciones para docentes';
    }else if (value == 13) {
      return 'Certificaciones para facilitadores';
    }else if (value == 14) {
      return 'Certificaciones de no aprobación';
    }else if (value == 15) {
      return 'Certificaciones de expositores';
    }else if (value == 16) {
      return 'Constancia de asistencia de participantes';
    }else if (value == 20) {
      return 'Retiro de las asignaturas del periodo actual';
    }

    return '';
  }

}
