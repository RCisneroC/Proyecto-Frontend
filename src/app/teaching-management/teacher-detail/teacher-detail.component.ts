import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { ActivityDetailService } from 'app/admission/services/activity-detail.service';
import { Teacher } from '../models/Teacher';
import { TeacherService } from '../services/teacher.service';
import Swal from 'sweetalert2';
import { MatAccordion } from '@angular/material/expansion';
import { AddCourseComponent } from '../add-course/add-course.component';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-teacher-detail',
  templateUrl: './teacher-detail.component.html',
  styleUrls: ['./teacher-detail.component.scss']
})
export class TeacherDetailComponent extends UnsubscribeOnDestroyAdapter
implements OnInit{
  
  teacherForm!: UntypedFormGroup;
  processList = [
    { id: 1, name: 'Formación' },
    { id: 2, name: 'Educación continua' },
    { id: 3, name: 'Ambos procesos' }
  ];

  displayedColumnsCourse = [
    'courseId',
    'name',
    'year',
    'actions'
  ];
  
  displayedColumnsTraining = [
    'trainingId',
    'name',
    'year',
    'typeId',
    'actions'
  ];
  
  displayedColumnsSpecialty = [
    'specialtyId',
    'name',
    'actions'
  ];
DataTeacher!:Teacher;
cedula!:string;
fechaActual!: string;
fechaA: string | undefined;
  header!: string;





constructor( private activatedRoute: ActivatedRoute,
public _ActivityService: ActivityDetailService,
public _teacherService: TeacherService,
public _dialog: MatDialog,
private _nav:Router,
private fb: UntypedFormBuilder
){
  super();
  
}
@ViewChild(MatAccordion) accordion?: MatAccordion;
  async ngOnInit() {
    //this.DataTeacher=this.activatedRoute.snapshot.queryParams["cedula"];
    this.cedula=this.activatedRoute.snapshot.params["cedula"];
    this.DataTeacher=new Teacher();
    const fechaActual = new Date();
    this.fechaA=fechaActual.toLocaleDateString('es-PA');
    this.teacherForm = this.createTeacherForm();
    this.header="Crear docente";
    if(this.cedula!="-1"){
     this.header="Editar docente";
     await this.getTeacherByCedula();
    }
    
   
  }
  
  async getTeacherByCedula() {
   this._teacherService.getTeacherByCedula(this.cedula).subscribe({
      next: (res) => {

        this.DataTeacher = res;
        this.fechaA=res.applicationDate;
        this.teacherForm = this.createTeacherForm();
        this._teacherService.isTblLoading = false;
      }
    })
  }
  
  AddCourse(){
    const dialogRef = this._dialog.open(AddCourseComponent, {
      data: {
        id: 4,
        accion: 'add-course'
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
           
          } else {
            Swal.fire({
              title: "Escuela Judicial",
              text: result.Message,
              icon: "warning"
            });
          }
    });
  }
  Regresar(){
    this._nav.navigate(['/teaching-management/teacher-list/']);
  }
  
  createTeacherForm(): UntypedFormGroup{
    return this.fb.group({
      teacherId: new FormControl(0),
      cedula: new FormControl(this.DataTeacher?.cedula, [Validators.required]),
      name: new FormControl(this.DataTeacher?.name, [Validators.required]),
      lastName: new FormControl(this.DataTeacher?.lastName, [Validators.required]),
      email: new FormControl(this.DataTeacher?.email, [Validators.required,Validators.email]),
      selected: new FormControl(this.DataTeacher?.selected),
      dischargeDate: new FormControl(this.DataTeacher?.dischargeDate),
      placeResidence: new FormControl(this.DataTeacher?.placeResidence),
      listCourse: new FormControl(this.DataTeacher?.listCourse||[]),
      listTraining: new FormControl(this.DataTeacher?.listTraining||[]),
      listSpecialty: new FormControl(this.DataTeacher?.listSpecialty||[]),
      process: new FormControl(this.DataTeacher?.process,[Validators.required]),
     
    });
  }
  
  submit() {
  if(this.teacherForm.valid)
  this._teacherService.addUpdateTeacher(this.teacherForm.value).subscribe({
    next: () => {
      Swal.fire({
              title: "Escuela Judicial",
              text: 'Guardado correctamente.',
              icon: "success"
          }); 
    
    },
    error: () => {
      Swal.fire({
            title: "Escuela Judicial",
            text: 'Intente nuevamente.',
            icon: "warning"
          });
    }
   })
   
   this._nav.navigate(['/teaching-management/teacher-list/']);
    // emppty stuff
  }
  
  remove(row: Teacher){
  console.log(row);
  }
  
  AddCourses(){
  
  }

}
