import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { DetalleAcademico } from 'app/admission/models/DetalleAcademico';
import { DetalleExperiencia } from 'app/admission/models/DetalleExperiencia';
import { InscriptionService } from 'app/admission/inscription/services/inscription.service';
import Swal from "sweetalert2";
import { ResponseInscripcionEF } from "app/admission/models/InscripcionEFResponse";

import {
  MatDialog,
} from "@angular/material/dialog";
import { ResponseAddEFcademicInfo } from "app/admission/models/AddEFacademicResponse";
import { ResponseAddEFlaboralInfo } from "app/admission/models/AddEFlaboralResponse";
import { Requirement } from "app/admission/models/Requeriminet";
import { ResponseEF } from "app/admission/models/ResponseMessage";
import { InfoAcademicaComponent } from "app/external/Forms/info-academica/info-academica.component";
import { InfoLaboralComponent } from "app/external/Forms/info-laboral/info-laboral.component";
import { AuthService } from "@core";
import { MatStepper } from "@angular/material/stepper";
import { EnrollmentService } from 'app/enrollment/services/enrollment.service';
import { StudentModel } from 'app/enrollment/models/StudentModel';
import { HttpErrorResponse } from '@angular/common/http';



@Component({
  selector: 'app-backoffice-ef',
  templateUrl: './backoffice-ef.component.html',
  styleUrls: ['./backoffice-ef.component.scss']
})
export class BackofficeEFComponent implements OnInit {

  displayedColumns = [
    'name',
    'description',
    'statusId',
    'actions',
  ];

  InformacionAcademica: string[] = [
    'institucion',
    'programa',
    'titulo_obtenido',
    'year',
    'acciones',
  ];
  InformacionLaboral: string[] = [
    'entidad',
    'cargo',
    'periodo',
    'meses',
    'acciones',
  ];

  public DataAcademico: DetalleAcademico[] = [];
  public DataExperiencia: DetalleExperiencia[] = [];

  loading: boolean = false;
  personData: any;
  RequirementsDocumentsList: any;
  validsecondNext: boolean = false;
  validthirdNext: boolean = false;
  inscriptionId: string = "";
  aspirantId: string = "";
  loadingFile: boolean = false;
  disabled: boolean = false;
  tribunalReady: boolean = false;
  public cedulaParticipant: string = "";
  showTable: boolean = true;
  degreeId: number=0;

  Participant = {
    backOffice: 0,
    firstName: "",
    lastName: "",
    secondsurname: "",
    cedula: "",
    dateOfBirth: "",
    placeOfBirth: "",
    residentialAddress: "",
    telephoneNumber: "",
    email: "",
    degreeId: 0,
    observation: "",
    createdBy: ""
  };
  DocSustento: Requirement = {
    id: 3,
    name: "Documento de sustento",
    description: "Documento de sustento",
    statusId: 1
  }

  SourceAcademico = new MatTableDataSource<DetalleAcademico>(this.DataAcademico);
  SourceExperiencia = new MatTableDataSource<DetalleExperiencia>(this.DataExperiencia);
  public FormsEF: FormGroup;
  public FormsEFDocument: FormGroup;
  public id: string | null = "";
  public cedula: string | null = "";
  public DatosEstudianteResponse: StudentModel | undefined;

  @ViewChild(MatPaginator)
  set paginator(value: MatPaginator) {
    this.SourceAcademico.paginator = value;
  }

  @ViewChild('paginatorExperiencia')
  set paginatorExperiencia(value: MatPaginator) {
    this.SourceExperiencia.paginator = value;
  }

  constructor(private fb: FormBuilder,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar, private _inscriptionService: InscriptionService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    public elm: ElementRef,
    public _nav: Router,
    private enrollmentService: EnrollmentService) {

    this.FormsEF = this.fb.group({
      cedula: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      secondsurname: ['', [Validators.required]],
      placeOfBirth: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]],
      residentialAddress: ['', [Validators.required]],
      email: ['', [Validators.required]],
      telephoneNumber: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      bloodtype: ['', [Validators.required]],
      maritalStatus: ['', [Validators.required]],
      nameOfspouse: [''],
      numberofchildren: [''],
      caseOfemergency: ['', [Validators.required]],
      telephoneNumberEmergency: ['', [Validators.required]],
      specialCapacity: [false, [Validators.required]],
      visual: [false],
      auditory: [false],
      cognitive: [false],
      physical: [false],
      specific: [''],
      others: [''],
      usesAwheelchair: [false]
    })

    this.FormsEFDocument = this.fb.group({
      Photo: [''],
      CIP: [''],
      Title: [''],
      Credits: [''],
      Idoneidad: [''],
      LetterMotivation: [''],
      LetterAval: [''],
    })
  }


  ngOnInit(): void {

    this.SourceAcademico.paginator = this.paginator;
    this.SourceExperiencia.paginator = this.paginatorExperiencia;

    //ajuste para que haga la carga automática de los datos de inscripcion
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    this.FormsEF.controls["cedula"].setValue(this.authService.currentUserValue.cedula);
    this.FormsEF.controls["cedula"].disable();
    this.cedula = this.authService.currentUserValue.cedula;
    if(this.id != null)
      this.degreeId = parseInt(this.id)

    if (this.id != null) {
      this.showTable = false;
      this.getPersonData(this.cedula);
    }

  }


  addAspirantEF() {
    const jsonRequest = {
      backoffice: 0,
      firstName: this.FormsEF.value.firstName,
      lastName: this.FormsEF.value.lastName,
      secondsurname: this.FormsEF.value.secondsurname,
      cedula: this.FormsEF.value.cedula,
      dateOfBirth: this.FormsEF.value.dateOfBirth,
      placeOfBirth: this.FormsEF.value.placeOfBirth,
      residentialAddress: this.FormsEF.value.residentialAddress,
      telephoneNumber: this.FormsEF.value.telephoneNumber,
      email: this.FormsEF.value.email,
      degreeId: this.degreeId,
      gender: this.FormsEF.value.gender,
      bloodtype: this.FormsEF.value.bloodtype,
      maritalStatus: this.FormsEF.value.maritalStatus,
      nameOfspouse: this.FormsEF.value.nameOfspouse,
      numberofchildren: this.FormsEF.value.numberofchildren,
      caseOfemergency: this.FormsEF.value.caseOfemergency,
      telephoneNumberEmergency: this.FormsEF.value.telephoneNumberEmergency,
      specialCapacity: this.FormsEF.value.specialCapacity == "True",
      visual: this.FormsEF.value.visual == "True",
      auditory: this.FormsEF.value.auditory == "True",
      cognitive: this.FormsEF.value.cognitive == "True",
      physical: this.FormsEF.value.physical == "True",
      specific: this.FormsEF.value.specific,
      others: this.FormsEF.value.others,
      usesAwheelchair: this.FormsEF.value.usesAwheelchair == "True",
      observation:"",
      createdBy: this.authService.currentUserValue.id
    }

    this._inscriptionService.AddEFAspirant(jsonRequest).subscribe({
      next: (data: ResponseInscripcionEF) => {
        this._inscriptionService._ResponseInscripcionEF = data;
        if (!this._inscriptionService._ResponseInscripcionEF.isError) {
          this.inscriptionId = this._inscriptionService._ResponseInscripcionEF.inscriptionResponse[0].inscriptionId.toString();
          this.aspirantId = this._inscriptionService._ResponseInscripcionEF.inscriptionResponse[0].aspirantId.toString();
        }
        else {
          Swal.fire({
            title: "Escuela Judicial",
            text: 'Aspirante no fue creado correctamente.',
            icon: "warning"
          });
        }

      }
    })
  }

  addcademicInfo() {
    const jsonRequest = {
      aspirantId: this.aspirantId,
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

  addEFLaboralInfo() {
    const jsonRequest = {
      aspirantId: this.aspirantId,
      workExperience: {}
    }
    let pointer = 1;
    let jsonItem = "{";
    const length = this.DataExperiencia.length;
    this.DataExperiencia.forEach(function (value) {
      console.log(value);
      if (pointer != length) {
        jsonItem += `"additionalProp${pointer}":` + JSON.stringify(value) + ',';
      }
      else {
        jsonItem += `"additionalProp${pointer}":` + JSON.stringify(value);
      }
      pointer = pointer + 1;
    })
    jsonItem += "}";
    jsonRequest.workExperience = JSON.parse(jsonItem);
    this._inscriptionService.AddEFLaboralInfo(jsonRequest).subscribe({
      next: (data: ResponseAddEFlaboralInfo) => {
        this._inscriptionService._ResponseAddEFlaboralInfo = data;
        if (this._inscriptionService._ResponseAddEFlaboralInfo.isError) {
          Swal.fire({
            title: "Escuela Judicial",
            text: 'WorkExperience no fue creado correctamente.',
            icon: "warning"
          });
        }
      }
    })
  }

  onChangeFile(event: any, requerimentId: number, requirement: Requirement) {
    this.loadingFile = true;
    const files: FileList = event.target.files;
    console.log(requirement.name);
    const elementImg = this.elm.nativeElement.querySelector('#archivo_' + requerimentId);
    const elementText = this.elm.nativeElement.querySelector('#texto_' + requerimentId);

    if (files.length > 0) {
      var formdata = new FormData();
      formdata.append('cedula', this.FormsEF.value.cedula);
      formdata.append('FileType', requerimentId.toString());
      formdata.append('InscriptionId', this.inscriptionId.toString());
      formdata.append('File', files[0]);
      console.log(formdata);
      this._inscriptionService.CargaDocumentoEFRequirement(formdata).subscribe({
        next: (res: ResponseEF) => {
          Swal.fire({
            title: "Escuela Judicial",
            text: '(' + requirement.name + ') ' + res.message,
            icon: "success"
          });

          elementImg.value = '';
          elementText.innerHTML = '(' + requirement.name + ') ' + 'Cargado Correctamente.';
          this.loadingFile = false;
          // this.verificarDocumentacion();
        }, error: (err) => {
          elementImg.value = '';
          Swal.fire({
            title: "Escuela Judicial",
            text: 'Intente nuevamente..',
            icon: "warning"
          });
          this.loadingFile = false;
        }
      })
    }
  }

  getPersonData(cedula: string) {
    this.loading = false;
    this.disabled = true;

    if (!cedula) {

      Swal.fire({
        title: "Escuela Judicial",
        text: 'Por favor, ingrese una cédula',
        icon: "warning"
      });

    } else {
      this.loading = true;
      this.cedulaParticipant = cedula;

      this.enrollmentService.getStudentData(cedula).subscribe(
        {
          next: (request) => {
            this.DatosEstudianteResponse = request as StudentModel;
            if (this.DatosEstudianteResponse != undefined) {
              if (!this.DatosEstudianteResponse.isError) {
                this.loading = false;
                this.disabled = true;
                this.Participant.firstName = this.DatosEstudianteResponse.verifyUsersResult[0].firstName;
                this.Participant.lastName = this.DatosEstudianteResponse.verifyUsersResult[0].lastName;
                this.Participant.secondsurname = this.DatosEstudianteResponse.verifyUsersResult[0].secondsurname;

                if (this.DatosEstudianteResponse.verifyUsersResult[0].asp) {
                  this.Participant.placeOfBirth = this.DatosEstudianteResponse.verifyUsersResult[0].aspirant[0].placeOfBirth;
                  this.Participant.dateOfBirth = this.DatosEstudianteResponse.verifyUsersResult[0].aspirant[0].dateOfBirth;
                  this.Participant.residentialAddress = this.DatosEstudianteResponse.verifyUsersResult[0].aspirant[0].residentialAddress;
                  this.Participant.email = this.DatosEstudianteResponse.verifyUsersResult[0].email;
                  this.Participant.telephoneNumber = this.DatosEstudianteResponse.verifyUsersResult[0].aspirant[0].telephoneNumber;
                }

                this.tribunalReady = true;
                this.loading = false
              }
            }
          },
          error: (err: HttpErrorResponse) => {
            this.loading = false
            console.log(err);
          }
        }
      );

    }
  }

  submit() {
    Swal.fire({
      title: "Escuela Judicial",
      text: 'Registrado correctamente',
      icon: "success"
    });
    //redirecciona a matricula
    this._nav.navigate(["dashboard/dashboard-student"]);
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
      data: {},//{name: this.name, animal: this.animal},
    });

    dialogILRef.afterClosed().subscribe((result: DetalleExperiencia) => {
      console.log('The dialog was closed', result);
      if (result != null) {
        this.DataExperiencia.push(result);
        this.SourceExperiencia = new MatTableDataSource<DetalleExperiencia>(this.DataExperiencia);
      }

    });
  }

  deleteItemAC(row: any) {
    console.log(row);
    this.DataAcademico.splice(row, 1);
    this.SourceAcademico = new MatTableDataSource<DetalleAcademico>(this.DataAcademico);
  }

  deleteItemIL(row: any) {
    console.log(row);
    this.DataExperiencia.splice(row, 1);
    this.SourceExperiencia = new MatTableDataSource<DetalleExperiencia>(this.DataExperiencia);
  }

  getRequirementsDocuments(id: string) {
    this._inscriptionService.getRequirementsDocuments(id).subscribe({
      next: (data) => {
        this.RequirementsDocumentsList = data;
      }
    })

  }

  volverAtras() {
    this.showTable = true;
  }

  firstNext() {
    this.addAspirantEF();
    this.getRequirementsDocuments(this.degreeId.toString());
  }

  secondNext(stepper?: MatStepper) {
    if (this.DataAcademico.length > 0) {
      this.addcademicInfo();
      this.validsecondNext = true;
      stepper?.next();
    }
    else {
      Swal.fire({
        title: "Escuela Judicial",
        text: 'Debe ingresar al menos una informacion Academica.',
        icon: "warning"
      });
    }

  }

  thirdNext(stepper?: MatStepper) {
    if (this.DataExperiencia.length > 0) {
      this.addEFLaboralInfo();
      this.validthirdNext = true;
      stepper?.next();
    }
    else {
      Swal.fire({
        title: "Escuela Judicial",
        text: 'Debe ingresar al menos una Experiencia Laboral.',
        icon: "warning"
      });
    }
  }

}

