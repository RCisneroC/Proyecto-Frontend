import { Component, OnInit, ViewChild,ChangeDetectorRef} from '@angular/core';
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
import {  DatePipe } from '@angular/common';
import { InscriptionService  } from 'app/admission/inscription/services/inscription.service';


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
UniversityList: any[] = [];
InstitutionList: any[] = [];
DependencyList: any[] = [];
OrganismoCopList: any[] = []
CargosList: any[] = [];
public DatosEstudianteResponse: StudentModel | undefined;

constructor( private activatedRoute: ActivatedRoute,
public _ActivityService: ActivityDetailService,
public _studentService: StudentService,
private authenticationService: AuthService,
public _dialog: MatDialog,
private _nav:Router,
private fb: UntypedFormBuilder,
public _verificarBS64: VerificarBS64Pipe,
private enrollmentService: EnrollmentService,
public datePipe:DatePipe,
private _inscriptionService:InscriptionService,
private cb: ChangeDetectorRef
){
  super();
}


  @ViewChild(MatAccordion) accordion?: MatAccordion;
  async ngOnInit() {
    this.user =this.authenticationService.currentUserValue;
    this.DataStudent=new Student();
    const fechaActual = new Date();
    this.fechaA=fechaActual.toLocaleDateString('es-PA');
    this.studentForm = this.createstudentFormAll();


    this.header = "Actualizar Datos";


    const cedula: string = this.authenticationService.currentUserValue.cedula;
    this.loadUniversidades();
    this.loadIntituciones();
    this.loadDependencias();
    this. loadOrganosCop();
    this.loadCargos();

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
                    this.studentForm.controls["gender"].patchValue(this.DatosEstudianteResponse.verifyUsersResult[0].aspirant[0].gender);
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
                    this.studentForm.controls["invitationDate"].patchValue(this.datePipe.transform(this.DatosEstudianteResponse.verifyUsersResult[0].participant[0].invitationDate,"dd/MM/yyyy"));
                  }
                        this.cb.detectChanges();
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

  createstudentFormAll(): UntypedFormGroup{

    return this.fb.group({
      //datos generales
      cedula: new FormControl(this.dataStudent?.cedula, [Validators.required]),
      name: new FormControl(this.dataStudent?.firstName, [Validators.required]),
      lastName: new FormControl(this.dataStudent?.lastName, [Validators.required]),
      placeOfBirth:[this.dataStudent?.placeOfBirth,[Validators.required]],
      dateOfBirth:[this.dataStudent?.dateOfBirth,[Validators.required]],
      email: new FormControl(this.dataStudent?.email, [Validators.required,Validators.email]),
      telephoneNumber:[this.dataStudent?.homePhoneNumber,[Validators.required]],
      placeResidence: new FormControl(this.dataStudent?.residentialAddress,Validators.required),
      //datos de aspirantes
      gender: new FormControl(this.dataStudent?.gender, Validators.required),
      maritalStatus: new FormControl(this.dataStudent?.maritalStatus,Validators.required),
      nameOfspouse: new FormControl(this.dataStudent?.nameOfspouse),
      numberofchildren: new FormControl(this.dataStudent?.numberofchildren),
      caseOfemergency: new FormControl(this.dataStudent?.caseOfemergency, Validators.required),
      telephoneNumberEmergency: new FormControl(this.dataStudent?.telephoneNumberEmergency,Validators.required),
      bloodtype: new FormControl(this.dataStudent?.bloodtype, Validators.required),
      specialCapacity: [false, [Validators.required]],
      visual: [false],
      auditory: [false],
      cognitive:[false],
      physical: [false],
      specific: [''],
      others: [''],
      usesAwheelchair: [false],
      //datos de participantes
      institution: new FormControl(this.dataStudent?.institution , Validators.required),
      university: new FormControl(this.dataStudent?.university , Validators.required),
      dependency: new FormControl(this.dataStudent?.dependency , Validators.required),
      cooperatingEntity: new FormControl(this.dataStudent?.cooperatingEntity , Validators.required),
      position: new FormControl(this.dataStudent?.position, Validators.required),
      province: new FormControl(this.dataStudent?.province, Validators.required),
      judicialDistrict:new FormControl(this.dataStudent?.judicialDistrict , Validators.required),
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

  if(!this.studentForm.valid){
    this.studentForm.markAsPristine();
    return;
  }

  if(this.aspirante && !this.participante){
    const data: any = {
      cedula: this.studentForm.controls["cedula"].value,
      phoneNumber: this.studentForm.controls["telephoneNumber"].value,
      homePhoneNumber: this.studentForm.controls["telephoneNumberEmergency"].value,
      email: this.studentForm.controls["email"].value,
      maritalStatus: this.studentForm.controls["maritalStatus"].value,
      nameOfspouse: this.studentForm.controls["nameOfspouse"].value,
      numberofchildren: this.studentForm.controls["numberofchildren"].value,
      caseOfemergency: this.studentForm.controls["caseOfemergency"].value,
      telephoneNumberEmergency: this.studentForm.controls["telephoneNumberEmergency"].value,
      degreeId: 0,
      dateOfBirth: this.studentForm.controls["dateOfBirth"].value,
      placeOfBirth: this.studentForm.controls["placeOfBirth"].value,
      residentialAddress: this.studentForm.controls["placeResidence"].value,
      bloodtype: this.studentForm.controls["bloodtype"].value,
      specialCapacity: this.studentForm.controls["specialCapacity"].value,
      visual: this.studentForm.controls["visual"].value,
      auditory: this.studentForm.controls["auditory"].value,
      cognitive: this.studentForm.controls["cognitive"].value,
      physical: this.studentForm.controls["physical"].value,
      specific: this.studentForm.controls["specific"].value,
      others: this.studentForm.controls["others"].value,
      usesAwheelchair: this.studentForm.controls["usesAwheelchair"].value
    };

    this._studentService.updateAspirantEF(data).subscribe({
      next : (request) =>{
        Swal.fire({
          title: "Escuela Judicial",
          text: request.message,
          icon: "success"
        });
      },
      error : (err:HttpErrorResponse) =>{
        console.log(err);
        Swal.fire({
          title: "Escuela Judicial",
          text: "No se pudo actualizar sus datos",
          icon: "warning"
        });
      }
    });
  }

  if(this.participante && !this.aspirante){
    const data: any = {
      cedula: this.studentForm.controls["cedula"].value,
      gender: this.studentForm.controls["gender"].value,
      institution: this.studentForm.controls["institution"].value,
      university: this.studentForm.controls["university"].value,
      dependency: this.studentForm.controls["dependency"].value,
      cooperatingEntity: this.studentForm.controls["cooperatingEntity"].value,
      position: this.studentForm.controls["position"].value,
      province: this.studentForm.controls["province"].value,
      judicialDistrict: this.studentForm.controls["judicialDistrict"].value,
      invitationDate: this.studentForm.controls["invitationDate"].value
    };
    this._studentService.updateParticipantEF(data).subscribe({
      next : (request) =>{
        Swal.fire({
          title: "Escuela Judicial",
          text: request.message,
          icon: "success"
        });
      },
      error : (err:HttpErrorResponse) =>{
        console.log(err);
        Swal.fire({
          title: "Escuela Judicial",
          text: "No se pudo actualizar sus datos",
          icon: "warning"
        });
      }
    });
  }

  if(this.participante && this.aspirante){
    const data: any = {
      cedula: this.studentForm.controls["cedula"].value,
      phoneNumber: this.studentForm.controls["telephoneNumber"].value,
      homePhoneNumber: this.studentForm.controls["telephoneNumberEmergency"].value,
      email: this.studentForm.controls["email"].value,
      maritalStatus: this.studentForm.controls["maritalStatus"].value,
      nameOfspouse: this.studentForm.controls["nameOfspouse"].value,
      numberofchildren: this.studentForm.controls["numberofchildren"].value,
      caseOfemergency: this.studentForm.controls["caseOfemergency"].value,
      telephoneNumberEmergency: this.studentForm.controls["telephoneNumberEmergency"].value,
      degreeId: 0,
      dateOfBirth: this.studentForm.controls["dateOfBirth"].value,
      placeOfBirth: this.studentForm.controls["placeOfBirth"].value,
      residentialAddress: this.studentForm.controls["placeResidence"].value,
      bloodtype: this.studentForm.controls["bloodtype"].value,
      specialCapacity: this.studentForm.controls["specialCapacity"].value,
      visual: this.studentForm.controls["visual"].value,
      auditory: this.studentForm.controls["auditory"].value,
      cognitive: this.studentForm.controls["cognitive"].value,
      physical: this.studentForm.controls["physical"].value,
      specific: this.studentForm.controls["specific"].value,
      others: this.studentForm.controls["others"].value,
      usesAwheelchair: this.studentForm.controls["usesAwheelchair"].value,
      gender: this.studentForm.controls["gender"].value,
      institution: this.studentForm.controls["institution"].value,
      university: this.studentForm.controls["university"].value,
      dependency: this.studentForm.controls["dependency"].value,
      cooperatingEntity: this.studentForm.controls["cooperatingEntity"].value,
      position: this.studentForm.controls["position"].value,
      province: this.studentForm.controls["province"].value,
      judicialDistrict: this.studentForm.controls["judicialDistrict"].value,
      invitationDate: this.studentForm.controls["invitationDate"].value
    };
    console.log(data)
    this._studentService.updateAspirantParticipantEF(data).subscribe({
      next : (request) =>{
        Swal.fire({
          title: "Escuela Judicial",
          text: request.message,
          icon: "success"
        });
      }
      ,error : (err:HttpErrorResponse) =>{
        console.log(err);
        Swal.fire({
          title: "Escuela Judicial",
          text: "No se pudo actualizar sus datos",
          icon: "warning"
        });
      }
    });
  }
  this.ngOnInit();
}

  AddTraining(){

  }

  removeTraining(row: Training) {
    this.DataTraining = [];
    this.DataTraining = this.DataStudent.listTraining.filter(x => x.trainingId != row.trainingId)
    this.DataStudent.listTraining = [...this.DataTraining]

  }

  loadExperience(){
    /*this.inscriptionService.GetExperienceInfoEF(this.authenticationService.currentUserValue.cedula).subscribe(
     {
      next: (request) =>{
        this.DataStudent.listExperience = request.experienceInfoResponse;

      }
     }
    );*/
  }

  loadIntituciones() {
    this._inscriptionService.getCatalogInstitucion().subscribe({
      next: (data) => {
        console.log("Datos de Instituciones", data);
        this.InstitutionList = data;
      }
    })
  }

  loadDependencias() {
    this._inscriptionService.getCatalogDependencia().subscribe({
      next: (data) => {
        console.log("Datos de Dependencias", data);
        this.DependencyList = data;
      }
    })
  }

  loadUniversidades() {
    this._inscriptionService.getCatalogUniversidades().subscribe({
      next: (data) => {
        console.log("Datos de Universidades", data);
        this.UniversityList = data;
      }
    })
  }

    loadOrganosCop() {
    this._inscriptionService.getCatalogOrganismosCoperantes().subscribe({
      next: (data) => {
        console.log("Datos de Organismos Coperantes", data);
        this.OrganismoCopList = data;
      }
    })
  }

   loadCargos() {
    this._inscriptionService.getCatalogCargos().subscribe({
      next: (data) => {
        console.log("Datos de cargos", data);
        this.CargosList = data;
      }
    })
  }

}

