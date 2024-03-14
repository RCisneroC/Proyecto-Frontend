import { Component, OnInit, ViewChild, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Documents, Experience, Student, StudentData, Training } from './models/Student';
import { RequiredDocument } from './models/RequiredDocument';
import { StudentService } from './services/student.service';
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
import { DatePipe } from '@angular/common';
import { InscriptionService } from 'app/admission/inscription/services/inscription.service';
import { DetalleAcademico } from 'app/admission/models/DetalleAcademico';
import { ResponseModifyStudent } from 'app/admission/models/InscripcionEFResponse';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { InfoAcademicaComponent } from 'app/external/Forms/info-academica/info-academica.component';
import { ResponseAddEFcademicInfo } from 'app/admission/models/AddEFacademicResponse';
import { InfoLaboralComponent } from 'app/external/Forms/info-laboral/info-laboral.component';


@Component({
  selector: 'app-info-student',
  templateUrl: './info-student.component.html',
  styleUrls: ['./info-student.component.scss']
})
export class InfoStudentComponent extends UnsubscribeOnDestroyAdapter implements OnInit, AfterViewInit {

  studentForm!: UntypedFormGroup;
  documentForm!: UntypedFormGroup;

  displayedColumnsExperience = [
    'entidad',
    'cargo',
    'periodo',
    'meses',
    'actions'
  ];


  displayedColumnsDoc = [
    'docType',
    'extension',
    'docResult',

  ];

  InformacionAcademica: string[] = [
    'institucion',
    'programa',
    'titulo_obtenido',
    'year',
    'acciones',
  ];


  DataStudent!: Student;
  DataDocument: RequiredDocument[] = [];
  cedula!: string;
  fechaActual!: string;
  fechaA: string | undefined;
  header!: string;
  public DataAcademico: DetalleAcademico[] = [];
  _Form_Data = new FormData();
  docForm!: UntypedFormGroup;
  user!: User;
  aspirante!: boolean;
  participante!: boolean;
  UniversityList: any[] = [];
  InstitutionList: any[] = [];
  DependencyList: any[] = [];
  OrganismoCopList: any[] = []
  CargosList: any[] = [];
  public DatosEstudianteResponse: StudentModel | undefined;

  SourceAcademico = new MatTableDataSource<DetalleAcademico>(this.DataAcademico);

  @ViewChild(MatPaginator)
  set paginator(value: MatPaginator) {
    this.SourceAcademico.paginator = value;
  }


  constructor(private activatedRoute: ActivatedRoute,
    public _ActivityService: ActivityDetailService,
    public _studentService: StudentService,
    private authenticationService: AuthService,
    public _dialog: MatDialog,
    private _nav: Router,
    private fb: UntypedFormBuilder,
    public _verificarBS64: VerificarBS64Pipe,
    private enrollmentService: EnrollmentService,
    public datePipe: DatePipe,
    private _inscriptionService: InscriptionService,
    private cb: ChangeDetectorRef,
    public dialog: MatDialog
  ) {
    super();
    this.studentForm = this.createstudentFormAll();
  }

  ngAfterViewInit(): void {

    console.log("ngAfterViewIn")
  }


  @ViewChild(MatAccordion) accordion?: MatAccordion;
  async ngOnInit() {
    this.user = this.authenticationService.currentUserValue;
    this.DataStudent = new Student();
    const fechaActual = new Date();
    this.fechaA = fechaActual.toLocaleDateString('es-PA');
    this.header = "Actualizar Datos";
    const cedula: string = this.authenticationService.currentUserValue.cedula;
    this.loadUniversidades();
    this.loadIntituciones();
    this.loadDependencias();
    this.loadOrganosCop();
    this.loadCargos();
    this.getPersonData(cedula);
    this.loadAcademicInfo();
    this.loadExperience();
    this.docForm = this.fb.group({
      FileDetails: new FormControl([]),
      FileType: new FormControl([]),
    });
    this.SourceAcademico.paginator = this.paginator;
  }

  SetValidator(): void {

    this.studentForm.controls["telephoneNumberEmergency"].clearAsyncValidators();
    this.studentForm.controls["maritalStatus"].clearAsyncValidators();
    this.studentForm.controls["caseOfemergency"].clearAsyncValidators();
    this.studentForm.controls["telephoneNumberEmergency"].clearAsyncValidators();
    this.studentForm.controls["dateOfBirth"].clearAsyncValidators();
    this.studentForm.controls["placeOfBirth"].clearAsyncValidators();
    this.studentForm.controls["placeResidence"].clearAsyncValidators();
    this.studentForm.controls["bloodtype"].clearAsyncValidators();
    this.studentForm.controls["specialCapacity"].clearAsyncValidators();

    this.studentForm.controls["telephoneNumberEmergency"].updateValueAndValidity();
    this.studentForm.controls["maritalStatus"].updateValueAndValidity();
    this.studentForm.controls["caseOfemergency"].updateValueAndValidity();
    this.studentForm.controls["telephoneNumberEmergency"].updateValueAndValidity();
    this.studentForm.controls["dateOfBirth"].updateValueAndValidity();
    this.studentForm.controls["placeOfBirth"].updateValueAndValidity();
    this.studentForm.controls["placeResidence"].updateValueAndValidity();
    this.studentForm.controls["bloodtype"].updateValueAndValidity();
    this.studentForm.controls["specialCapacity"].updateValueAndValidity();

    this.studentForm.controls["gender"].clearAsyncValidators();
    this.studentForm.controls["institution"].clearAsyncValidators();
    this.studentForm.get("university")?.clearAsyncValidators();
    this.studentForm.controls["dependency"].clearAsyncValidators();
    this.studentForm.controls["cooperatingEntity"].removeValidators([Validators.required]);
    this.studentForm.controls["position"].clearAsyncValidators();
    this.studentForm.controls["province"].clearAsyncValidators();
    this.studentForm.controls["judicialDistrict"].clearAsyncValidators();
    this.studentForm.controls["invitationDate"].clearAsyncValidators();

    this.studentForm.controls["gender"].updateValueAndValidity();
    this.studentForm.controls["institution"].updateValueAndValidity();
    this.studentForm.controls["university"].updateValueAndValidity();
    this.studentForm.controls["dependency"].updateValueAndValidity();
    this.studentForm.controls["cooperatingEntity"].updateValueAndValidity();
    this.studentForm.controls["position"].updateValueAndValidity();
    this.studentForm.controls["province"].updateValueAndValidity();
    this.studentForm.controls["judicialDistrict"].updateValueAndValidity();
    this.studentForm.controls["invitationDate"].updateValueAndValidity();


    if (this.aspirante) {
      this.studentForm.controls["telephoneNumberEmergency"].setValidators([Validators.required]);
      this.studentForm.controls["maritalStatus"].setValidators([Validators.required]);
      this.studentForm.controls["caseOfemergency"].setValidators([Validators.required]);
      this.studentForm.controls["telephoneNumberEmergency"].setValidators([Validators.required]);
      this.studentForm.controls["dateOfBirth"].setValidators([Validators.required]);
      this.studentForm.controls["placeOfBirth"].setValidators([Validators.required]);
      this.studentForm.controls["placeResidence"].setValidators([Validators.required]);
      this.studentForm.controls["bloodtype"].setValidators([Validators.required]);
      this.studentForm.controls["specialCapacity"].setValidators([Validators.required]);

      this.studentForm.controls["telephoneNumberEmergency"].updateValueAndValidity();
      this.studentForm.controls["maritalStatus"].updateValueAndValidity();
      this.studentForm.controls["nameOfspouse"].updateValueAndValidity();
      this.studentForm.controls["numberofchildren"].updateValueAndValidity();
      this.studentForm.controls["caseOfemergency"].updateValueAndValidity();
      this.studentForm.controls["telephoneNumberEmergency"].updateValueAndValidity();
      this.studentForm.controls["dateOfBirth"].updateValueAndValidity();
      this.studentForm.controls["placeOfBirth"].updateValueAndValidity();
      this.studentForm.controls["placeResidence"].updateValueAndValidity();
      this.studentForm.controls["bloodtype"].updateValueAndValidity();
      this.studentForm.controls["specialCapacity"].updateValueAndValidity();
    }

    if (this.participante) {
      this.studentForm.controls["gender"].setValidators([Validators.required]);
      this.studentForm.controls["institution"].setValidators([Validators.required]);
      this.studentForm.controls["university"].setValidators([Validators.required]);
      this.studentForm.controls["dependency"].setValidators([Validators.required]);
      this.studentForm.controls["cooperatingEntity"].setValidators([Validators.required]);
      this.studentForm.controls["position"].setValidators([Validators.required]);
      this.studentForm.controls["province"].setValidators([Validators.required]);
      this.studentForm.controls["judicialDistrict"].setValidators([Validators.required]);
      this.studentForm.controls["invitationDate"].setValidators([Validators.required]);

      this.studentForm.controls["gender"].updateValueAndValidity();
      this.studentForm.controls["institution"].updateValueAndValidity();
      this.studentForm.controls["university"].markAsDirty();
      this.studentForm.controls["university"].updateValueAndValidity();
      this.studentForm.controls["dependency"].updateValueAndValidity();
      this.studentForm.controls["cooperatingEntity"].updateValueAndValidity();
      this.studentForm.controls["position"].updateValueAndValidity();
      this.studentForm.controls["province"].updateValueAndValidity();
      this.studentForm.controls["judicialDistrict"].updateValueAndValidity();
      this.studentForm.controls["invitationDate"].updateValueAndValidity();
    }

    this.studentForm.markAsPristine();

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
          next: (request) => {
            this.DatosEstudianteResponse = request as StudentModel;
            if (this.DatosEstudianteResponse != undefined) {
              if (!this.DatosEstudianteResponse.isError) {
                this.aspirante = this.DatosEstudianteResponse.verifyUsersResult[0].asp;
                this.participante = this.DatosEstudianteResponse.verifyUsersResult[0].part;
                this.studentForm.controls["cedula"].patchValue(this.DatosEstudianteResponse.verifyUsersResult[0].cedula);
                this.studentForm.controls["name"].patchValue(this.DatosEstudianteResponse.verifyUsersResult[0].firstName);
                this.studentForm.controls["lastName"].patchValue(this.DatosEstudianteResponse.verifyUsersResult[0].lastName);
                this.studentForm.controls["email"].patchValue(this.DatosEstudianteResponse.verifyUsersResult[0].email);

                if (this.aspirante) {
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

                  if (this.DatosEstudianteResponse.verifyUsersResult[0].aspirant[0].specialCapacity)
                    this.studentForm.controls["specialCapacity"].patchValue("True");
                  else
                    this.studentForm.controls["specialCapacity"].patchValue("False");

                  if (this.DatosEstudianteResponse.verifyUsersResult[0].aspirant[0].visual)
                    this.studentForm.controls["visual"].patchValue("True");
                  else
                    this.studentForm.controls["visual"].patchValue("False");

                  if (this.DatosEstudianteResponse.verifyUsersResult[0].aspirant[0].auditory)
                    this.studentForm.controls["auditory"].patchValue("True");
                  else
                    this.studentForm.controls["auditory"].patchValue("False");

                  if (this.DatosEstudianteResponse.verifyUsersResult[0].aspirant[0].auditory)
                    this.studentForm.controls["cognitive"].patchValue("True");
                  else
                    this.studentForm.controls["cognitive"].patchValue("False");

                  if (this.DatosEstudianteResponse.verifyUsersResult[0].aspirant[0].auditory)
                    this.studentForm.controls["physical"].patchValue("True");
                  else
                    this.studentForm.controls["physical"].patchValue("False");


                  if (this.DatosEstudianteResponse.verifyUsersResult[0].aspirant[0].auditory)
                    this.studentForm.controls["usesAwheelchair"].patchValue("True");
                  else
                    this.studentForm.controls["usesAwheelchair"].patchValue("False");

                  this.studentForm.controls["specific"].patchValue(this.DatosEstudianteResponse.verifyUsersResult[0].aspirant[0].specific);
                  this.studentForm.controls["others"].patchValue(this.DatosEstudianteResponse.verifyUsersResult[0].aspirant[0].others);

                }

                if (this.participante) {
                  this.studentForm.controls["institution"].patchValue(this.DatosEstudianteResponse.verifyUsersResult[0].participant[0].institution);
                  this.studentForm.controls["university"].patchValue(this.DatosEstudianteResponse.verifyUsersResult[0].participant[0].university);
                  this.studentForm.controls["gender"].patchValue(this.DatosEstudianteResponse.verifyUsersResult[0].participant[0].gender);
                  this.studentForm.controls["dependency"].patchValue(this.DatosEstudianteResponse.verifyUsersResult[0].participant[0].dependency);
                  this.studentForm.controls["cooperatingEntity"].patchValue(this.DatosEstudianteResponse.verifyUsersResult[0].participant[0].cooperatingEntity);
                  this.studentForm.controls["position"].patchValue(this.DatosEstudianteResponse.verifyUsersResult[0].participant[0].position);
                  this.studentForm.controls["province"].patchValue(this.DatosEstudianteResponse.verifyUsersResult[0].participant[0].province);
                  this.studentForm.controls["judicialDistrict"].patchValue(this.DatosEstudianteResponse.verifyUsersResult[0].participant[0].judicialDistrict);
                  this.studentForm.controls["invitationDate"].patchValue(this.datePipe.transform(this.DatosEstudianteResponse.verifyUsersResult[0].participant[0].invitationDate, "dd/MM/yyyy"));
                }
                this.SetValidator();
                this.cb.detectChanges();
              }
            }
          },
          error: (err: HttpErrorResponse) => {
            this.SetValidator();
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


  RemoveExperience(row: Experience) {

   // this.DataExperience = [];
    //this.DataExperience = this.DataStudent.listExperience.filter(x => x.experienceId != row.experienceId)
    //this.DataStudent.listExperience = [...this.DataExperience]

  }

  createstudentFormAll(): UntypedFormGroup {
    return this.fb.group({
      //datos generales
      cedula: new FormControl(""),
      name: new FormControl(""),
      lastName: new FormControl(""),
      placeOfBirth: [""],
      dateOfBirth: [""],
      email: new FormControl("", [Validators.email]),
      telephoneNumber: [""],
      placeResidence: new FormControl(""),
      //datos de aspirantes
      gender: new FormControl(""),
      maritalStatus: new FormControl(""),
      nameOfspouse: new FormControl(""),
      numberofchildren: new FormControl(""),
      caseOfemergency: new FormControl(""),
      telephoneNumberEmergency: new FormControl(""),
      bloodtype: new FormControl(""),
      specialCapacity: [],
      visual: [],
      auditory: [],
      cognitive: [],
      physical: [],
      specific: [''],
      others: [''],
      usesAwheelchair: [],
      //datos de participantes
      institution: new FormControl(""),
      university: new FormControl(""),
      dependency: new FormControl(""),
      cooperatingEntity: new FormControl(""),
      position: new FormControl(""),
      province: new FormControl(""),
      judicialDistrict: new FormControl(""),
      invitationDate: new FormControl("")
    });
  }


  public onFileSelected(event: any): void {
    const file = event.target.files[0];
    const formdata = new FormData();
    formdata.append('FileDetails', file);
    this._studentService.archivo(formdata).subscribe({
      next: () => {
        console.log("guardado");
      },
      error: () => {

      }
    })
  }

  public async submit() {

    this.studentForm?.get('listDocument')?.setValue(this.DataStudent?.listDocument);
    this.studentForm?.get('listExperience')?.setValue(this.DataStudent?.listExperience);
    this.studentForm?.get('listTraining')?.setValue(this.DataStudent?.listTraining);



    let isError: boolean = false;


    if (!this.studentForm.valid) {
      this.studentForm.markAsPristine();
      return;
    }

    if (this.aspirante) {

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
        specialCapacity: this.studentForm.controls["specialCapacity"].value == "True" ? true : false,
        visual: this.studentForm.controls["visual"].value == "True" ? true : false,
        auditory: this.studentForm.controls["auditory"].value == "True" ? true : false,
        cognitive: this.studentForm.controls["cognitive"].value == "True" ? true : false,
        physical: this.studentForm.controls["physical"].value == "True" ? true : false,
        specific: this.studentForm.controls["specific"].value,
        others: this.studentForm.controls["others"].value,
        usesAwheelchair: this.studentForm.controls["usesAwheelchair"].value == "True" ? true : false
      };

      await (await this._studentService.updateAspirantEF(data)).subscribe({
        next: async (request: ResponseModifyStudent) => {
          console.log(request)
          await this.mensajeSubmit(false, "Se actualizaron sus datos");
        },
        error: async (err: HttpErrorResponse) => {
          console.log(err.error);
          isError = true;
          await this.mensajeSubmit(isError, "");
        }
      });
    }

    if (this.participante) {
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
        invitationDate: this.datePipe.transform(this.studentForm.controls["invitationDate"].value, "yyyy-MM-dd")
      };
      await (await this._studentService.updateParticipantEF(data)).subscribe({
        next: async (request: ResponseModifyStudent) => {
          console.log(request)
          await this.mensajeSubmit(false, "Se actualizaron sus datos");
        },
        error: async (err: HttpErrorResponse) => {
          console.log(err.error);
          isError = true;
          await this.mensajeSubmit(isError, "");
        }
      });
    }
  }

  async mensajeSubmit(error: boolean, mensaje: string) {
    if (error) {
      Swal.fire({
        title: "Escuela Judicial",
        text: "No se pudo actualizar sus datos",
        icon: "warning"
      });
    }
    else {
      Swal.fire({
        title: "Escuela Judicial",
        text: mensaje,
        icon: "success"
      });
      this.ngOnInit();
    }
  }



  loadExperience() {
    this._inscriptionService.GetExperienceInfoEF(this.authenticationService.currentUserValue.cedula).subscribe(
     {
      next: (request) =>{
        console.log(request.experienceInfoResponse)
        this.DataStudent.listExperience = request.experienceInfoResponse;
      }
     }
    );
  }


  loadAcademicInfo(){
    this._inscriptionService.GetAcadInfoEF(this.authenticationService.currentUserValue.cedula).subscribe(
      {
       next: (request) =>{
         this.DataAcademico = request.inscriptionResponse;
         this.SourceAcademico = new MatTableDataSource<DetalleAcademico>(this.DataAcademico);
       }
      }
     );
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

  limpiarCasmposSpecialCapacity(){
    if(this.studentForm.controls["specialCapacity"].value == "False"){
      this.studentForm.controls["visual"].patchValue("False");
      this.studentForm.controls["auditory"].patchValue("False")
        this.studentForm.controls["cognitive"].patchValue("False")
        this.studentForm.controls["physical"].patchValue("False")
       this.studentForm.controls["specific"].patchValue("")
        this.studentForm.controls["others"].patchValue("")
       this.studentForm.controls["usesAwheelchair"].patchValue("False")
    }
  }


  // INFORMACION ACADEMICA
  addcademicInfo() {
    const jsonRequest = {
      aspirantId:  1,//this.aspirantId,
      academicInformation: {}
    }
    let pointer = 1;
    let jsonItem = "{";
    const length = this.DataAcademico.length;
    this.DataAcademico.forEach(function (value) {
      if (pointer != length) {
        jsonItem += `"additionalProp${pointer}":` + JSON.stringify(value) + ',';
      }
      else {
        jsonItem += `"additionalProp${pointer}":` + JSON.stringify(value);
      }
      pointer = pointer + 1;
    })
    jsonItem += "}";
    jsonRequest.academicInformation = JSON.parse(jsonItem);

    this._inscriptionService.AddEFAcademicInfo(jsonRequest).subscribe({
      next: (data: ResponseAddEFcademicInfo) => {
        this._inscriptionService._ResponseAddEFcademicInfo = data;
        if (this._inscriptionService._ResponseAddEFcademicInfo.isError) {
          Swal.fire({
            title: "Escuela Judicial",
            text: 'Academic no fue creado correctamente.',
            icon: "warning"
          });
        }
      }
    })
  }


openDialogAC(): void {
    const dialogACRef = this.dialog.open(InfoAcademicaComponent, {
      data: {},
    });

    dialogACRef.afterClosed().subscribe((result: DetalleAcademico) => {
      if (result != null) {
        this.DataAcademico.push(result);
        this.SourceAcademico = new MatTableDataSource<DetalleAcademico>(this.DataAcademico);
      }
    });
  }

  openDialogIL(): void {
    const dialogILRef = this.dialog.open(InfoLaboralComponent, {
      data: {},
    });
  }

 deleteItemAC(row: any) {
    console.log(row);
    this.DataAcademico.splice(row, 1);
    this.SourceAcademico = new MatTableDataSource<DetalleAcademico>(this.DataAcademico);
  }


}

