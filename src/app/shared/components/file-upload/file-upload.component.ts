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
  public file: File | null = null;

  @HostListener('change', ['$event.target.files']) emitFiles(event: FileList) {
    let file = event && event.item(0);
    this.onChange(file);
    this.file = file;
    if (file != null) {
      if (file.type != 'application/pdf' && file?.type != 'image/png' && file?.type != 'image/jpeg' && file?.type != 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        Swal.fire({
          title: "Escuela Judicial",
          text: 'Solo se permite tipo de archivo PDF/JPG/PNG.',
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
