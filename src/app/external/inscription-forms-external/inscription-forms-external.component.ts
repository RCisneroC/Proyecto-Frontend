import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { InscriptionService } from 'app/admission/inscription/services/inscription.service';
import Swal from 'sweetalert2';
import { MatTableDataSource } from "@angular/material/table";
import { DetalleAcademico, DetalleAcademicoExt } from "../../admission/models/DetalleAcademico";
import { DetalleExperiencia, DetalleExperienciaExt, } from "../../admission/models/DetalleExperiencia";
import { MatPaginator } from "@angular/material/paginator";
import { InfoAcademicaComponent } from "../Forms/info-academica/info-academica.component";
import { InfoLaboralComponent } from "../Forms/info-laboral/info-laboral.component";
import { MatDialog } from "@angular/material/dialog";
import { Requirement } from "../../admission/models/Requeriminet";
import { ResponseEF } from "../../admission/models/ResponseMessage";
import { ResponseInscripcionEF } from "../../admission/models/InscripcionEFResponse";
import { AuthService } from "@core";
import { ResponseAddEFcademicInfo } from "../../admission/models/AddEFacademicResponse";
import { ResponseAddEFlaboralInfo } from "../../admission/models/AddEFlaboralResponse";
import { el } from "@fullcalendar/core/internal-common";
import { MatStepper } from "@angular/material/stepper";

@Component({
  selector: 'app-inscription-forms-external',
  templateUrl: './inscription-forms-external.component.html',
  styleUrls: ['./inscription-forms-external.component.scss']
})
export class InscriptionFormsExternalComponent {
  shortLink: string = "";
  files: { [key: number]: File[] } = {};
  showFileSection = true;
  FormsEF: FormGroup;
  displayedColumns: string[] = ['nombre', 'edad', 'raza', 'color', 'peso', 'acciones']
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
  loading: boolean = false;
  personData: any;
  meshList: any;
  RequirementsDocumentsList: any;
  activities: any[] = [];
  schedule: any[] = [];
  disabled: boolean = false;
  validsecondNext: boolean = false;
  validthirdNext: boolean = false;
  inscriptionId: string = "";
  aspirantId: string = "";
  mostrarActividad: boolean = true;
  mostrarCronograma: boolean = true;
  fileSelected: boolean = false
  selected = '';
  selectedSchedule: any = {};
  filteredActivities: any[] = [];
  filteredSchedule: any[] = [];
  showMessage: boolean = false;
  messageType: 'error' | 'info' = 'info';
  errorMessage: string = '';
  infoMessage: string = '';
  selectedActivity: any;
  status: "initial" | "uploading" | "success" | "fail" = "initial";
  idActivity: any;
  cedulaParticipant: string = "";
  loadingFile: boolean = false;
  planId: string = "";
  IsError: boolean = false;
  public converId: any;
  busquedaR: boolean = false;
  public DataAcademico: DetalleAcademicoExt[] = [

  ];

  public DataExperiencia: DetalleExperienciaExt[] = [

  ];

  SourceAcademico = new MatTableDataSource<DetalleAcademicoExt>(this.DataAcademico);
  SourceExperiencia = new MatTableDataSource<DetalleExperienciaExt>(this.DataExperiencia);
  public FormsEFDocument: FormGroup;
  @ViewChild(MatPaginator)
  set paginatorAcademic(value: MatPaginator) {
    this.SourceAcademico.paginator = value;
  }
  @ViewChild('paginatorExperiencia')
  set paginatorExperiencia(value: MatPaginator) {
    this.SourceExperiencia.paginator = value;
  }
  constructor(private fb:
    FormBuilder,
    private Path: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private http: HttpClient,
    public _router: Router,
    public elm: ElementRef,
    private activatedRoute: ActivatedRoute,
    private _inscriptionService: InscriptionService,
    public dialog: MatDialog,
    private authService: AuthService
  ) {
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
      degreeId: ['', [Validators.required]],
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
      usesAwheelchair: [false],
    });

    this.FormsEFDocument = this.fb.group({
      Photo: [''],
      CIP: [''],
      Title: [''],
      Credits: [''],
      Idoneidad: [''],
      LetterMotivation: [''],
      LetterAval: [''],
    });
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.planId = params['id'];
      this.loadMeshList(this.planId);
    })
  }

  loadMeshList(id: string) {
    this._inscriptionService.getDegreeCurriculumdesingByPlan(id).subscribe({
      next: (data) => {
        this.meshList = data;
      }
    })
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
      this._inscriptionService.getDataPerson(cedula).subscribe({
        next: (data) => {

          this.loading = false;
          this.disabled = true;
          this.personData = data;
          this.FormsEF.value.firstName = this.personData[0]?.datasetPersona?.personaPublica
            ?.primer_nombre;
          this.FormsEF.value.lastName = this.personData[0]?.datasetPersona?.personaPublica
            ?.apellido_paterno;
          this.FormsEF.value.secondsurname = this.personData[0]?.datasetPersona?.personaPublica
            ?.apellido_materno;
          this.FormsEF.value.placeOfBirth = this.personData[0]?.datasetPersona?.personaPublica
            ?.lugarDeNacimiento;
          this.FormsEF.value.dateOfBirth = this.personData[0]?.datasetPersona?.personaPublica
            ?.fecha_nacimiento;
          this.FormsEF.value.residentialAddress = this.personData[0]?.datasetPersona?.personaPublica
            ?.edificio_casa + " ," + this.personData[0]?.datasetPersona?.personaPublica
              ?.calle_residencia + " ," + this.personData[0]?.datasetPersona?.personaPublica
              ?.barrio_residencia;
          console.log('Datos de la persona:', data[0]?.datasetPersona);
        },
        error: (e) => this.loading = false,
        complete: () => console.info('Complete')
      })
    }
  }

  openDialogAC(): void {
    const dialogACRef = this.dialog.open(InfoAcademicaComponent, {
      data: {},//{name: this.name, animal: this.animal},
    });

    dialogACRef.afterClosed().subscribe((result: DetalleAcademicoExt) => {
      console.log('The dialog was closed', result);
      if (result != null) {
        this.DataAcademico.push(result);
        this.SourceAcademico = new MatTableDataSource<DetalleAcademicoExt>(this.DataAcademico);
      }

    });
  }

  openDialogIL(): void {
    const dialogILRef = this.dialog.open(InfoLaboralComponent, {
      data: {},//{name: this.name, animal: this.animal},
    });

    dialogILRef.afterClosed().subscribe((result: DetalleExperienciaExt) => {
      console.log('The dialog was closed', result);
      if (result != null) {
        this.DataExperiencia.push(result);
        this.SourceExperiencia = new MatTableDataSource<DetalleExperienciaExt>(this.DataExperiencia);
      }

    });
  }

  deleteItemAC(row: any) {
    console.log(row);
    this.DataAcademico.splice(row, 1);
    this.SourceAcademico = new MatTableDataSource<DetalleAcademicoExt>(this.DataAcademico);
  }

  deleteItemIL(row: any) {
    console.log(row);
    this.DataExperiencia.splice(row, 1);
    this.SourceExperiencia = new MatTableDataSource<DetalleExperienciaExt>(this.DataExperiencia);
  }

  getRequirementsDocuments(id: string) {
    this._inscriptionService.getRequirementsDocuments(id).subscribe({
      next: (data) => {
        this.RequirementsDocumentsList = data;
        console.log('Datos de los documentos requeridos:', data);
      }
    })

  }

  onChangeFile(event: any, requerimentId: number, requirement: Requirement) {
    console.log("Requeriment obj", requirement);
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

  submit() {
    Swal.fire({
      title: "Escuela Judicial",
      text: 'Registrado correctamente',
      icon: "success"
    });

    location.reload();
  }

  addAspirantEF() {
    const jsonRequest = {
      backoffice: 0,
      firstName: this.FormsEF.value.firstName,
      lastName: this.FormsEF.value.lastName,
      cedula: this.FormsEF.value.cedula,
      dateOfBirth: this.FormsEF.value.dateOfBirth,
      placeOfBirth: this.FormsEF.value.placeOfBirth,
      residentialAddress: this.FormsEF.value.residentialAddress,
      telephoneNumber: this.FormsEF.value.telephoneNumber,
      email: this.FormsEF.value.email,
      degreeId: this.FormsEF.value.degreeId,
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
      observation: "",
      createdBy: this.authService.currentUserValue.id
    }
    this._inscriptionService.AddEFAspirant(jsonRequest).subscribe({
      next: (data: ResponseInscripcionEF) => {
        this._inscriptionService._ResponseInscripcionEF = data;
        if (!this._inscriptionService._ResponseInscripcionEF.isError) {
          this.inscriptionId = this._inscriptionService._ResponseInscripcionEF.inscriptionResponse[0].inscriptionId.toString();
          this.aspirantId = this._inscriptionService._ResponseInscripcionEF.inscriptionResponse[0].aspirantId.toString();

          console.log("Creado correctamente, siguiente paso: cargar información académica.", this.aspirantId);
          // Swal.fire({
          //   title: "Escuela Judicial",
          //   text: 'Creado correctamente, siguiente paso: cargar información académica.',
          //   icon: "success"
          // });
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
    jsonRequest.academicInformation = JSON.parse(jsonItem);

    console.log("Detalle academico request", jsonRequest);
    this._inscriptionService.AddEFAcademicInfo(jsonRequest).subscribe({
      next: (data: ResponseAddEFcademicInfo) => {
        this._inscriptionService._ResponseAddEFcademicInfo = data;
        if (!this._inscriptionService._ResponseAddEFcademicInfo.isError) {

          console.log("Creado correctamente, siguiente paso: cargar información Laboral.", this.aspirantId);
          // Swal.fire({
          //   title: "Escuela Judicial",
          //   text: 'Creado correctamente, siguiente paso: cargar información académica.',
          //   icon: "success"
          // });
        }
        else {
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

    console.log("Detalle Laboral request", jsonRequest);
    this._inscriptionService.AddEFLaboralInfo(jsonRequest).subscribe({
      next: (data: ResponseAddEFlaboralInfo) => {
        this._inscriptionService._ResponseAddEFlaboralInfo = data;
        if (!this._inscriptionService._ResponseAddEFlaboralInfo.isError) {

          console.log("Creado correctamente, siguiente paso: cargar documentos.", this.aspirantId);
          // Swal.fire({
          //   title: "Escuela Judicial",
          //   text: 'Creado correctamente, siguiente paso: cargar información académica.',
          //   icon: "success"
          // });
        }
        else {
          Swal.fire({
            title: "Escuela Judicial",
            text: 'WorkExperience no fue creado correctamente.',
            icon: "warning"
          });
        }

      }
    })
  }

  firstNext() {
    console.log(this.FormsEF.value.degreeId);
    this.addAspirantEF();
    this.getRequirementsDocuments(this.FormsEF.value.degreeId);
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
