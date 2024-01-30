import { AfterViewInit, Component, ElementRef, Inject, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators
} from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { DetalleAcademico } from 'app/admission/models/DetalleAcademico';
import { DetalleExperiencia } from 'app/admission/models/DetalleExperiencia';
import { InscriptionService } from '../../../services/inscription.service';
import Swal from "sweetalert2";
import { ResponseInscripcionEF } from "../../../../models/InscripcionEFResponse";
import { DetallePlanes } from "../../../../models/DetallePlanes";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import {
  MAT_DIALOG_DATA, MatDialog,
  MatDialogRef,
} from "@angular/material/dialog";
import { MaterialModule } from "@shared";
import { NgFor, NgIf } from "@angular/common";
import { Participant } from "../../../../models/participant";
import { ResponseAddEFcademicInfo } from "../../../../models/AddEFacademicResponse";
import { el } from "@fullcalendar/core/internal-common";
import { ResponseAddEFlaboralInfo } from "../../../../models/AddEFlaboralResponse";
import { Requirement } from "../../../../models/Requeriminet";
import { ResponseEF } from "../../../../models/ResponseMessage";

//-------------Dialog AC----------------------
@Component({
  selector: 'dialog-overview-detelle-academico',
  templateUrl: './dialog-overview-detalle-academico.html',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MaterialModule,
    NgIf,
    NgFor,
    ReactiveFormsModule,
  ],
})

export class DialogOverviewDetalleAcademico {
  public modalityACForm: UntypedFormGroup;
  public modalityAC: DetalleAcademico = {
    educationalLevelId: 0,
    obtainedTitle: "",
    institution: "",
    city: "",
    completionDate: new Date(),
    startDate: new Date(),
    academicInstitutionId: 0
  }
  DetalleAC = {
    cedula: "",
    educationalLevelId: 0,
    obtainedTitle: "",
    institution: "",
    city: "",
    completionDate: "",
    startDate: "",
    academicInstitutionId: 0
  }
  educationlevelList: any;


  constructor(
    public dialogACRef: MatDialogRef<DialogOverviewDetalleAcademico>,
    private _inscriptionService: InscriptionService,
    @Inject(MAT_DIALOG_DATA) public data: DetalleAcademico,
    private fb: UntypedFormBuilder
  ) {
    this.modalityACForm = this.createContactForm();
  }

  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      educationalLevelId: [this.modalityAC.educationalLevelId, [Validators.required]],
      obtainedTitle: [this.modalityAC.obtainedTitle, [Validators.required]],
      institution: [this.modalityAC.institution, [Validators.required]],
      city: [this.modalityAC.city, [Validators.required]],
      completionDate: [this.modalityAC.completionDate, [Validators.required]],
      startDate: [this.modalityAC.startDate, [Validators.required]],
      academicInstitution: [this.modalityAC.institution],
    });
  }

  submit() {
    // emppty stuff
    this.dialogACRef.close(this.modalityACForm.value);
  }
  onNoClick(): void {
    this.dialogACRef.close();
  }



  getEducationLevel() {
    this._inscriptionService.getEducationLevel().subscribe({
      next: (data) => {
        console.log("Educationlevel loaded", data.educationLevel);
        this.educationlevelList = data.educationLevel;
      }
    })
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getEducationLevel();
  }


}

//-------------Dialog IL----------------------
@Component({
  selector: 'dialog-overview-detelle-laboral',
  templateUrl: './dialog-overview-detalle-laboral.html',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MaterialModule,
    NgIf,
    NgFor,
    ReactiveFormsModule,
  ],
})

export class DialogOverviewDetalleLaboral {
  public modalityILForm: UntypedFormGroup;
  public modalityIL: DetalleExperiencia = {
    entidad: "",
    position: "",
    cityEmployment: "",
    startDateEmployment: new Date(),
    endDate: new Date(),
    time: ""
  }
  DetalleIL = {
    entidad: "",
    position: "",
    cityEmployment: "",
    startDateEmployment: "",
    endDate: "",
    time: ""
  }

  constructor(
    public dialogILRef: MatDialogRef<DialogOverviewDetalleAcademico>,
    private _inscriptionService: InscriptionService,
    @Inject(MAT_DIALOG_DATA) public data: DetalleAcademico,
    private fb: UntypedFormBuilder
  ) {
    this.modalityILForm = this.createContactForm();
  }

  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      entidad: [this.modalityIL.entidad, [Validators.required]],
      position: [this.modalityIL.position, [Validators.required]],
      cityEmployment: [this.modalityIL.cityEmployment, [Validators.required]],
      startDateEmployment: [this.modalityIL.startDateEmployment, [Validators.required]],
      endDate: [this.modalityIL.endDate, [Validators.required]],
      time: [this.modalityIL.time, [Validators.required]],
    });
  }

  submit() {
    // emppty stuff
    this.dialogILRef.close(this.modalityILForm.value);
  }
  onNoClick(): void {
    this.dialogILRef.close();
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }


}
//--------------------------Dialogs ends------------------------------
@Component({
  selector: 'app-backoffice-ef',
  templateUrl: './backoffice-ef.component.html',
  styleUrls: ['./backoffice-ef.component.scss']
})
export class BackofficeEFComponent implements AfterViewInit {

  displayedColumns = [
    'name',
    'description',
    'statusId',
    'actions',
  ];

  InformacionAcademica: string[] = [
    'nivel',
    'institucion',
    'ciudad',
    'fecha_culiminacion',
    'fecha_grado',
    'titulo_obtenido',
    'acciones',
  ];
  InformacionLaboral: string[] = [
    'entidad',
    'cargo',
    'ciudad',
    'inicio',
    'fin',
    'tiempo',
    'acciones',
  ];

  public DataAcademico: DetalleAcademico[] = [

  ];

  public DataExperiencia: DetalleExperiencia[] = [

  ];
  loading: boolean = false;
  personData: any;
  modalityList: any;
  RequirementsDocumentsList: any;
  inscriptionId: string = "";
  aspirantId: string = "";
  loadingFile: boolean = false;
  disabled: boolean = false;
  public cedulaParticipant: string = "";
  showTable: boolean = true;
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

  SourcePlan = new MatTableDataSource<DetallePlanes>();
  SourceAcademico = new MatTableDataSource<DetalleAcademico>(this.DataAcademico);
  SourceExperiencia = new MatTableDataSource<DetalleExperiencia>(this.DataExperiencia);
  public FormsEF: FormGroup;
  public FormsEFDocument: FormGroup;

  @ViewChild(MatPaginator)
  set paginatorPlans(value: MatPaginator) {
    this.SourcePlan.paginator = value;
  }
  @ViewChild(MatPaginator)
  set paginator(value: MatPaginator) {
    this.SourceAcademico.paginator = value;
  }
  @ViewChild('paginatorExperiencia')
  set paginatorExperiencia(value: MatPaginator) {
    this.SourceExperiencia.paginator = value;
  }

  @ViewChild(DialogOverviewDetalleAcademico) DialogOverviewDetalleAcademico: any;

  constructor(private fb: FormBuilder,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar, private _inscriptionService: InscriptionService,
    private activatedRoute: ActivatedRoute,
    public elm: ElementRef,
    public _nav: Router) {
    // nombre**, apellidos**, cedula**, sexo**, universidad, institucion, dependencia, entidad cooperante, cargo, provincia**, distrito judicial**, correo electronico, fecha de invitacion
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
      carreraId: ['', [Validators.required]],
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
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.loadPlans();
    this.showTable = true;
    this.SourcePlan.paginator = this.paginatorPlans;
    this.SourceAcademico.paginator = this.paginator;
    this.SourceExperiencia.paginator = this.paginatorExperiencia;
  }

  ngAfterViewInit() {
    console.log('');
  }

  loadPlans() {
    this._inscriptionService.getPlanesAprobados().subscribe({
      next: (data) => {
        this.SourcePlan = data;
        console.log('Datos de los planes:', data);
      }
    })
  }

  changestatus(id: string) {
    this.showTable = false;
    this._inscriptionService.getDegreeCurriculumdesingByPlan(id).subscribe({
      next: (data) => {
        console.log("Datos de los Mallas de plan" + id, data);
        this.modalityList = data;
      }
    })
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
      degreeId: this.FormsEF.value.carreraId,
      observation: "",
      createdBy: ""
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
          this.Participant.firstName = this.personData[0]?.datasetPersona?.personaPublica
            ?.primer_nombre;
          this.Participant.lastName = this.personData[0]?.datasetPersona?.personaPublica
            ?.apellido_paterno;
          this.Participant.secondsurname = this.personData[0]?.datasetPersona?.personaPublica
            ?.apellido_materno;
          this.Participant.placeOfBirth = this.personData[0]?.datasetPersona?.personaPublica
            ?.lugarDeNacimiento;
          this.Participant.dateOfBirth = this.personData[0]?.datasetPersona?.personaPublica
            ?.fecha_nacimiento;
          this.Participant.residentialAddress = this.personData[0]?.datasetPersona?.personaPublica
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

  submit() {

  }
  openDialogAC(): void {
    const dialogACRef = this.dialog.open(DialogOverviewDetalleAcademico, {
      data: {},//{name: this.name, animal: this.animal},
    });

    dialogACRef.afterClosed().subscribe((result: DetalleAcademico) => {
      console.log('The dialog was closed', result);
      if (result != null) {
        this.DataAcademico.push(result);
        this.SourceAcademico = new MatTableDataSource<DetalleAcademico>(this.DataAcademico);
      }

    });
  }

  openDialogIL(): void {
    const dialogILRef = this.dialog.open(DialogOverviewDetalleLaboral, {
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
        console.log('Datos de los documentos requeridos:', data);
      }
    })

  }

  firstNext() {
    console.log(this.FormsEF.value.carreraId);
    this.addAspirantEF();
    this.getRequirementsDocuments(this.FormsEF.value.carreraId);
  }

  secondNext() {
    this.addcademicInfo();
  }

  thirdNext() {
    this.addEFLaboralInfo();
  }

}

