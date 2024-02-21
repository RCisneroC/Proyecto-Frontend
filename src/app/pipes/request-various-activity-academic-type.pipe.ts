import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'requestVariousActivityAcademicTypePipe'
})
export class RequestVariousActivityAcademicTypePipe implements PipeTransform {

  transform(value: number): string {
    if (value == 1) {
      return 'Formación Especializada';
    } else if (value == 2) {
      return 'Entrenamiento';
    }
    return '';
  }

}
