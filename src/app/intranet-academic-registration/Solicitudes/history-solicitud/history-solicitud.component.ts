import {Component, Inject, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {RequestVariousItem} from "../../Models/RequestVarious";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {AcadInfoEF} from "../../../admission/models/participant";

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
    this.action = data.action;
    this.dialogTitle = "Historial de la Solicitud";
    this.getInfo();
  }

  DisplayInfo: string[] = [
    'CreateDate',
    'Description',
  ];

  dataSourceInfo: any[] = [{
    Description: '',
    CreatedDate: new Date()
  }]


  dataHInfo = new MatTableDataSource<any>(this.dataSourceInfo);

  @ViewChild('ListaHInfo')
  set paginatorInfo(value: MatPaginator) {
    this.dataHInfo.paginator = value;
  }

  getInfo() {
    const Historyparse = JSON.parse(this.data.request.history);
    this.dataHInfo = new MatTableDataSource<any>(Historyparse);
    console.log("HistoryInfo", Historyparse);

  }
}
