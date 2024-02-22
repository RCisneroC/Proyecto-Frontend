
import { Direction } from "@angular/cdk/bidi";
import { FlatTreeControl } from "@angular/cdk/tree";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatTreeFlatDataSource, MatTreeFlattener } from "@angular/material/tree";
import { ViewPosterPDFComponent } from "app/admission/activitydetail/forms/view-poster-pdf/view-poster-pdf.component";
import { ViewPosterComponent } from "app/admission/activitydetail/forms/view-poster/view-poster.component";
import { VerificarBS64Pipe } from "app/pipes/verificar-bs64.pipe";
import { AddDirectoryComponent } from "./add-directory/add-directory.component";
import { ResponseMessageMaestra } from "app/admission/models/ResponseMessage";
import Swal from "sweetalert2";
import { DirectoryService } from "../services/directory.service";
import { AddFileComponent } from "./add-file/add-file.component";
import * as JSZip from 'jszip';
import { map } from "rxjs";

export interface FoodNode {
  folderId:number;
  fileId:number;
  folderName: string;
  extension?: string;
  files?: FoodNode[];
}

export interface ExampleFlatNode {
  expandable: boolean;
  folderId:number;
  fileId:number;
  folderName: string;
  extension: string | undefined;
  level: number;
}



@Component({
  selector: 'app-directory-list',
  templateUrl: './directory-list.component.html',
  styleUrls: ['./directory-list.component.scss']
})
export class DirectoryListComponent  implements OnInit   { 
  displayedColumns: string[] = ['folderName', 'extension','action'];
  
  private transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.files && node.files.length >= 0,
      folderName: node.folderName,
      extension: node.extension,
      level: level,
      folderId:node.folderId,
      fileId:node.fileId,
    };
  }


  treeControl = new FlatTreeControl<ExampleFlatNode>(
      node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
      this.transformer, node => node.level,
      node => node.expandable, node => node.files);

  dataSource = new MatTreeFlatDataSource(this.treeControl,this.treeFlattener);
  valor!: string;

  constructor( 
    public _verificarBS64: VerificarBS64Pipe,
    public _dialog: MatDialog,
    public _directoryService:DirectoryService
  ) {

  }
  ngOnInit() {

    this.getAllDirectory();
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
  
  getAllDirectory() {
    this._directoryService.getAllDirectory2().subscribe({
      next: (res:any) => {
      console.log(res);
        this.dataSource.data = res["dataResult"]==null?[]:res["dataResult"];
        //this.dataTask.paginator = this.paginator;

      }
    })
  }
  
  newFolder(event:any,file:string){
      let tempDirection: Direction;
      if (localStorage.getItem('isRtl') === 'true') {
        tempDirection = 'rtl';
      } else {
        tempDirection = 'ltr';
      }
      
      const dialogRef = this._dialog.open(AddDirectoryComponent, {
        data: {
          folder: event,
          action: file,
        },
        direction: tempDirection,
      });
       dialogRef.afterClosed().subscribe((result:ResponseMessageMaestra) => {
         if (result == undefined) {
          return;
          }
          if (result.CodError == 200) {
              Swal.fire({
                  title: "Escuela Judicial",
                  text: result.Message,
                  icon: "success"
              });
              this.getAllDirectory();
            } else {
              Swal.fire({
                title: "Escuela Judicial",
                text: result.Message,
                icon: "warning"
              });
            }
          }); 
    
  }
  
  newfile(event:any,file:string){
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this._dialog.open(AddFileComponent, {
      data: {
        folder: event,
        action: file,
      },
      direction: tempDirection,
    });
     dialogRef.afterClosed().subscribe((result:ResponseMessageMaestra) => {
       if (result == undefined) {
        return;
        }
        if (result.CodError == 200) {
            Swal.fire({
                title: "Escuela Judicial",
                text: result.Message,
                icon: "success"
            });
            this.getAllDirectory();
          } else {
            Swal.fire({
              title: "Escuela Judicial",
              text: result.Message,
              icon: "warning"
            });
          }
        }); 
  
}
  
  viewDocumento(row: FoodNode) {
    this._directoryService.getfilebyId(row.fileId).pipe(
      map(item => {
        this.valor=item.dataResult[0].file
        if (this._verificarBS64.transform(this.valor) != "pdf") {
          this._dialog.open(ViewPosterComponent, {
           data: {
             type: this._verificarBS64.transform(this.valor),
             accion: 'view-poster',
             posterFile: this.valor,
             comment: "",
             poster: row,
           },
           disableClose: true,
         });
       } else {
        this._dialog.open(ViewPosterPDFComponent, {
           data: {
             type: this._verificarBS64.transform(this.valor),
             accion: 'view-poster',
             posterFile: this.valor,
             comment: "",
             poster: row,
           },
           width: '1000px',
           disableClose: true,
         });
       }
    
      })
    ).subscribe();

  }
  
  
  download(row:FoodNode){
    this._directoryService.getfilebyId(row.fileId).pipe(
      map(item => {
        this.valor=item.dataResult[0].file
        const downloadLink = document.createElement('a');
        const fileName = item.dataResult[0].fileName;
          downloadLink.href = 'data:'+item.dataResult[0].contentType+';base64,'+this.valor;
          downloadLink.download = fileName;
          downloadLink.click();
          })
    ).subscribe();

  }
  
   downloadZip = (event:FoodNode) => {
    const zip = new JSZip();
 
    const file1 = new File([this.base64ToArrayBuffer(this.valor)], 'archivo1.png');
    zip.file('archivo1.png', file1,{base64: true});
   
  
    zip.generateAsync({ type: 'arraybuffer' }).then((zipBytes) => {
      const downloadLink = document.createElement('a');
      downloadLink.href = window.URL.createObjectURL(new Blob([zipBytes], { type: 'application/zip' }));
      downloadLink.download = event.folderName+'.zip';
      downloadLink.click();
  
      // Eliminar el enlace de descarga después de la descarga
      setTimeout(() => {
        document.body.removeChild(downloadLink);
      }, 100);
    });
  }
  
   base64ToArrayBuffer(base64String: string): ArrayBuffer {
    const binaryString = atob(base64String);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  }
  


}



