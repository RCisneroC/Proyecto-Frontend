import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusMatricula'
})
export class StatusMatriculaPipe implements PipeTransform {

  transform(value: number): string {
    if (value == 1) {
      return 'Activo.';
    } else if (value == 2) {
      return 'Inactivo.';
    } else if (value == 3) {
      return 'Pendiente.';
    } else if (value == 4) {
      return 'Aceptado.';
    } else if (value == 5) {
      return 'Rechazado.';
    } else if (value == 6) {
      return 'Revisado.';
    } else if (value == 7) {
      return 'En revisión.';
    } else if (value == 8) {
      return 'Matriculado.';
    } else if (value == 9) {
      return 'Finalizado.';
    } else if (value == 10) { // borrador -
      return 'Suspendido.';
    } else if (value == 11) { // borrador -
      return 'Retirado.';
    }
    return '';
  }

}
