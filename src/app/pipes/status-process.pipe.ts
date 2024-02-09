import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusProcess'
})
export class StatusProcessPipe implements PipeTransform {

  transform(value: number): string {
    if (value == 1) {
      return 'Formación especializada';
    } else if (value == 2) {
      return 'Entrenamiento';
    } else if (value == 3) {
      return 'Ambos';
    } else if (value == 4) {
      return 'Sin asignar';
    }
    return '';
  }

}
