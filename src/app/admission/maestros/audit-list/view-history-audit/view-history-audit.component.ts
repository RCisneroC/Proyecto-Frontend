import { Component, Inject, OnInit } from '@angular/core';
import { DirectoryService } from '../../services/directory.service';
import { UntypedFormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DirectoryData } from 'app/admission/models/directory';


@Component({
  selector: 'app-view-history-audit',
  templateUrl: './view-history-audit.component.html',
  styleUrls: ['./view-history-audit.component.scss']
})
export class ViewHistoryAuditComponent  implements OnInit{
  dataSource!: DirectoryData[];
  dialogTitle!: string;


  constructor(
    public dialogRef: MatDialogRef<ViewHistoryAuditComponent>,
   @Inject(MAT_DIALOG_DATA) public data: DirectoryData,
    public _directoryService: DirectoryService,
    private fb: UntypedFormBuilder
  ) {}



  displayedColumns: string[] = [];
  
  ngOnInit(): void {
  if(this.data.action==="file"){
  this.displayedColumns=['changeType', 'fileName', 'createdDate', 'by', 'lastModifiedDate'];
    this.getHistoryAudFile();
    this.dialogTitle = 'Historial archivo';
  }else{
    this.displayedColumns=['changeType', 'folderName', 'createdDate', 'by', 'lastModifiedDate'];
    this.getHistoryAudFolder();
    this.dialogTitle = 'Historial carpeta';
  }
 
  }
  

  
  getHistoryAudFile() {
    this._directoryService.GetHistoryFile(this.data.folder.fileId).subscribe({
      next: (res) => {

        this.dataSource = res["dataResult"];
        
        //this.dataSource = [];

      }
    });  
}
getHistoryAudFolder() {
  this._directoryService.GetHistoryFolder(this.data.folder.folderId).subscribe({
    next: (res) => {
      //this.dataSource = [];
        this.dataSource = res["dataResult"];
    }
  });  

}

}
