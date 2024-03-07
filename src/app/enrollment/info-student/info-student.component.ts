import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import {  Documents, Experience, Student, StudentData, Training } from './models/Student';
import { RequiredDocument } from './models/RequiredDocument';
import { StudentService } from './services/student.service';
import { AddExperienceComponent } from './components/add-experience/add-experience.component';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '@core/models/user';
import { AuthService } from '@core/service/auth.service';
import { UnsubscribeOnDestroyAdapter } from '@shared/UnsubscribeOnDestroyAdapter';
import { ViewPosterPDFComponent } from 'app/admission/activitydetail/forms/view-poster-pdf/view-poster-pdf.component';
import { ViewPosterComponent } from 'app/admission/activitydetail/forms/view-poster/view-poster.component';
import { ActivityDetailService } from 'app/admission/services/activity-detail.service';
import { VerificarBS64Pipe } from 'app/pipes/verificar-bs64.pipe';
import { EnrollmentService } from 'app/enrollment/services/enrollment.service';
import { StudentModel } from 'app/enrollment/models/StudentModel';
import { HttpErrorResponse } from '@angular/common/http';


import { AddActivityComponent } from 'app/teaching-management/add-activity/add-activity.component';
import { AddSubjectComponent } from 'app/teaching-management/add-subject/add-subject.component';
import { AddTrainingComponent } from 'app/teaching-management/add-training/add-training.component';

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
dataStudent!:StudentData;

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
aspirante!: boolean;
participante!: boolean;
public DatosEstudianteResponse: StudentModel | undefined;

constructor( private activatedRoute: ActivatedRoute,
public _ActivityService: ActivityDetailService,
public _studentService: StudentService,
private authenticationService: AuthService,
public _dialog: MatDialog,
private _nav:Router,
private fb: UntypedFormBuilder,
public _verificarBS64: VerificarBS64Pipe,
private enrollmentService: EnrollmentService
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
    this.studentForm = this.createstudentFormAll();



    this.header = "Actualizar Datos";


    const cedula: string = this.authenticationService.currentUserValue.cedula;
    this.getPersonData(cedula);

    this.docForm= this.fb.group({
      FileDetails:new FormControl([]),
      FileType:new FormControl([]),
    });

  }

  getPersonData(cedula: string) {

    if (!cedula) {

      Swal.fire({
        title: "Escuela Judicial",
        text: 'Por favor, ingrese una cédula',
        icon: "warning"
      });

    } else {

      this.enrollmentService.getStudentData(cedula).subscribe(
        {
              next : (request) =>{
                this.DatosEstudianteResponse = request as StudentModel;
                if(this.DatosEstudianteResponse != undefined){
                  if(!this.DatosEstudianteResponse.isError){
                   this.aspirante = this.DatosEstudianteResponse.verifyUsersResult[0].asp;
                   this.participante = this.DatosEstudianteResponse.verifyUsersResult[0].part;

                   this.studentForm.controls["cedula"].patchValue(this.DatosEstudianteResponse.verifyUsersResult[0].cedula);
                   this.studentForm.controls["name"].patchValue(this.DatosEstudianteResponse.verifyUsersResult[0].firstName);
                   this.studentForm.controls["lastName"].patchValue(this.DatosEstudianteResponse.verifyUsersResult[0].lastName);
                   this.studentForm.controls["email"].patchValue(this.DatosEstudianteResponse.verifyUsersResult[0].email);

                   if(this.aspirante){
                    this.studentForm.controls["telephoneNumber"].patchValue(this.DatosEstudianteResponse.verifyUsersResult[0].aspirant[0].telephoneNumber);
                    this.studentForm.controls["placeOfBirth"].patchValue(this.DatosEstudianteResponse.verifyUsersResult[0].aspirant[0].placeOfBirth);
                    this.studentForm.controls["dateOfBirth"].patchValue(this.DatosEstudianteResponse.verifyUsersResult[0].aspirant[0].dateOfBirth);
                    this.studentForm.controls["placeResidence"].patchValue(this.DatosEstudianteResponse.verifyUsersResult[0].aspirant[0].residentialAddress);
                    this.studentForm.controls["phoneNumber"].patchValue(this.DatosEstudianteResponse.verifyUsersResult[0].aspirant[0].homePhoneNumber);
                    this.studentForm.controls["maritalStatus"].patchValue(this.DatosEstudianteResponse.verifyUsersResult[0].aspirant[0].maritalStatus);
                    this.studentForm.controls["nameOfspouse"].patchValue(this.DatosEstudianteResponse.verifyUsersResult[0].aspirant[0].nameOfspouse);
                    this.studentForm.controls["numberofchildren"].patchValue(this.DatosEstudianteResponse.verifyUsersResult[0].aspirant[0].numberofchildren);
                    this.studentForm.controls["caseOfemergency"].patchValue(this.DatosEstudianteResponse.verifyUsersResult[0].aspirant[0].caseOfemergency);
                    this.studentForm.controls["telephoneNumberEmergency"].patchValue(this.DatosEstudianteResponse.verifyUsersResult[0].aspirant[0].telephoneNumberEmergency);
                    this.studentForm.controls["bloodtype"].patchValue(this.DatosEstudianteResponse.verifyUsersResult[0].aspirant[0].bloodtype);
                    this.studentForm.controls["specialCapacity"].patchValue(this.DatosEstudianteResponse.verifyUsersResult[0].aspirant[0].specialCapacity);
                    this.studentForm.controls["visual"].patchValue(this.DatosEstudianteResponse.verifyUsersResult[0].aspirant[0].visual);
                    this.studentForm.controls["auditory"].patchValue(this.DatosEstudianteResponse.verifyUsersResult[0].aspirant[0].auditory);
                    this.studentForm.controls["cognitive"].patchValue(this.DatosEstudianteResponse.verifyUsersResult[0].aspirant[0].cognitive);
                    this.studentForm.controls["physical"].patchValue(this.DatosEstudianteResponse.verifyUsersResult[0].aspirant[0].physical);
                    this.studentForm.controls["specific"].patchValue(this.DatosEstudianteResponse.verifyUsersResult[0].aspirant[0].specific);
                    this.studentForm.controls["others"].patchValue(this.DatosEstudianteResponse.verifyUsersResult[0].aspirant[0].others);
                    this.studentForm.controls["usesAwheelchair"].patchValue(this.DatosEstudianteResponse.verifyUsersResult[0].aspirant[0].usesAwheelchair);
                  }

                  if(this.participante){
                    this.studentForm.controls["institution"].patchValue(this.DatosEstudianteResponse.verifyUsersResult[0].participant[0].institution);
                    this.studentForm.controls["university"].patchValue(this.DatosEstudianteResponse.verifyUsersResult[0].participant[0].university);
                    this.studentForm.controls["dependency"].patchValue(this.DatosEstudianteResponse.verifyUsersResult[0].participant[0].dependency);
                    this.studentForm.controls["cooperatingEntity"].patchValue(this.DatosEstudianteResponse.verifyUsersResult[0].participant[0].cooperatingEntity);
                    this.studentForm.controls["position"].patchValue(this.DatosEstudianteResponse.verifyUsersResult[0].participant[0].position);
                    this.studentForm.controls["province"].patchValue(this.DatosEstudianteResponse.verifyUsersResult[0].participant[0].province);
                    this.studentForm.controls["judicialDistrict"].patchValue(this.DatosEstudianteResponse.verifyUsersResult[0].participant[0].judicialDistrict);
                    this.studentForm.controls["invitationDate"].patchValue(this.DatosEstudianteResponse.verifyUsersResult[0].participant[0].invitationDate);
                  }

                  }
                }
              },
              error : (err:HttpErrorResponse) =>{

                  console.log(err);
              }
        }
      );

    }
  }

  async getRequiredDocuments() {
    this._studentService.getRequiredDocument().subscribe({
       next: (res) => {

        this.DataDocument = res;

      }
    })
  }

  GetName(type: number) {

    return this.DataDocument.find(x => x.documentId === type)?.name
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
        width: '1000px',
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
    dialogRef.afterClosed().subscribe((result: Experience) => {
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
  Regresar() {
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





  createstudentFormAll(): UntypedFormGroup{

    return this.fb.group({
      //datos generales
      cedula: new FormControl(this.dataStudent?.cedula, [Validators.required]),
      name: new FormControl(this.dataStudent?.firstName, [Validators.required]),
      lastName: new FormControl(this.dataStudent?.lastName, [Validators.required]),
      placeOfBirth:[this.dataStudent?.placeOfBirth,[Validators.required]],
      dateOfBirth:[this.dataStudent?.dateOfBirth],
      email: new FormControl(this.dataStudent?.email, [Validators.required,Validators.email]),
      telephoneNumber:[this.dataStudent?.homePhoneNumber,[Validators.required]],
      placeResidence: new FormControl(this.dataStudent?.residentialAddress),
      //datos de aspirantes
      phoneNumber: new FormControl(this.dataStudent?.telephoneNumber),
      maritalStatus: new FormControl(this.dataStudent?.maritalStatus),
      nameOfspouse: new FormControl(this.dataStudent?.nameOfspouse),
      numberofchildren: new FormControl(this.dataStudent?.numberofchildren),
      caseOfemergency: new FormControl(this.dataStudent?.caseOfemergency),
      telephoneNumberEmergency: new FormControl(this.dataStudent?.telephoneNumberEmergency),
      bloodtype: new FormControl(this.dataStudent?.bloodtype),
      specialCapacity: [false, [Validators.required]],
      visual: [false],
      auditory: [false],
      cognitive:[false],
      physical: [false],
      specific: [''],
      others: [''],
      usesAwheelchair: [false],
      //datos de participantes
      institution: new FormControl(this.dataStudent?.institution),
      university: new FormControl(this.dataStudent?.university),
      dependency: new FormControl(this.dataStudent?.dependency),
      cooperatingEntity: new FormControl(this.dataStudent?.cooperatingEntity),
      position: new FormControl(this.dataStudent?.position),
      province: new FormControl(this.dataStudent?.province),
      judicialDistrict:new FormControl(this.dataStudent?.judicialDistrict),
      invitationDate: new FormControl(this.dataStudent?.invitationDate),
      listTraining: new FormControl(this.DataStudent?.listTraining||[]),
      listExperience: new FormControl(this.DataStudent?.listExperience||[])
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

  AddTraining(){

  }

  removeTraining(row: Training) {
    this.DataTraining = [];
    this.DataTraining = this.DataStudent.listTraining.filter(x => x.trainingId != row.trainingId)
    this.DataStudent.listTraining = [...this.DataTraining]

  }


}

