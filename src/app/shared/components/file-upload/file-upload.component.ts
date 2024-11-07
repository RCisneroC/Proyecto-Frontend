/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-types */
import { Component, ElementRef, HostListener, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: FileUploadComponent,
      multi: true,
    },
  ],
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent implements ControlValueAccessor {
  onChange!: Function;
  @Input() allowedFileTypes: string[] = ['application/pdf', 'image/png', 'image/jpeg', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
  public file: File | null = null;

  @HostListener('change', ['$event.target.files']) emitFiles(event: FileList) {
    let file = event && event.item(0);
    this.onChange(file);
    this.file = file;
    if (file != null) {
      if (!this.allowedFileTypes.includes(file.type)) {
        const fileTypes = {
          'application/pdf': 'PDF',
          'image/png': 'PNG',
          'image/jpeg': 'JPEG',
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'Excel'
        };
        const allowedFormats = Object.values(fileTypes).join(', ');
        Swal.fire({
          title: "Escuela Judicial",
          text: `Tipo de archivo no permitido. Los formatos permitidos son: ${allowedFormats}`,
          icon: "warning"
        });
        return;
      }
    }
  }

  constructor(private host: ElementRef<HTMLInputElement>) { }

  writeValue(value: null) {
    // clear file input
    this.host.nativeElement.value = '';
    this.file = null;
  }

  registerOnChange(fn: Function) {
    this.onChange = fn;
  }

  registerOnTouched(fn: Function) {
    // add code here
  }
}
