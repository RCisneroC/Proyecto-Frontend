import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LogoCooperting } from 'app/admission/models/LogoCooperating';
export interface DialogData {
  type:string;
  accion:string;
  logofile: string;
  logo:LogoCooperting;
}
@Component({
  selector: 'app-view-logo',
  templateUrl: './view-logo.component.html',
  styleUrls: ['./view-logo.component.scss']
})
export class ViewLogoComponent implements OnInit {
  public action: string = "";
  public dialogTitle: string = "Vista de logo";
  public PosterDetails!: any;
  public Ext: string = "";
  public IsImage: boolean = true;
  public blobUrl: string = "";
  public loading: boolean = true;
  @ViewChild('image') imageElement!: ElementRef<HTMLInputElement>;
  @ViewChild('pdfViewer') pdfViewer!: any;
  constructor(
    public dialogRef: MatDialogRef<ViewLogoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public elm: ElementRef
  ) {
    // Set the defaults
    if (this.action === 'view-logo') {
      this.dialogTitle = "Vista de logo";
      this.IsImage = true;
    }
  }
  ngOnInit() {
    setTimeout(() => {
      const elementImg = this.elm.nativeElement.querySelector('#image');
      const elementPdf = this.elm.nativeElement.querySelector('#pdf');
       
      
      // if (element) {
      this.action = this.data.accion;
      console.log(this.data);
      this.Ext = this.data.type;
      if (this.action === 'view-logo') {
        this.dialogTitle = "Vista de Imagen";
        console.log(this.Ext);
          
        if (this.Ext == 'png') {
          this.renderImage(this.data.logofile);
        } else if (this.Ext == 'jpeg') {
          this.renderImage(this.data.logofile);
        }
        // }
      }
    }, 1000);
  }

  renderImage(base64Image: string) {
    this.IsImage = true;
    this.elm.nativeElement.querySelector('#image').src = 'data:image/png;base64,' + base64Image;
    this.loading = false;
  }
}