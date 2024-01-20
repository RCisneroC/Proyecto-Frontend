import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusProcess'
})
export class StatusProcessPipe implements PipeTransform {

  transform(value: number): string {
    if (value == 1) {
      return 'Formación';
    }else if (value == 2) {
      return 'Educación continua';
    }else if (value == 3) {
      return 'Ambos';
    }
    return '';
  }

}
