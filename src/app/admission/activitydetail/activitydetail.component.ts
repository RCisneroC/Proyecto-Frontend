import { ActivityRequirement, PosterRequest } from './../models/GetOneActivity';
import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivityDetailService } from '../services/activity-detail.service';
import { ActivityActivityRequirement, GetOneActivity } from '../models/GetOneActivity';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { PosterRequeridosComponent } from './forms/poster-requeridos/poster-requeridos.component';
import { AsignarDocentesComponent } from './forms/asignar-docentes/asignar-docentes.component';
import { AsignarCooperantesComponent } from './forms/asignar-cooperantes/asignar-cooperantes.component';
import { DocumentRequeridosComponent } from './forms/document-requeridos/document-requeridos.component';
import { ResponseMessageMaestra } from '../models/ResponseMessage';
import Swal from 'sweetalert2';
import { VerificarBS64Pipe } from 'app/pipes/verificar-bs64.pipe';
import { ViewPosterComponent } from './forms/view-poster/view-poster.component';
import { ViewPosterPDFComponent } from './forms/view-poster-pdf/view-poster-pdf.component';

export class PeriodicElement {
  name!: string;
  no!: number;
  gender!: string;
}
const ELEMENT_DATA: PeriodicElement[] = [];
@Component({
  selector: 'app-activitydetail',
  templateUrl: './activitydetail.component.html',
  styleUrls: ['./activitydetail.component.scss']
})
export class ActivitydetailComponent {

  DisplayNameDocument: string[] = [
    'Id',
    'nombre',
    'accion'
  ];

  DisplayNamePoster: string[] = [
    'Id',
    'Formato',
    'Documentos',
    'Estado',
    'accion'
  ];

  DisplayNameTeachers: string[] = [
    'Id',
    'Nombre',
    'cedula',
    'accion'
  ];

  DisplayNameOrganization: string[] = [
    'Id',
    'logo',
    'nombre',
    'accion'
  ];
  dataSoruceActivityRequirements: ActivityRequirement[] = [
    {
      description: '',
      id: 0,
      name: '',
      statusId: 0
    }
  ];
  dataSource = ELEMENT_DATA;
  dataDocuments: any;
  dataPoster: any;
  dataTeacher: any;
  dataOrganismos: any;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  
  dataSource3 = new MatTableDataSource(ELEMENT_DATA);


  public paramsId: any;
  public paramsIdRevisado: any;
  constructor(
    private Path: ActivatedRoute,
    public _router: Router,
    public _ActivityService: ActivityDetailService,
    public _dialog: MatDialog,
    public _verificarBS64: VerificarBS64Pipe
  ) {
    console.log('====================================');
    console.log(Path);
    console.log('====================================');
    this.paramsId = Path.snapshot.params['id'];
    if (this.paramsId != null) {
      this.getOneActivity();
      this.dataTeacher = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
      this.dataOrganismos = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
      
    } else {
      this._router.navigate(['/admission/schedule-activities-list']);
    }
  }

  getOneActivity() {
    this._ActivityService.loading = true;
    this._ActivityService.GetOneActivity(this.paramsId).
      subscribe({
        next: (res: GetOneActivity) => {
          this._ActivityService._GetOneActivity = res;
          this.getDocumentos(res.activityActivityRequirements);
          this.dataPoster = new MatTableDataSource<PosterRequest>(res.posterRequests);
          this.dataPoster.paginator = this.paginator;
          // this.getPoster(res.posterRequests);
          // this.getTeachers();
          // this.getOrganismos();
          
        }, error: (err) => {
          console.log(err);
          this._router.navigate(['/admission/schedule-activities-list']);
        },
        complete: () => {
           this._ActivityService.loading = false;
        }
      })
  }
  async getDocumentos(res: ActivityActivityRequirement[]) {
    this.dataSoruceActivityRequirements = [];
    res.forEach((element: ActivityActivityRequirement) => {
      this.dataSoruceActivityRequirements.push(element.activityRequirement);
    });
    this.dataDocuments = new MatTableDataSource<ActivityRequirement>(this.dataSoruceActivityRequirements);
    this.dataDocuments.paginator = this.paginator;
  }
  detalle(row:any) {
    console.log(row);
  }
  volverAtras() {
    let url = localStorage.getItem('url') ||'' ;

    // if
    this._router.navigate([url]);
  }
  viewDocumento(row: PosterRequest) {
   
    if (this._verificarBS64.transform(row.poster.fileContents) != "pdf") {
      const dialogRef = this._dialog.open(ViewPosterComponent, {
       data: {
         type: this._verificarBS64.transform(row.poster.fileContents),
         accion: 'view-poster',
         posterFile: row.poster.fileContents,
         comment: row.posterComments,
         poster: row,
       },
       disableClose: true,
     });
    } else {
      const dialogRef = this._dialog.open(ViewPosterPDFComponent, {
       data: {
         type: this._verificarBS64.transform(row.poster.fileContents),
         accion: 'view-poster',
         posterFile: row.poster.fileContents,
         comment: row.posterComments,
         poster: row,
        },
        width:'1000px',
       disableClose: true,
     });
    }

  }

  AddDocumentos(){
    const dialogRef = this._dialog.open(DocumentRequeridosComponent, {
      data: {
        id_actividad: this.paramsId,
        accion: 'add-document'
      },
      disableClose: true,
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
            this.getOneActivity()
          } else {
            Swal.fire({
              title: "Escuela Judicial",
              text: result.Message,
              icon: "warning"
            });
          }
    });
  }
  AddPoster(){
    const dialogRef = this._dialog.open(PosterRequeridosComponent, {
      data: {
        id_actividad: this.paramsId,
        accion: 'add-poster'
      },
      width: '600px',
      disableClose: true,
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
            this.getOneActivity()
          } else {
            Swal.fire({
              title: "Escuela Judicial",
              text: result.Message,
              icon: "warning"
            });
          }
    });
  }
  AddTeachers(){
    const dialogRef = this._dialog.open(AsignarDocentesComponent, {
      data: {
        id_actividad: this.paramsId,
        accion: 'add-teachers'
      },
      disableClose: true,
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
            this.getOneActivity()
          } else {
            Swal.fire({
              title: "Escuela Judicial",
              text: result.Message,
              icon: "warning"
            });
          }
    });
  }
  AddCooperantes(){
    const dialogRef = this._dialog.open(AsignarCooperantesComponent, {
      data: {
        id_actividad: this.paramsId,
        accion: 'add-cooperantes'
      },
      disableClose: true,
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
            this.getOneActivity()
          } else {
            Swal.fire({
              title: "Escuela Judicial",
              text: result.Message,
              icon: "warning"
            });
          }
    });
  }

}
