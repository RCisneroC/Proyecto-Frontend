import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { Activity, Documents, Experience, Subject, Teacher, Training } from '../models/Teacher';
import { RequiredDocument } from '../models/RequiredDocument';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivityDetailService } from 'app/admission/services/activity-detail.service';
import { TeacherService } from '../services/teacher.service';
import { MatDialog } from '@angular/material/dialog';
import { VerificarBS64Pipe } from 'app/pipes/verificar-bs64.pipe';
import { MatAccordion } from '@angular/material/expansion';
import { ViewPosterComponent } from 'app/admission/activitydetail/forms/view-poster/view-poster.component';
import { ViewPosterPDFComponent } from 'app/admission/activitydetail/forms/view-poster-pdf/view-poster-pdf.component';
import { AddExperienceComponent } from '../add-experience/add-experience.component';
import { AddActivityComponent } from '../add-activity/add-activity.component';
import Swal from 'sweetalert2';
import { AddSubjectComponent } from '../add-subject/add-subject.component';
import { AddTrainingComponent } from '../add-training/add-training.component';
import { AuthService } from '@core/service/auth.service';
import { User } from '@core/models/user';

@Component({
  selector: 'app-info-teacher',
  templateUrl: './info-teacher.component.html',
  styleUrls: ['./info-teacher.component.scss']
})
export class InfoTeacherComponent extends UnsubscribeOnDestroyAdapter
implements OnInit{
  
  teacherForm!: UntypedFormGroup;
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
    'fileUpload',
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

DataTeacher!:Teacher;
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
public _teacherService: TeacherService,
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
    this.DataTeacher=new Teacher();
    const fechaActual = new Date();
    this.getRequiredDocuments();
    this.fechaA=fechaActual.toLocaleDateString('es-PA');
    this.teacherForm = this.createTeacherForm();
    this.teacherForm.get('cedula')?.disable();
    //this.documentForm = this.createDocumentForm();
   
  
     this.header="Actualizar Datos";
     await this.getTeacherByCedula();
 

   
    this.docForm= this.fb.group({
      FileDetails:new FormControl([]),
      FileType:new FormControl([]),
    });
   
  }
  
  async getRequiredDocuments() {
    this._teacherService.getRequiredDocument().subscribe({
       next: (res) => {
 
         this.DataDocument = res;
      
       }
     })
   }
  
   GetName(type:number){
   
  return this.DataDocument.find(x=>x.documentId===type)?.name
  }
  async getTeacherByCedula() {
  
   this._teacherService.getTeacherByCedula(this.user.cedula).subscribe({
      next: (res) => {

        this.DataTeacher = res;
        this.fechaA=res.applicationDate;
        this.teacherForm = this.createTeacherForm();
        //this.documentForm = this.createDocumentForm();
        this._teacherService.isTblLoading = false;
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
        
        if(this.DataTeacher.listExperience.length>0){
          const IdMayor = this.DataTeacher.listExperience.reduce((previous, current) => {
            return current.experienceId > previous.experienceId ? current : previous;
          });
          result.experienceId=IdMayor.experienceId+1;
        }else{
          result.experienceId=1;
        }
      
        this.DataExperience.push(result);
        
        this.DataTeacher.listExperience=[...this.DataTeacher.listExperience, ...this.DataExperience]
        
    });
  }
  
  AddActivity(){
    const dialogRef = this._dialog.open(AddActivityComponent, {
      data: {
        teacher:this.DataTeacher,
        accion: 'add-Activities'
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == undefined) {
        return;
        }
        if (result.CodError == 200) {
            Swal.fire({
                title: "Escuela Judicial",
                text: result.Message,
                icon: "success"
            });
          this.getTeacherByCedula();
          } else {
            Swal.fire({
              title: "Escuela Judicial",
              text: result.Message,
              icon: "warning"
            });
          }
    });
  

  }
  
  AddSubject(){
    const dialogRef = this._dialog.open(AddSubjectComponent, {
      data: {
        teacher:this.DataTeacher,
        accion: 'add-subjects'
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == undefined) {
        return;
        }
        if (result.CodError == 200) {
            Swal.fire({
                title: "Escuela Judicial",
                text: result.Message,
                icon: "success"
            });
          this.getTeacherByCedula();
          } else {
            Swal.fire({
              title: "Escuela Judicial",
              text: result.Message,
              icon: "warning"
            });
          }
    });
  

  }
  
  deleteSubject(row: Subject) {
  
    const AsignarActivitiesForm = this.fb.group({
      teacherId:[this.DataTeacher.teacherId,[Validators.required]],
      subjectList: this.fb.array([row.id]),
      Action:2
    });
    this._teacherService.addSubjectTeacher(AsignarActivitiesForm.getRawValue()).subscribe({
      next: () => {
        Swal.fire({
                title: "Escuela Judicial",
                text: 'Eliminado correctamente.',
                icon: "success"
            });
          this.getTeacherByCedula(); 
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
  
  
  deleteAct(row: Activity) {
  
    const AsignarActivitiesForm = this.fb.group({
      teacherId:[this.DataTeacher.teacherId,[Validators.required]],
      activityList: this.fb.array([row.id]),
      Action:2
    });
    this._teacherService.addActivitiesTeacher(AsignarActivitiesForm.getRawValue()).subscribe({
      next: () => {
        Swal.fire({
                title: "Escuela Judicial",
                text: 'Eliminado correctamente.',
                icon: "success"
            });
          this.getTeacherByCedula(); 
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
  AddTraining(){
    const dialogRef = this._dialog.open(AddTrainingComponent, {
      data: {
        training: this.training,
        accion: 'add-training'
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result:Training) => {
      if (result == undefined) {
        return;
        }
        this.DataTraining=[];
        
        if(this.DataTeacher.listTraining.length>0){
          const IdMayor = this.DataTeacher.listTraining.reduce((previous, current) => {
            return current.trainingId > previous.trainingId ? current : previous;
          });
          result.trainingId=IdMayor.trainingId+1;
        }else{
          result.trainingId=1;
        }
      
        this.DataTraining.push(result);
        
        this.DataTeacher.listTraining=[...this.DataTeacher.listTraining, ...this.DataTraining]
        
    });
  }
  RemoveExperience(row:Experience){
 
        this.DataExperience=[];
        this.DataExperience=this.DataTeacher.listExperience.filter(x=>x.experienceId!=row.experienceId)
        this.DataTeacher.listExperience=[...this.DataExperience]
        
  }
  Regresar(){
    this._nav.navigate(['/teaching-management/teacher-list/']);
  }
  

  
  createTeacherForm(): UntypedFormGroup{
    return this.fb.group({
      teacherId: new FormControl(this.DataTeacher.teacherId),
      cedula: new FormControl(this.DataTeacher?.cedula, [Validators.required]),
      name: new FormControl(this.DataTeacher?.name, [Validators.required]),
      lastName: new FormControl(this.DataTeacher?.lastName, [Validators.required]),
      placeOfBirth:[this.DataTeacher?.placeOfBirth,[Validators.required]],
      dateOfBirth:[this.DataTeacher?.dischargeDate],
      email: new FormControl(this.DataTeacher?.email, [Validators.required,Validators.email]),
      telephoneNumber:[this.DataTeacher?.phoneNumber,[Validators.required]],
      selected: new FormControl(this.DataTeacher?.selected),
      //dischargeDate: new FormControl(this.DataTeacher?.dischargeDate),
      placeResidence: new FormControl(this.DataTeacher?.placeResidence),
      listCourse: new FormControl(this.DataTeacher?.listCourse||[]),
      listTraining: new FormControl(this.DataTeacher?.listTraining||[]),
      listSpecialty: new FormControl(this.DataTeacher?.listSpecialty||[]),
      listExperience: new FormControl(this.DataTeacher?.listExperience||[]),
      listDocument: new FormControl(this.DataTeacher?.listDocument||[]),
      listActivity: new FormControl(this.DataTeacher?.listActivity||[]),
      listSubject: new FormControl(this.DataTeacher?.listSubject||[]),
      process: new FormControl(this.DataTeacher.process),
      createdBy: new FormControl(this.DataTeacher?.name)
     
    });
  }
  
  onFileSelected(event: any) {

    
     const file = event.target.files[0];
    const formdata=new FormData();

   formdata.append('FileDetails', file);
 
   
  
    
 this._teacherService.archivo(formdata).subscribe({
  next: () => {
   console.log("guardado");
  },
  error: () => {
  
  }
})
  }
  
  submit() {

  this.teacherForm?.get('listDocument')?.setValue(this.DataTeacher?.listDocument);
  this.teacherForm?.get('listExperience')?.setValue(this.DataTeacher?.listExperience);
  this.teacherForm?.get('listTraining')?.setValue(this.DataTeacher?.listTraining);
  this.teacherForm?.get('listDocument')?.setValue([]);
  this.teacherForm?.get('listSubject')?.setValue([]);

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
   
  }
  
  
  
  removeTraining(row: Training){
    this.DataTraining=[];
    this.DataTraining=this.DataTeacher.listTraining.filter(x=>x.trainingId!=row.trainingId)
    this.DataTeacher.listTraining=[...this.DataTraining]
    
  }
  
 

}

