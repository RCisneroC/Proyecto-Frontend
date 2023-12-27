import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDateFormat'
})
export class CustomDateFormatPipe implements PipeTransform {

  transform(value: Date): string | null {
    if (!value) {
      return null;
    }

    const day = value.getDate();
    const month = value.toLocaleString('es-ES', { month: 'short' }).toUpperCase();
    const year = value.getFullYear().toString().slice(-2);

    return `${day}-${month}-${year}`;
  }

}