import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { ActivityDetailService } from 'app/admission/services/activity-detail.service';
import { Experience, Teacher, Training } from '../models/Teacher';
import { TeacherService } from '../services/teacher.service';
import Swal from 'sweetalert2';
import { MatAccordion } from '@angular/material/expansion';
import { MatDialog } from '@angular/material/dialog';
import { AddExperienceComponent } from '../add-experience/add-experience.component';
import { AddTrainingComponent } from '../add-training/add-training.component';




@Component({
  selector: 'app-teacher-detail',
  templateUrl: './teacher-detail.component.html',
  styleUrls: ['./teacher-detail.component.scss']
})
export class TeacherDetailComponent extends UnsubscribeOnDestroyAdapter
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
  

DataTeacher!:Teacher;
DataExperience:Experience[]= [];
DataTraining:Training[]= [];
cedula!:string;
fechaActual!: string;
fechaA: string | undefined;
header!: string;
experience?: Experience;
training?: Training;
_Form_Data = new FormData();
docForm!: UntypedFormGroup;


constructor( private activatedRoute: ActivatedRoute,
public _ActivityService: ActivityDetailService,
public _teacherService: TeacherService,
public _dialog: MatDialog,
private _nav:Router,
private fb: UntypedFormBuilder,
){
  super();
  
}

//@ViewChild(MatTable) DataTeacher:MatTable<Teacher>
@ViewChild(MatAccordion) accordion?: MatAccordion;
  async ngOnInit() {
    //this.DataTeacher=this.activatedRoute.snapshot.queryParams["cedula"];
    this.cedula=this.activatedRoute.snapshot.params["cedula"];
    this.DataTeacher=new Teacher();
    const fechaActual = new Date();
    this.fechaA=fechaActual.toLocaleDateString('es-PA');
    this.teacherForm = this.createTeacherForm();
    this.documentForm = this.createDocumentForm();
    this.header="Crear docente";
    if(this.cedula!="-1"){
     this.header="Detalle docente";
     await this.getTeacherByCedula();
    }
    this.documentForm= this.fb.group({
      Photo:new FormControl([this.DataTeacher.listDocument[0]?.docResult]),
      CIP:new FormControl([this.DataTeacher.listDocument[0]?.docResult]),
      Title:new FormControl(this.DataTeacher.listDocument[0]?.docResult),
      CV:new FormControl([]),
    });
   
    this.docForm= this.fb.group({
      FileDetails:new FormControl([]),
      FileType:new FormControl([]),
    });
   
  }
  
  
  async getTeacherByCedula() {
   this._teacherService.getTeacherByCedula(this.cedula).subscribe({
      next: (res) => {

        this.DataTeacher = res;
        this.fechaA=res.applicationDate;
        this.teacherForm = this.createTeacherForm();
        this.documentForm = this.createDocumentForm();
        console.log(this.documentForm.get("Photo")?.value);
        
        this._teacherService.isTblLoading = false;
      }
    })
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
  
//   this.FormsEFDocument=this.fb.group({
//     Photo:[''],
//     CIP:[''],
//     Title:[''],
//     Credits:[''],
//     Idoneidad:[''],
//     LetterMotivation:[''],
//     LetterAval:[''],
//  })
  
  createTeacherForm(): UntypedFormGroup{
    return this.fb.group({
      teacherId: new FormControl(0),
      cedula: new FormControl(this.DataTeacher?.cedula, [Validators.required]),
      name: new FormControl(this.DataTeacher?.name, [Validators.required]),
      lastName: new FormControl(this.DataTeacher?.lastName, [Validators.required]),
      email: new FormControl(this.DataTeacher?.email, [Validators.required,Validators.email]),
      selected: new FormControl(this.DataTeacher?.selected),
      //dischargeDate: new FormControl(this.DataTeacher?.dischargeDate),
      placeResidence: new FormControl(this.DataTeacher?.placeResidence),
      listCourse: new FormControl(this.DataTeacher?.listCourse||[]),
      listTraining: new FormControl(this.DataTeacher?.listTraining||[]),
      listSpecialty: new FormControl(this.DataTeacher?.listSpecialty||[]),
      listExperience: new FormControl(this.DataTeacher?.listExperience||[]),
      listDocument: new FormControl(this.DataTeacher?.listDocument||[]),
      process: new FormControl(1),
      createdBy: new FormControl(this.DataTeacher?.dischargeDate)
     
    });
  }
  
  onFileSelected(event: any) {

    
     const file = event.target.files[0];
  //   console.log(this.documentForm.getRawValue());
    const formdata=new FormData();
  //  const list: fileDetails[]=[];
  //   list[0].fileDetails=File1;
  //   list[0].fileType=1
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
    //const file=this.documentForm.get('CIP')?.value;
    console.log(this._Form_Data);
 
  this.teacherForm?.get('listDocument')?.setValue(this.DataTeacher?.listDocument);
  this.teacherForm?.get('listExperience')?.setValue(this.DataTeacher?.listExperience);
  this.teacherForm?.get('listTraining')?.setValue(this.DataTeacher?.listTraining);
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
  
  removeTraining(row: Training){
    this.DataTraining=[];
    this.DataTraining=this.DataTeacher.listTraining.filter(x=>x.trainingId!=row.trainingId)
    this.DataTeacher.listTraining=[...this.DataTraining]
    
  }
  
  createDocumentForm(): UntypedFormGroup {
    return this.fb.group({
      Photo:new FormControl([this.DataTeacher.listDocument[0]?.docResult]),
      CIP:new FormControl([this.DataTeacher.listDocument[0]?.docResult]),
      Title:new FormControl(this.DataTeacher.listDocument[0]?.docResult),
      CV:new FormControl([])
    });
  }


}
