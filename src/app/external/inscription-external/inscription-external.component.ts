import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExternalInscriptionService } from '../services/external-inscription.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from "@angular/common/http";
import { throwError } from "rxjs";
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ActivityDetailService } from 'app/admission/services/activity-detail.service';
import { GetOneActivity } from 'app/admission/models/GetOneActivity';
import { InscriptionService } from 'app/admission/inscription/services/inscription.service';
import { ResponseInscripcion } from 'app/admission/models/InscripcionResponse';
import { Requirement } from 'app/admission/models/Requeriminet';
import { ResponseEF } from 'app/admission/models/ResponseMessage';
import { ValidateFileResponse, VerificarDocumentacion } from 'app/admission/models/VerificacionDocumentacion';
import { Persona } from 'app/admission/models/persona';

@Component({
  selector: 'app-inscription-external',
  templateUrl: './inscription-external.component.html',
  styleUrls: ['./inscription-external.component.scss']
})
export class InscriptionExternalComponent implements OnInit {
  shortLink: string = "";
  files: { [key: number]: File[] } = {};
  showFileSection = true;
  form: FormGroup
  displayedColumns: string[] = ['nombre', 'edad', 'raza', 'color', 'peso', 'acciones']
  loading: boolean = false;
  personData: any;
  typedoc: string = "CIP";
  DependencyList: any;
  CargosList: any;
  OrganismoCopList: any;
  UniversityList: any;
  InstitutionList: any;
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
  idActivity: any;
  cedulaParticipant: string = "";
  loadingFile: boolean = false;
  IsError: boolean = false;
  public converId: any;
  busquedaR: boolean = false;
  constructor(private fb:
    FormBuilder,
    private Path: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private _externalInscriptionService: ExternalInscriptionService,
    private http: HttpClient,
    public _ActivityDetailService: ActivityDetailService,
    private _inscriptionService: InscriptionService,
    public _router: Router,
    public elm: ElementRef
  ) {
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
      activityId: [this.converId],
      observation: ['...............', Validators.required],
    })

  }
  ngOnInit(): void {
    this._externalInscriptionService.getShedule().subscribe({
      next: (data) => {
        this.schedule = data;
        this.filteredSchedule = data;
        console.log('Cronogramas:', data);
      },
      error: (e) => this.loading = false,
      complete: () => console.info('Complete')
    })

    this.idActivity = this.Path.snapshot.params['id'];
    if (this.idActivity != null) {
      this.converId = this._ActivityDetailService.decryptData(this.idActivity, 'Panama2019$');
      this.getOneActivityDetails();
    } else {
      this._router.navigate(['/']);
    }
    this.loadDependencias();
    this.loadCargos();
    this.loadOrganosCop();
    this.loadUniversidades();
    this.loadIntituciones();
  }

  validar() {
    this._ActivityDetailService.VerificarDisponibilidadActividad(this.converId).subscribe({
      next: (res: boolean) => {
        if (!res) {
          Swal.fire({
            title: "<strong>Escuela Judicial</strong>",
            html: '<p>URL no está disponible.</p>',
            icon: "warning"
          });
        }
      }
    });
  }
  regresar() {
    location.reload();
  }
  getPersonData(cedula: string) {
    this._inscriptionService.init_Persona();
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
        next: (data: Persona[]) => {
          this._inscriptionService._Persona = data;
          console.log(this._inscriptionService._Persona[0].datasetPersona.personaPublica);
          if (data.length > 0) {
            this.busquedaR = true;
            if (this._inscriptionService._Persona[0].datasetPersona.personaPublica == null) {
              this.personData = this._inscriptionService._Persona[0]?.datasetPersona?.personaPublica;
              if(this.typedoc == "CIP"){
                this.disabled = true;
              }
              else
              {
                this.disabled = false;
              }
            } else {
              if (this._inscriptionService._Persona[0].datasetPersona.personaPublica.sexo == 'M') {
                this._inscriptionService._Persona[0].datasetPersona.personaPublica.sexo = 'Masculino';
              } else {
                this._inscriptionService._Persona[0].datasetPersona.personaPublica.sexo = 'Femenino';
              }
              this.busquedaR = true;
              this.personData = this._inscriptionService._Persona[0]?.datasetPersona?.personaPublica;
              if(this.typedoc == "CIP"){
                this.disabled = true;
              }
              else
              {
                this.disabled = false;
              }
            }
          }

          // this.personData=data;
          // console.log('Datos de la persona:', data[0]?.datasetPersona);
        },
        error: (e) => this.loading = false,
        complete: () => {
          this.loading = false;
        }
      })

    }


  }

  getOneActivityDetails() {
    this._ActivityDetailService.GetOneActivity(this.converId).
      subscribe({
        next: (res: GetOneActivity) => {
          this._ActivityDetailService._GetOneActivity = res;
        }, error: (err) => {
          console.log(err);
          this._router.navigate(['/']);
        },
        complete: () => {
        }
      });
  }

  changeTypeDoc(){
    console.log(this.typedoc);
    if(this.typedoc == "PAS"){
      this.getPersonData("999999");
      this.disabled = false;
    }
    if(this.typedoc == "CIP"){
      this.personData = null;
    }
  }

  loadDependencias() {
    this._inscriptionService.getCatalogDependencia().subscribe({
      next: (data) => {
        console.log("Datos de Dependencias", data);
        this.DependencyList = data;
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

  loadOrganosCop() {
    this._inscriptionService.getCatalogOrganismosCoperantes().subscribe({
      next: (data) => {
        console.log("Datos de Organismos Coperantes", data);
        this.OrganismoCopList = data;
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

  loadIntituciones() {
    this._inscriptionService.getCatalogInstitucion().subscribe({
      next: (data) => {
        console.log("Datos de Instituciones", data);
        this.InstitutionList = data;
      }
    })
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
      error: (e) => this.loading = false,
      complete: () => console.info('Complete')
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
        error: (e) => this.loading = false,
        complete: () => console.info('Complete')
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
    this.form.controls['activityId'].setValue(this.converId);
    this._inscriptionService.init_ResponseInscripcion();
    this._ActivityDetailService.GetOneActivity(this.converId?.toString()).
      subscribe({
        next: (res: GetOneActivity) => {
          this._ActivityDetailService._GetOneActivity = res;
          this.activityRequirements = res;
          console.log(this.activityRequirements);

        },
        error: (err: any) => {
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
          text: 'Creado correctamente, siguiente paso: cargar los documentos requeridos por ISJUP para la actividad.',
          icon: "success"
        });
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
      if (files[0].type != 'application/pdf' && files[0].type != 'image/png' && files[0].type != 'image/jpeg') {
        Swal.fire({
          title: "Escuela Judicial",
          text: 'Solo se permite tipo de archivo PDF/JPG/PNG.',
          icon: "warning"
        });
        this.loadingFile = false;
        elementImg.value = '';
        return;
      }
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
    this.loadingFile = true;
    this._inscriptionService.init_VerificarDocumentacion();
    this._inscriptionService.ValidationDocumentRequirement(this._inscriptionService._ResponseInscripcion.inscriptionId).subscribe({
      next: (res: VerificarDocumentacion) => {
        const encontrado = res.validateFileResponse.some(item => item.mss === "Falta");
        if (encontrado) {
          Swal.fire({
            title: "Escuela Judicial",
            text: `Faltan documentos requeridos por ISJUP, verificar que todos los documentos esten cargados.`,
            icon: "warning"
          });
          this.IsError = true;
        } else {
          Swal.fire({
            title: "Escuela Judicial",
            text: `Documentación completada, Inscrito correctamente.`,
            icon: "success"
          });
          this.IsError = false;
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


}
