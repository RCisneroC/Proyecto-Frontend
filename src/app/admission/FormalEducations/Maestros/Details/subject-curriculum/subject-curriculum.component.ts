import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateCurriculumDesign } from 'app/admission/FormalEducations/Models/Degree';
import { Subject } from 'app/admission/FormalEducations/Models/Subject';
import { SubjectServiceService } from 'app/admission/FormalEducations/Services/subject-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-subject-curriculum',
  templateUrl: './subject-curriculum.component.html',
  styleUrls: ['./subject-curriculum.component.scss']
})
export class SubjectCurriculumComponent {

  public id: string = '';

  DisplayNameSubject: string[] = [
    'posicion',
    'codigo',
    'name',
    'descripcion',
    'accion'
  ];

  DisplayNameSubjectAll: string[] = [
    'codigo',
    'name',
    'descripcion',
    'accion'
  ];

  dataSorceSubject: Subject[] = [
    {
      statusId: 0,
      id: 0,
      name: '',
      description: '',
      number: 0,
      acronym: '',
      code: '',
      numOfCredits: 0,
      numOfHours: 0,
      numOfClasses: 0,
      hasLaboratory: false,
      evaluationCriteria: '',
      synchronousHours:0,
      asynchronousHours:0
    }
  ];
  public _CreateCurriculumDesign: CreateCurriculumDesign = {
    degreeCurriculumDesignTarget: 0,
    description: '',
    endDate: new Date(),
    startDate: new Date(),
    id: 0,
    name: '',
    statusId: 0
  }
  dataSubjectList = new MatTableDataSource<Subject>(this.dataSorceSubject);
  dataSourceAssignedSubject = new MatTableDataSource<Subject>(this.dataSorceSubject);

  @ViewChild("listadoAsignaturas")
  set paginatorSubjectActive(value: MatPaginator) {
    this.dataSubjectList.paginator = value;
  }

  @ViewChild("asignaturasDependientes")
  set paginatorSubjectDependence(value: MatPaginator) {
    this.dataSourceAssignedSubject.paginator = value;
  }
  constructor(
    public _subjectService: SubjectServiceService,
    public activatedRoute: ActivatedRoute,
    public _Subject: SubjectServiceService,
    private _Router: Router
  ) {
    this.getInfoLocal();
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
      this.getSubjectAll();
      this.getSubjectPending();
    });
  }

  volverAtras() {
    var ruta = localStorage.getItem('url_detalle') || '';
    this._Router.navigate([ruta]);
  }

  getSubjectPending() {
    this._subjectService.getAllSubjectPendingDegree(this.id).subscribe({
      next: (res) => {
        console.log("Pendientes");
        console.log(res);

        this.dataSourceAssignedSubject = new MatTableDataSource<Subject>(res);
        this.dataSourceAssignedSubject.paginator = this.paginatorSubjectDependence;
      },
      error: () => {

      }
    })
  }

  getSubjectAll() {
    this._subjectService.getAllSubjectNotPendingDegree(this.id).subscribe({
      next: (res) => {
        console.log("Todas");
        console.log(res);

        this.dataSubjectList = new MatTableDataSource<Subject>(res);
        this.dataSubjectList.paginator = this.paginatorSubjectActive;
      },
      error: () => {

      }
    })
  }

  getInfoLocal() {
    const myValue = localStorage.getItem('detalle_malla');
    if (myValue !== null) {
      let detalle = myValue;
      this._CreateCurriculumDesign = JSON.parse(detalle);
      console.log(this._CreateCurriculumDesign);

    } else {
      this._Router.navigate(['/#/admission/carreras'])
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSubjectList.filter = filterValue.trim().toLowerCase();
  }

  applyFilterDependence(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceAssignedSubject.filter = filterValue.trim().toLowerCase();
  }




  CreateSubject(row: Subject) {

    Swal.fire({
      title: "Ingrese el orden de la asignatura",
      input: "number",
      inputAttributes: {
        autocapitalize: "off"
      },
      showCancelButton: true,
      confirmButtonText: "Guardar",
      showLoaderOnConfirm: true,
      preConfirm: async (login) => {
        if (login == '') {
          Swal.showValidationMessage(`Ingrese un valor correcto.`);
        }
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      console.log('====================================');
      console.log(result);
      console.log('====================================');
      if (result.isConfirmed) {
        var json = {
          degreeCurriculumDesignId: this.id,
          subjectIds: [
            row.id
          ],
          subjectNumber: result.value
        }
        this._subjectService.CreateSubject(json).subscribe({
          next: (res) => {

            this.getSubjectPending();
            this.getSubjectAll();
          },
          error: (err: HttpErrorResponse) => {
            Swal.fire({
              title: "Escuela Judicial",
              text: err.error.Message,
              icon: "warning"
            });
          }
        });
      }
    });
  }
  DeleteSubjectDegree(row: Subject) {

    this._subjectService.DeleteSubjectDegree(this.id, row.id).subscribe({
      next: (res) => {

        this.getSubjectPending();
        this.getSubjectAll();
      },
      error: (err) => {
        Swal.fire({
          title: "Escuela Judicial",
          text: 'No se pudo eliminar la Asignatura.',
          icon: "warning"
        });
      }
    });
  }

  enviarAprobacion() {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "Se enviara la malla curricular para aprobación",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Enviar"
    }).then((result) => {
      if (result.isConfirmed) {
        this._subjectService.EnviarMallaCurricular(this.id, 3).subscribe({
          next: () => {
            Swal.fire({
              title: "Escuela Judicial!",
              text: "Enviado correctamente.",
              icon: "success"
            });
            var ruta = localStorage.getItem('url_detalle') || '';
            this._Router.navigate([ruta]);
          }
        });

      } else {
        Swal.fire({
          title: "Escuela Judicial!",
          text: "No fue enviado.",
          icon: "warning"
        });
      }
    });
  }

}
