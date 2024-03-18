import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusTeacher'
})
export class StatusTeacherPipe implements PipeTransform {

  transform(value: number): string {
    if (value == 1) {
      return 'Aprobado';
    } else if (value == 2) {
      return 'Rechazado';
    } else if (value == 3) {
      return 'Pendiente';
    }
    return 'Sin Status';
  }

}
