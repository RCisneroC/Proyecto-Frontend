import {Component, ElementRef, ViewChild} from '@angular/core';
import {AcadInfoEF, DetailsParticipanteEF} from "../../admission/models/participant";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {ActivatedRoute, Router} from "@angular/router";
import {ActivityDetailService} from "../../admission/services/activity-detail.service";
import {MatDialog} from "@angular/material/dialog";
import {VerificarBS64Pipe} from "../../pipes/verificar-bs64.pipe";
import {InscriptionService} from "../../admission/inscription/services/inscription.service";
import {AuthService} from "@core";
import {EnrollDummy} from "../models/EnrollDummy";

@Component({
  selector: 'app-enroll-details',
  templateUrl: './enroll-details.component.html',
  styleUrls: ['./enroll-details.component.scss']
})
export class EnrollDetailsComponent {

  DisplayNameInfo: string[] = [
    'SubjectName',
    'DegreeName',
    'ClassShift',
    'RoomName',
    'createDate'
  ];

  dataSourceInfo: EnrollDummy[] = [{
    SubjectId: 0,
    SubjectName: '',
    DegreeName: '',
    ClassShift: '',
    RoomName: '',
    createDate: new Date()
  }]
  enrollDummyList: EnrollDummy[] = [];

  dataInfo = new MatTableDataSource<EnrollDummy>(this.dataSourceInfo);

  @ViewChild('ListaInfo')
  set paginatorInfo(value: MatPaginator) {
    this.dataInfo.paginator = value;
  }

  constructor(
    private Path: ActivatedRoute,
    public _router: Router,
    public _ActivityService: ActivityDetailService,
    public elm: ElementRef,
    private _inscriptionService: InscriptionService,
    private authService: AuthService
  ) {
        this.getDetails();
        this.getInfo();
  }

  getDetails() {
    this._ActivityService.loading = true;
    this._ActivityService.GetDetailsEFCedula(this.authService.currentUserValue.cedula).subscribe({
      next: (res: DetailsParticipanteEF) => {
        this._ActivityService._DetailsParticipanteEF = res;
        console.log("Activity obj", res);
        if (res.getDetailsResponse.length > 0) {
          this._ActivityService._DetailsResponseEF = this._ActivityService._DetailsParticipanteEF.getDetailsResponse[0];
        }
        this._ActivityService.loading = false;
      },
      error: (err) => {
      }
    })
  }

  getInfo() {
    const itemList = localStorage.getItem('enroll-dummy');
    if (itemList != null){
      this.enrollDummyList = JSON.parse(itemList);
      this.dataInfo = new MatTableDataSource<EnrollDummy>(this.enrollDummyList);
    }



  }
}
