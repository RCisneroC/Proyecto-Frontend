import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
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
  selector: 'app-view-poster',
  templateUrl: './view-poster.component.html',
  styleUrls: ['./view-poster.component.scss']
})
export class ViewPosterComponent implements OnInit {
  public action: string="";
  public dialogTitle: string="Vista de Documento Cargado";
  public PosterDetails!: any;
  public Ext: string = "";
  public IsImage: boolean = true;
  public blobUrl: string="";
  public loading: boolean = true;
  @ViewChild('image') imageElement!: ElementRef<HTMLInputElement>;
  @ViewChild('pdfViewer') pdfViewer!: any;
  constructor(
    public dialogRef: MatDialogRef<ViewPosterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public elm: ElementRef
  ) {
    // Set the defaults
    if (this.action === 'view-poster') {
      this.dialogTitle = "Vista de Imagen";
      this.IsImage = true;
    }
  }
  ngOnInit() {
    setTimeout(() => {
      const elementImg = this.elm.nativeElement.querySelector('#image');
      const elementPdf = this.elm.nativeElement.querySelector('#pdf');
      console.log(elementImg);
      console.log(elementPdf);
      
      // if (element) {
        this.action = this.data.accion;
        console.log(this.data);
        this.Ext = this.data.type;
        if (this.action === 'view-poster') {
          this.dialogTitle = "Vista de Imagen";
          console.log(this.Ext);
          
          if (this.Ext == 'png') {
            this.renderImage(this.data.posterFile);
          } else if (this.Ext == 'jpeg') {
            this.renderImage(this.data.posterFile);
          }
      // }
      }
    }, 1000);
  }

  renderImage(base64Image: string) {
    this.IsImage = true;
    this.elm.nativeElement.querySelector('#image').src = 'data:image/png;base64,'+base64Image;
    this.loading = false;
  }
}
