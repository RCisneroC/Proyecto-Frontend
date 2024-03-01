import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import {  Documents, Experience, Student, Training } from './models/Student';
import { RequiredDocument } from './models/RequiredDocument';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivityDetailService } from 'app/admission/services/activity-detail.service';
import { StudentService } from './services/student.service';
import { MatDialog } from '@angular/material/dialog';
import { VerificarBS64Pipe } from 'app/pipes/verificar-bs64.pipe';
import { MatAccordion } from '@angular/material/expansion';
import { ViewPosterComponent } from 'app/admission/activitydetail/forms/view-poster/view-poster.component';
import { ViewPosterPDFComponent } from 'app/admission/activitydetail/forms/view-poster-pdf/view-poster-pdf.component';
import { AddExperienceComponent } from './components/add-experience/add-experience.component';
import Swal from 'sweetalert2';
import { AuthService } from '@core/service/auth.service';
import { User } from '@core/models/user';

@Component({
  selector: 'app-info-student',
  templateUrl: './info-student.component.html',
  styleUrls: ['./info-student.component.scss']
})
export class InfoStudentComponent extends UnsubscribeOnDestroyAdapter
implements OnInit{

  studentForm!: UntypedFormGroup;
  documentForm!: UntypedFormGroup;
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
    'institution',
    'city',
    'completionDate',
    'degreeDate',
    'educationLevel',
    'degreeObtained',
    'actions'
  ];


  displayedColumnsSpecialty = [
    'specialtyId',
    'name',
    'actions'
  ];

  displayedColumnsExperience = [
    'experienceId',
    'description',
    'position',
    'startDate',
    'endDate',
    'actions'
  ];


  displayedColumnsDoc = [
    'docType',
    'extension',
    'docResult',

  ];

  displayedColumnsActivities: string[] = [
    'name',
    // 'activityModeId',
    // 'activityTypeId',
    'actions',
  ];

  displayedColumnsSubject: string[] = [
    'name',
    'actions',
  ];

DataStudent!:Student;
DataExperience:Experience[]= [];
DataDocument:RequiredDocument[]= [];
DataTraining:Training[]= [];
cedula!:string;
fechaActual!: string;
fechaA: string | undefined;
header!: string;
experience?: Experience;
training?: Training;
_Form_Data = new FormData();
docForm!: UntypedFormGroup;
viewAct!: boolean;
viewAsig!: boolean;
user!:User;


constructor( private activatedRoute: ActivatedRoute,
public _ActivityService: ActivityDetailService,
public _studentService: StudentService,
private authenticationService: AuthService,
public _dialog: MatDialog,
private _nav:Router,
private fb: UntypedFormBuilder,
public _verificarBS64: VerificarBS64Pipe,
){
  super();

}


@ViewChild(MatAccordion) accordion?: MatAccordion;
  async ngOnInit() {
    this.user =this.authenticationService.currentUserValue;
    this.DataStudent=new Student();
    const fechaActual = new Date();
    this.getRequiredDocuments();
    this.fechaA=fechaActual.toLocaleDateString('es-PA');
    this.studentForm = this.createstudentForm();
    //this.documentForm = this.createDocumentForm();


     this.header="Actualizar Datos";
     await this.getTeacherByCedula();



    this.docForm= this.fb.group({
      FileDetails:new FormControl([]),
      FileType:new FormControl([]),
    });

  }

  async getRequiredDocuments() {
    this._studentService.getRequiredDocument().subscribe({
       next: (res) => {

         this.DataDocument = res;

       }
     })
   }

   GetName(type:number){

  return this.DataDocument.find(x=>x.documentId===type)?.name
  }
  async getTeacherByCedula() {

   this._studentService.getTeacherByCedula(this.user.cedula).subscribe({
      next: (res) => {

        this.DataStudent = res;
        this.fechaA=res.applicationDate;
        this.studentForm = this.createstudentForm();
        //this.documentForm = this.createDocumentForm();
        this._studentService.isTblLoading = false;
      }
    })
  }

  viewDocumento(row: Documents) {

    if (this._verificarBS64.transform(row.docResult.fileContents) != "pdf") {
      const dialogRef = this._dialog.open(ViewPosterComponent, {
       data: {
         type: this._verificarBS64.transform(row.docResult.fileContents),
         accion: 'view-poster',
         posterFile: row.docResult.fileContents,
         comment: "",
         poster: row,
       },
       disableClose: true,
     });
    } else {
      const dialogRef = this._dialog.open(ViewPosterPDFComponent, {
       data: {
         type: this._verificarBS64.transform(row.docResult.fileContents),
         accion: 'view-poster',
         posterFile: row.docResult.fileContents,
         comment: "",
         poster: row,
        },
        width:'1000px',
       disableClose: true,
     });
    }

  }


  AddExperience(){
    const dialogRef = this._dialog.open(AddExperienceComponent, {
      data: {
        experience: this.experience,
        accion: 'add-experience'
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result:Experience) => {
      if (result == undefined) {
        return;
        }
        this.DataExperience=[];

        if(this.DataStudent.listExperience.length>0){
          const IdMayor = this.DataStudent.listExperience.reduce((previous, current) => {
            return current.experienceId > previous.experienceId ? current : previous;
          });
          result.experienceId=IdMayor.experienceId+1;
        }else{
          result.experienceId=1;
        }

        this.DataExperience.push(result);

        this.DataStudent.listExperience=[...this.DataStudent.listExperience, ...this.DataExperience]

    });
  }


  RemoveExperience(row:Experience){

        this.DataExperience=[];
        this.DataExperience=this.DataStudent.listExperience.filter(x=>x.experienceId!=row.experienceId)
        this.DataStudent.listExperience=[...this.DataExperience]

  }
  Regresar(){
    this._nav.navigate(['/teaching-management/teacher-list/']);
  }



  createstudentForm(): UntypedFormGroup{
    return this.fb.group({
      studentId: new FormControl(this.DataStudent.studentId),
      cedula: new FormControl(this.DataStudent?.cedula, [Validators.required]),
      name: new FormControl(this.DataStudent?.name, [Validators.required]),
      lastName: new FormControl(this.DataStudent?.lastName, [Validators.required]),
      placeOfBirth:['Panama',[Validators.required]],
      dateOfBirth:[this.DataStudent?.dischargeDate],
      email: new FormControl(this.DataStudent?.email, [Validators.required,Validators.email]),
      telephoneNumber:['+50742487558',[Validators.required]],
      selected: new FormControl(this.DataStudent?.selected),
      placeResidence: new FormControl(this.DataStudent?.placeResidence),
      listCourse: new FormControl(this.DataStudent?.listCourse||[]),
      listTraining: new FormControl(this.DataStudent?.listTraining||[]),
      listSpecialty: new FormControl(this.DataStudent?.listSpecialty||[]),
      listExperience: new FormControl(this.DataStudent?.listExperience||[]),
      listDocument: new FormControl(this.DataStudent?.listDocument||[]),
      listActivity: new FormControl(this.DataStudent?.listActivity||[]),
      listSubject: new FormControl(this.DataStudent?.listSubject||[]),
      process: new FormControl(this.DataStudent.process),
      createdBy: new FormControl(this.DataStudent?.name)
    });
  }


public  onFileSelected(event: any):void {
   const file = event.target.files[0];
   const formdata=new FormData();
   formdata.append('FileDetails', file);
 this._studentService.archivo(formdata).subscribe({
  next: () => {
   console.log("guardado");
  },
  error: () => {

  }
})
}

public submit():void {

  this.studentForm?.get('listDocument')?.setValue(this.DataStudent?.listDocument);
  this.studentForm?.get('listExperience')?.setValue(this.DataStudent?.listExperience);
  this.studentForm?.get('listTraining')?.setValue(this.DataStudent?.listTraining);
  this.studentForm?.get('listDocument')?.setValue([]);
  this.studentForm?.get('listSubject')?.setValue([]);

  if(this.studentForm.valid)

  this._studentService.addUpdateTeacher(this.studentForm.value).subscribe({
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

  }

  public AddTraining():void{

  }

}

