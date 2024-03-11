import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InscriptionService } from 'app/admission/inscription/services/inscription.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from "@angular/common/http";
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivityDetailService } from 'app/admission/services/activity-detail.service';
import { GetOneActivity } from 'app/admission/models/GetOneActivity';
import { ResponseInscripcion } from 'app/admission/models/InscripcionResponse';
import { ResponseEF } from 'app/admission/models/ResponseMessage';
import { Requirement } from 'app/admission/models/Requeriminet';
import {  VerificarDocumentacion } from 'app/admission/models/VerificacionDocumentacion';
import {AuthService} from "@core";
import { EnrollmentService } from 'app/enrollment/services/enrollment.service';
import { StudentModel } from 'app/enrollment/models/StudentModel';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-backoffice',
  templateUrl: './backoffice.component.html',
  styleUrls: ['./backoffice.component.scss']
})
export class BackofficeComponent implements OnInit {
  shortLink: string = "";
  files: { [key: number]: File[] } = {};
  showFileSection = true;
  form: FormGroup;
  displayedColumns: string[] = ['nombre', 'edad', 'raza', 'color', 'peso', 'acciones']
  loading: boolean = false;
  personData: any;
  activities: any[] = [];
  schedule: any[] = [];
  activityRequirements!: GetOneActivity;
  disabled: boolean = false;
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
  idActivity: number = 0;
  cedulaParticipant: string = "";
  loadingFile: boolean = false;
  IsError: boolean = false;
  UniversityList:any;
  InstitutionList: any;
  DependencyList: any;
  OrganismoCopList: any
  CargosList: any;

  public DatosEstudianteResponse: StudentModel | undefined;

  constructor(private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _inscriptionService: InscriptionService,
    private _ActivityDetailService: ActivityDetailService,
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    public elm: ElementRef,
    public _nav: Router,
    private authService: AuthService,
    private enrollmentService: EnrollmentService) {
    // nombre**, apellidos**, cedula**, sexo**, universidad, institucion, dependencia, entidad cooperante, cargo, provincia**, distrito judicial**, correo electronico, fecha de invitacion
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      secondSurname: ['', Validators.required],
      gender: ['', Validators.required],
      cedula: ['', Validators.required],
      institution: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      university: ['', Validators.required],
      dependency: ['', Validators.required],
      cooperatingEntity: ['', Validators.required],
      position: ['', Validators.required],
      province: ['', Validators.required],
      judicialDistrict: ['', Validators.required],
      invitationDate: new Date().toISOString(),
      activityId: [this.idActivity, Validators.required],
      observation: ['', Validators.required],
    })

  }
  ngOnInit(): void {

    this._inscriptionService.getShedule().subscribe({
      next: (data) => {
        this.schedule = data;
        this.filteredSchedule = data;
      },
      error: (e) => this.loading = false
    })

    this.activatedRoute.params.subscribe((params) => {
      this.idActivity = params['id'];
      this.form.patchValue({ activityId: this.idActivity });
      this.getActividad();
    })

    this.getPersonData(this.authService.currentUserValue.cedula);
    this.loadUniversidades();
    this.loadIntituciones();
    this.loadDependencias();
    this. loadOrganosCop();
    this.loadCargos();
    this.form.controls["email"].patchValue(this.authService.currentUserValue.email);
  }
  regresar() {
    this._nav.navigate([localStorage.getItem('ruta_local')]);
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
              next : (request) =>{
                this.DatosEstudianteResponse = request as StudentModel;
                if(this.DatosEstudianteResponse != undefined){
                  if(!this.DatosEstudianteResponse.isError){
                    this.loading = false;
                    this.disabled = true;
                    this.personData = this.DatosEstudianteResponse;
                  }
                }
              },
              error : (err:HttpErrorResponse) =>{
                  this.loading = false
                  console.log(err);
              }
        }
      );

/*
      this._inscriptionService.getDataPerson(cedula).subscribe({
        next: (data) => {

          this.loading = false;
          this.disabled = true;
          this.personData = data;
        },
        error: (e) => this.loading = false
      })

    */
    }
  }

  getActivities(idSchedule: string) {
    this.showMessage = false;
    this.mostrarActividad = false;
    this._inscriptionService.getActivities(idSchedule).subscribe({
      next: (data) => {
        this.activities = data;

        // Actualiza las opciones de actividades
        this.filteredActivities = data;
      },
      error: (e) => this.loading = false
    });
  }


  getSchedule() {
    if (this.selectedSchedule == '') {
      this.showMessage = true;
    } else {
      this.showMessage = false;
      this.mostrarCronograma = false;
      this._inscriptionService.getShedule().subscribe({
        next: (data) => {
          this.schedule = data;
          this.getActivities(data.id)
          console.log('Cronogrmas :', data, this.activities);
        },
        error: (e) => this.loading = false
      })

    }

  }

  onActivityChange(value: string): void {
    if (this.selected == '') {
      this.showMessage = true;
    } else {
      this.showMessage = false;
      this.filteredActivities = this.activities.filter(activity =>
        activity.name.toLowerCase().includes(value.toLowerCase())
      );


    }

  }

  onScheduleChange(selectedSchedule: any): void {
    if (!selectedSchedule) {
      this.showMessage = true;
    } else {
      this.showMessage = false;
      this.filteredSchedule = this.schedule.filter(schedule =>
        schedule.name.toLowerCase().includes(selectedSchedule.name.toLowerCase())
      );
      this.getActivities(String(selectedSchedule.id))
    }

  }

  cambiarAIInscripcion() {
    this.mostrarActividad = false;
  }

  generateId(): string {
    const timestamp = Date.now();
    const randomNumber = Math.floor(Math.random() * 1000000);

    return `${timestamp}-${randomNumber}`;
  }

  isActivityDisabled(activity: any): boolean {

    const effectiveEndDate = new Date(activity.effectiveEndDate);
    const currentDate = new Date();
    console.log(effectiveEndDate, currentDate)
    if (currentDate > effectiveEndDate) {

      this.errorMessage = '';
      this.infoMessage = 'Inscripción permitida.';
      return false;
    } else {
      this.errorMessage = 'Inscripción no permitida. La fecha de inscripción ha expirado.';
      this.infoMessage = '';
      return true;
    }
  }
  displayFn(schedule: any): string {
    return schedule && schedule.name ? schedule.name : '';
  }



  getActividad() {
    this._ActivityDetailService.GetOneActivity(this.idActivity?.toString()).
      subscribe({
        next: (res: GetOneActivity) => {
          this._ActivityDetailService._GetOneActivity = res;
          this.activityRequirements = res;
          console.log(this.activityRequirements);
          // this.showFileSection = true;
        },
        error: (err: any) => {
        },
        complete: () => {
          this._ActivityDetailService.loading = false;
        }
      })
  }
  addParticipant() {
    this._inscriptionService.init_ResponseInscripcion();
    this._ActivityDetailService.GetOneActivity(this.idActivity?.toString()).
      subscribe({
        next: (res: GetOneActivity) => {
          this._ActivityDetailService._GetOneActivity = res;
          this.activityRequirements = res;
        },
        error: (err: any) => {
          console.log(err)
        },
        complete: () => {
          this._ActivityDetailService.loading = false;
        }
      })


    this._inscriptionService.updateParticipant(this.form.value).subscribe({
      next: (data: ResponseInscripcion) => {
        this._inscriptionService._ResponseInscripcion = data;
        Swal.fire({
          title: "Escuela Judicial",
          text: 'Creado correctamente, siguiente paso: cargar los documentos requeridos por ISJUP por la actividad.',
          icon: "success"
        });
        // this.verificarDocumentacion();
        this.showFileSection = false;
      },
      error: (error) => {
        this.showFileSection = true;
        Swal.fire({
          title: "Escuela Judicial",
          text: 'Intente nuevamente..',
          icon: "warning"
        });
      },
    });
  }

  onFileSelected(event: any) {
    const fileInput = event.target;
    if (fileInput.files.length > 0) {
      const file = fileInput.files[0];
      this.form.get('file')?.setValue(file);
    }
  }
  onChangeFile(event: any, requerimentId: number, requirement: Requirement) {
    console.log(name);
    this.loadingFile = true;
    const files: FileList = event.target.files;
    console.log(requirement.name);
    const elementImg = this.elm.nativeElement.querySelector('#archivo_' + requerimentId);
    const elementText = this.elm.nativeElement.querySelector('#texto_' + requerimentId);

    if (files.length > 0) {
      var formdata = new FormData();
      formdata.append('cedula', this._inscriptionService._ResponseInscripcion.cedula);
      formdata.append('FileType', requerimentId.toString());
      formdata.append('InscriptionId', this._inscriptionService._ResponseInscripcion.inscriptionId.toString());
      formdata.append('File', files[0]);
      this._inscriptionService.CargaDocumentoRequirement(formdata).subscribe({
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
          console.log(err)
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
  verificarDocumentacion() {
    let cantidadExito = 0;
    this.loadingFile = true;
    this._inscriptionService.init_VerificarDocumentacion();
    this._inscriptionService.ValidationDocumentRequirement(this._inscriptionService._ResponseInscripcion.inscriptionId).subscribe({
      next: (res: VerificarDocumentacion) => {
        // res.validateFileResponse.forEach((element:ValidateFileResponse) => {
        const encontrado = res.validateFileResponse.some(item => item.mss === "Falta");
        if (encontrado) {
          Swal.fire({
            title: "Escuela Judicial",
            text: `Faltan documentos requeridos por ISJUP`,
            icon: "warning"
          });
          this.IsError = true;
        } else {
          Swal.fire({
            title: "Escuela Judicial",
            text: `Documentos Cargados correctamente, se inscribio correctamente.`,
            icon: "success"
          });
          this.IsError = false;
          this._nav.navigate(["dashboard/dashboard-student"]);
        }
      },
      error: () => {
        this.loadingFile = false;
        Swal.fire({
          title: "Escuela Judicial",
          text: 'Intente nuevamente..',
          icon: "warning"
        });
      },
      complete: () => {
        this.loadingFile = false;
      }
    })
  }

//cargado de listas
loadUniversidades() {
  this._inscriptionService.getCatalogUniversidades().subscribe({
    next: (data) => {
      console.log("Datos de Universidades", data);
      this.UniversityList = data;
    }
  })
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
