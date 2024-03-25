import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'entityType'
})
export class EntityTypePipe implements PipeTransform {

  transform(value: number): string {
    if (value == 1) {
      return 'Create';
    } else if (value == 2) {
      return 'Update';
    }
    else if (value == 3) {
      return 'Delete';
    }
    else if (value == 4) {
      return 'Login';
    }
    else if (value == 5) {
      return 'Error';
    }
    else if (value == 6) {
      return 'Others';
    }
    return '';
  }
}
