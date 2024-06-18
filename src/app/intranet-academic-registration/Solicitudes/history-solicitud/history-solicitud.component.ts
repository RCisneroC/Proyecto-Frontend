import {Component, Inject, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {RequestVariousItem, comments} from "../../Models/RequestVarious";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
//import {AcadInfoEF} from "../../../admission/models/participant";

export interface DialogData {
  id: string;
  action: string;
  request: RequestVariousItem;
}
@Component({
  selector: 'app-history-solicitud',
  templateUrl: './history-solicitud.component.html',
  styleUrls: ['./history-solicitud.component.scss']
})
export class HistorySolicitudComponent {
  action: string;
  dialogTitle: string;
  loading: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<HistorySolicitudComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
    console.log(data.request.comments)
    this.action = data.action;
    this.dialogTitle = "Historial de la Solicitud";
    this.getInfo();
  }

  DisplayInfo: string[] = [
    'createdDate',
    'description',
  ];

  dataSourceInfo: comments[] = []


  dataHInfo = new MatTableDataSource<comments>(this.dataSourceInfo);

  @ViewChild('ListaHInfo')
  set paginatorInfo(value: MatPaginator) {
    this.dataHInfo.paginator = value;
  }

  getInfo() {

   // const Historyparse = JSON.parse(this.data.request);
    //this.dataHInfo = new MatTableDataSource<any>(Historyparse);
    this.dataHInfo = new MatTableDataSource<comments>(this.data.request.comments);
   // console.log("HistoryInfo", Historyparse);

  }
}
