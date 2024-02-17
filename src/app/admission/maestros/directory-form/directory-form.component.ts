import { Component } from '@angular/core';


@Component({
  selector: 'app-directory-form',
  templateUrl: './directory-form.component.html',
  styleUrls: ['./directory-form.component.scss']
})
export class DirectoryFormComponent {


  constructor() {}
  onFileDropped(event: any) {
    const files: File[] = event.files;
    // Puedes acceder a los archivos aquí
    console.log(files);
  }
}
