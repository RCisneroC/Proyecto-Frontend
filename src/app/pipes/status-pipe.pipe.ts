import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusPipe'
})
export class StatusPipePipe implements PipeTransform {

  transform(value: any): string {
    if (value == 1) {
      return 'Activo.';
    }else if (value == 2) {
      return 'Inactivo.';
    }else if (value == 3) {
      return 'Pendiente.';
    }else if (value == 4) {
      return 'Rechazado.';
    }else if (value == 5) {
      return 'Aprobado.';
    }else if (value == 6) {
      return 'Terminado.';
    }else if (value == 7) {
      return 'Borrador.';
    }
    return '';
  }

}
