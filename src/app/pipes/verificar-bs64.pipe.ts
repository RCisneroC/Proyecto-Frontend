import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'verificarBS64'
})
export class VerificarBS64Pipe implements PipeTransform {

  transform(base64Data: string): any {
    const byteString = atob(base64Data);
    const byteNumbers = new Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      byteNumbers[i] = byteString.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);

    if (byteString.startsWith('%PDF')) {
      return 'pdf';
    }

    // Check for PNG
    if (this.startsWith(byteArray, [0x89, 0x50, 0x4E, 0x47])) {
      return 'png';
    }

    // Check for JPEG
    if (this.startsWith(byteArray, [0xFF, 0xD8, 0xFF])) {
      return 'jpeg';
    }

    return 'unknown';
  }

  private startsWith(byteArray: Uint8Array, sequence: number[]): boolean {
    return sequence.every((value, index) => byteArray[index] === value);
  }

}
