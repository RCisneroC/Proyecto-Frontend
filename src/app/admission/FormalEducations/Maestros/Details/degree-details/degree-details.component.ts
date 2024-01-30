import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Degree,
  DegreeCurriculumDesign,
  DegreeDegreeAdmissionRequirement,
  DetalleDegree,
  PosterRequest,
} from 'app/admission/FormalEducations/Models/Degree';
import { DegreeService } from 'app/admission/FormalEducations/Services/degree.service';
import { AddDocumentosComponent } from '../Forms/add-documentos/add-documentos.component';
import { AddPosterComponent } from '../Forms/add-poster/add-poster.component';
import { AddCompetenciasComponent } from '../Forms/add-competencias/add-competencias.component';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import Swal from 'sweetalert2';
import { RequirementAdmision } from 'app/admission/FormalEducations/Models/RequirementAdmision';
import { Competence } from 'app/admission/FormalEducations/Models/Competence';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { VerificarBS64Pipe } from 'app/pipes/verificar-bs64.pipe';
import { ViewPosterComponent } from 'app/admission/activitydetail/forms/view-poster/view-poster.component';
import { ViewPosterPDFComponent } from 'app/admission/activitydetail/forms/view-poster-pdf/view-poster-pdf.component';
import { AddMallaCurricularComponent } from '../Forms/add-malla-curricular/add-malla-curricular.component';

@Component({
  selector: 'app-degree-details',
  templateUrl: './degree-details.component.html',
  styleUrls: ['./degree-details.component.scss'],
})
export class DegreeDetailsComponent {
  public id: string = '';

  DisplayNameDocument: string[] = [
    // 'Id',
    'nombre',
    'accion',
  ];

  DisplayNamePoster: string[] = [
    'Formato',
    'tipo',
    'Documentos',
    'Estado',
    'accion',
  ];

  DisplayNameCompetence: string[] = ['name', 'descripcion', 'accion'];

  DisplayNameCurriculum: string[] = [
    'name',
    'descripcion',
    'dateStart',
    'Estado',
    'accion',
  ];

  dataSourceDocumentRequired: RequirementAdmision[] = [
    {
      description: '',
      id: 0,
      name: '',
      statusId: 0,
    },
  ];

  dataSourcePosterRequest: PosterRequest[] = [
    {
      statusId: 0,
      id: 0,
      approvedBy: '',
      approvalDate: '',
      approvalMessage: '',
      degreeId: 0,
      degreeName: '',
      poster: {
        fileContents: '',
        contentType: '',
        fileDownloadName: '',
        lastModified: '',
        entityTag: '',
        enableRangeProcessing: false,
      },
      posterType: 0,
      posterComments: [
        {
          text: '',
          userId: '',
        },
      ],
    },
  ];

  dataSourceCompetence: Competence[] = [
    {
      description: '',
      id: 0,
      name: '',
      statusId: 0,
    },
  ];

  dataSourceRelacionCurriculum: DegreeCurriculumDesign[] = [
    {
      statusId: 0,
      id: 0,
      name: '',
      description: '',
      startDate: new Date(),
      endDate: new Date(),
      degreeCurriculumDesignTarget: 0,
    },
  ];
  public _DegreeCurriculumDesign: DegreeCurriculumDesign = {
    statusId: 0,
    id: 0,
    name: '',
    description: '',
    startDate: new Date(),
    endDate: new Date(),
    degreeCurriculumDesignTarget: 0,
  };

  dataDocuments = new MatTableDataSource<RequirementAdmision>(
    this.dataSourceDocumentRequired
  );
  dataPoster = new MatTableDataSource<PosterRequest>(
    this.dataSourcePosterRequest
  );
  dataCompetence = new MatTableDataSource<Competence>(
    this.dataSourceCompetence
  );
  dataCurriculum = new MatTableDataSource<DegreeCurriculumDesign>(
    this.dataSourceRelacionCurriculum
  );

  @ViewChild(MatPaginator)
  set paginatorDocument(value: MatPaginator) {
    this.dataDocuments.paginator = value;
  }

  @ViewChild('paginatorPoster')
  set paginatorPoster(value: MatPaginator) {
    this.dataPoster.paginator = value;
  }

  @ViewChild('paginatorCompetence')
  set paginatorCompetence(value: MatPaginator) {
    this.dataCompetence.paginator = value;
  }

  @ViewChild('paginatordataCurriculum')
  set paginatordataCurriculum(value: MatPaginator) {
    this.dataCurriculum.paginator = value;
  }

  constructor(
    private _Router: Router,
    private activatedRoute: ActivatedRoute,
    public _DegreeService: DegreeService,
    public _dialog: MatDialog,
    public _verificarBS64: VerificarBS64Pipe
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
      _DegreeService.init_Degree();
      this.getOneCarrera();
    });
  }

  volverAtras() {
    const params = localStorage.getItem('url') || '/admission/carreras';
    this._Router.navigate([params]);
  }

  getOneCarrera() {
    this._DegreeService.getOneDegreeDetails(this.id).subscribe({
      next: (res: Degree) => {
        console.log(res);
        this._DegreeService._Degree = res;
        this.getDocumentos(res.degreeDegreeAdmissionRequirements);
        this.dataPoster = new MatTableDataSource<PosterRequest>(
          res.posterRequests
        );
        this.dataCompetence = new MatTableDataSource<Competence>(
          res.degreeCompetences
        );
        this.dataCurriculum = new MatTableDataSource<DegreeCurriculumDesign>(
          res.degreeCurriculumDesigns
        );
        this.dataPoster.paginator = this.paginatorPoster;
        this.dataCompetence.paginator = this.paginatorCompetence;
        this.dataCurriculum.paginator = this.paginatordataCurriculum;
      },
      error: (err) => { },
    });
  }

  async getDocumentos(res: DegreeDegreeAdmissionRequirement[]) {
    this.dataSourceDocumentRequired = [];
    res.forEach((element: DegreeDegreeAdmissionRequirement) => {
      this.dataSourceDocumentRequired.push(element.degreeAdmissionRequirement);
    });
    this.dataDocuments = new MatTableDataSource<RequirementAdmision>(
      this.dataSourceDocumentRequired
    );
    this.dataDocuments.paginator = this.paginatorDocument;
  }

  AddDocumentos() {
    const dialogRef = this._dialog.open(AddDocumentosComponent, {
      data: {
        id_carrera: this.id,
        accion: 'add',
      },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result: ResponseMessageMaestra) => {
      if (result == undefined) {
        return;
      }
      if (result.CodError == 200) {
        Swal.fire({
          title: 'Escuela Judicial',
          text: result.Message,
          icon: 'success',
        });
        this.getOneCarrera();
      } else {
        Swal.fire({
          title: 'Escuela Judicial',
          text: result.Message,
          icon: 'warning',
        });
      }
    });
  }

  DeleteDocumentos(row: RequirementAdmision) {
    this._DegreeService.DeleteDegreeAdmission(this.id, row.id).subscribe({
      next: () => {
        Swal.fire({
          title: 'Escuela Judicial',
          text: 'Eliminado correctamente.',
          icon: 'success',
        });
        this.getOneCarrera();
      },
      error: () => {
        Swal.fire({
          title: 'Escuela Judicial',
          text: 'Intente nuevamente.',
          icon: 'warning',
        });
      },
    });
  }

  AddPoster() {
    const dialogRef = this._dialog.open(AddPosterComponent, {
      data: {
        id_carrera: this.id,
        accion: 'add',
      },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result: ResponseMessageMaestra) => {
      if (result == undefined) {
        return;
      }
      if (result.CodError == 200) {
        Swal.fire({
          title: 'Escuela Judicial',
          text: result.Message,
          icon: 'success',
        });
        this.getOneCarrera();
      } else {
        Swal.fire({
          title: 'Escuela Judicial',
          text: result.Message,
          icon: 'warning',
        });
      }
    });
  }

  DeletePoster(row: PosterRequest) {
    this._DegreeService.DeletePoster(this.id).subscribe({
      next: () => {
        Swal.fire({
          title: 'Escuela Judicial',
          text: 'Eliminado correctamente.',
          icon: 'success',
        });
        this.getOneCarrera();
      },
      error: () => {
        Swal.fire({
          title: 'Escuela Judicial',
          text: 'Intente nuevamente.',
          icon: 'warning',
        });
      },
    });
  }
  viewDocumento(row: PosterRequest) {
    console.log('====================================');
    console.log(row);
    console.log('====================================');

    if (this._verificarBS64.transform(row.poster.fileContents) != 'pdf') {
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
        width: '1000px',
        disableClose: true,
      });
    }
  }

  AddCompetencias() {
    const dialogRef = this._dialog.open(AddCompetenciasComponent, {
      data: {
        id_carrera: this.id,
        accion: 'add',
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result: ResponseMessageMaestra) => {
      if (result == undefined) {
        return;
      }
      if (result.CodError == 200) {
        Swal.fire({
          title: 'Escuela Judicial',
          text: result.Message,
          icon: 'success',
        });
        this.getOneCarrera();
      } else {
        Swal.fire({
          title: 'Escuela Judicial',
          text: result.Message,
          icon: 'warning',
        });
      }
    });
  }

  DeleteCompetencias(row: Competence) {
    this._DegreeService.DeleteDegreeAdminssion(this.id).subscribe({
      next: () => {
        Swal.fire({
          title: 'Escuela Judicial',
          text: 'Eliminado correctamente.',
          icon: 'success',
        });
        this.getOneCarrera();
      },
      error: () => {
        Swal.fire({
          title: 'Escuela Judicial',
          text: 'Intente nuevamente.',
          icon: 'warning',
        });
      },
    });
  }

  verCurriculum(row: DegreeCurriculumDesign) {
    localStorage.setItem('detalle_malla', JSON.stringify(row));
    localStorage.setItem(
      'url_detalle',
      '/admission/carreras/' + this.id + '/detalle'
    );
    this._Router.navigate(['/admission/carreras/' + row.id + '/asignaturas']);
  }

  AddMallaCurricular() {
    const dialogRef = this._dialog.open(AddMallaCurricularComponent, {
      data: {
        id_carrera: this.id,
        accion: 'add',
        malla: this._DegreeCurriculumDesign,
      },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result: ResponseMessageMaestra) => {
      if (result == undefined) {
        return;
      }
      if (result.CodError == 200) {
        Swal.fire({
          title: 'Escuela Judicial',
          text: result.Message,
          icon: 'success',
        });
        this.getOneCarrera();
      } else {
        Swal.fire({
          title: 'Escuela Judicial',
          text: result.Message,
          icon: 'warning',
        });
      }
    });
  }

  editCurriculum(row: DegreeCurriculumDesign) {
    const dialogRef = this._dialog.open(AddMallaCurricularComponent, {
      data: {
        id_carrera: this.id,
        accion: 'edit',
        malla: row,
      },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result: ResponseMessageMaestra) => {
      if (result == undefined) {
        return;
      }
      if (result.CodError == 200) {
        Swal.fire({
          title: 'Escuela Judicial',
          text: result.Message,
          icon: 'success',
        });
        this.getOneCarrera();
      } else {
        Swal.fire({
          title: 'Escuela Judicial',
          text: result.Message,
          icon: 'warning',
        });
      }
    });
  }
  deleteCurriculum(row: DegreeCurriculumDesign) {
    this._DegreeService.DeleteDegreeAdminssion(this.id).subscribe({
      next: () => {
        Swal.fire({
          title: 'Escuela Judicial',
          text: 'Eliminado correctamente.',
          icon: 'success',
        });
        this.getOneCarrera();
      },
      error: () => {
        Swal.fire({
          title: 'Escuela Judicial',
          text: 'Intente nuevamente.',
          icon: 'warning',
        });
      },
    });
  }
}
