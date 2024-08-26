import { MatPaginator } from '@angular/material/paginator'; 
import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { SubjectServiceService } from 'app/admission/FormalEducations/Services/subject-service.service';
import { Subject } from '../../../Models/Subject';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-subject-details',
  templateUrl: './subject-details.component.html',
  styleUrls: ['./subject-details.component.scss']
})
export class SubjectDetailsComponent {

  public id: string = '';

  DisplayNameSubject: string[] = [
    'codigo',
    'name',
    'descripcion',
    'accion'
  ];

  dataSorceSubject: Subject[] = [
    {
     statusId:0,
      id:0,
      name:'',
      description:'',
      number:0,
      acronym:'',
      code:'',
      numOfCredits:0,
      numOfHours:0,
      numOfClasses:0,
      hasLaboratory:false,
      evaluationCriteria:'',
      synchronousHours:0,
      asynchronousHours:0,
   }
  ];
  dataSubjectList = new MatTableDataSource<Subject>(this.dataSorceSubject);
  dataSubjectDependence = new MatTableDataSource<Subject>(this.dataSorceSubject);
   
  @ViewChild("listadoAsignaturas") 
  set paginatorSubjectActive(value: MatPaginator) {
      this.dataSubjectList.paginator = value;
  }

  @ViewChild("asignaturasDependientes") 
  set paginatorSubjectDependence(value: MatPaginator) {
      this.dataSubjectDependence.paginator = value;
  }
  constructor(
    public _subjectService: SubjectServiceService,
    public activatedRoute: ActivatedRoute,
    public _Subject: SubjectServiceService,
    private _Router:Router
  ) {

    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
      this.getSubjectAll();
      this.getSubjectDependence();
      this.getOneAsignatura();
  })
  }

  volverAtras() {
    this._Router.navigate(['/admission/asignaturas']);
  }

  getSubjectDependence() {
    this._subjectService.getDependencias(this.id).subscribe({
      next: (res) => {
        this.dataSubjectDependence = new MatTableDataSource<Subject>(res);
        this.dataSubjectDependence.paginator = this.paginatorSubjectDependence;
      },
      error: () => {
        
      }
    })
  }

  getOneAsignatura() {
    this._subjectService.init_Subject();
    this._subjectService.getOneAsignaturas(this.id).subscribe({
      next: (res) => {
        this._subjectService._Subject = res;
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSubjectList.filter = filterValue.trim().toLowerCase();
  }

   applyFilterDependence(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSubjectDependence.filter = filterValue.trim().toLowerCase();
  }
  

  getSubjectAll() {
    this._subjectService.getAllSubject2(1).subscribe({
      next:(res)=>{
        this.dataSubjectList = new MatTableDataSource<Subject>(res);
        this.dataSubjectList.paginator = this.paginatorSubjectActive;
      },
      error: () => {
        
      }
    })
  }

  asignar(row: Subject) {
    var json = {
      subjectId: this.id,
      parentSubjectIds: [
        row.id
      ]
    }
    this._subjectService.SetDependenceSubject(json).subscribe({
      next: (res) => {
         
        this.getSubjectDependence();
      },
      error: (err) => {
         Swal.fire({
              title: "Escuela Judicial",
              text: err,
              icon: "warning"
            });
      }
    });
  }
  removeDepedence(row: Subject) {
   this._subjectService.DeleteDependenceSubject(this.id,row.id).subscribe({
      next: (res) => {
         
        this.getSubjectDependence();
      },
      error: (err) => {
         Swal.fire({
              title: "Escuela Judicial",
              text: err,
              icon: "warning"
            });
      }
    });
  
  }

}
