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
    }

    return '';
  }

}
