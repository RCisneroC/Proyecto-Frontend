import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PosterComment, PosterRequest } from 'app/admission/models/GetOneActivity';
export interface DialogData {
  type:string;
  accion:string;
  posterFile: string;
  comment: PosterComment[];
  poster:PosterRequest;
}
@Component({
  selector: 'app-view-poster-pdf',
  templateUrl: './view-poster-pdf.component.html',
  styleUrls: ['./view-poster-pdf.component.scss']
})
export class ViewPosterPDFComponent implements OnInit {
  public action: string="";
  public dialogTitle: string="Vista de Documento";
  public PosterDetails!: any;
  public Ext: string = "";
  public blobUrl: string="";
  public loading: boolean = true;
  
  constructor(
    public dialogRef: MatDialogRef<ViewPosterPDFComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public elm: ElementRef
  ) {
    // Set the defaults
    if (this.action === 'view-poster') {
      this.dialogTitle = "Vista de Documento";
    }
  }
  ngOnInit() {
    setTimeout(() => {
      const elementPdf = this.elm.nativeElement.querySelector('#pdf');
      console.log(elementPdf);
        this.action = this.data.accion;
        console.log(this.data);
        this.Ext = this.data.type;
        if (this.action === 'view-poster') {
          this.dialogTitle = "Vista de Documento";
          console.log(this.Ext);
          
          if (this.Ext == 'pdf') {
            // this.IsImage = false;
            this.renderPDF(this.data.posterFile);
          }
      }
    }, 1000);
  }

  renderPDF(base64PDF: string) {
    const element = this.elm.nativeElement.querySelector('#pdf');
    const blob = this.base64toBlob(base64PDF, 'application/pdf');
    this.blobUrl = URL.createObjectURL(blob);
    console.log(this.blobUrl);
    
     element.src = this.blobUrl;
     this.loading=false;
  }

  base64toBlob(base64: string, type: string): Blob {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: type });
  }

}
