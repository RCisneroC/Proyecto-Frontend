import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'requestVariousStatusPipe'
})
export class RequestVariousStatusPipe implements PipeTransform {

  transform(value: number): string {
    if (value == 1) {
      return 'Pendiente';
    } else if (value == 2) {
      return 'En proceso';
    }
    else if (value == 3) {
      return 'Completado';
    }
    else if (value == 4) {
      return 'Cancelado';
    }
    return '';
  }

}
