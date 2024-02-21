import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'requestVariousApplicantUserPipe'
})
export class RequestVariousApplicantUserTypeIdPipe implements PipeTransform {

  transform(value: number): string {
    if (value == 1) {
      return 'Docente';
    } else if (value == 2) {
      return 'Estudiante';
    }
    else if (value == 3) {
      return 'Participante';
    }
    return ''
  }

}
