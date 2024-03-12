import {Component, ElementRef, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GetOneActivity} from "../../models/GetOneActivity";
import {MatSnackBar} from "@angular/material/snack-bar";
import {InscriptionService} from "../../inscription/services/inscription.service";
import {ActivityDetailService} from "../../services/activity-detail.service";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import Swal from "sweetalert2";
import {ResponseInscripcion} from "../../models/InscripcionResponse";
import {Requirement} from "../../models/Requeriminet";
import {ResponseEF} from "../../models/ResponseMessage";
import {VerificarDocumentacion} from "../../models/VerificacionDocumentacion";

@Component({
  selector: 'app-enrollment-direct-backoffice',
  templateUrl: './enrollment-direct-backoffice.component.html',
  styleUrls: ['./enrollment-direct-backoffice.component.scss']
})
export class EnrollmentDirectBackofficeComponent implements OnInit {
  shortLink: string = "";
  files: { [key: number]: File[] } = {};
  showFileSection = true;
  form: FormGroup;
  displayedColumns: string[] = ['nombre', 'edad', 'raza', 'color', 'peso', 'acciones']
  loading: boolean = false;
  personData: any;
  DependencyList: any;
  CargosList: any;
  OrganismoCopList: any;
  UniversityList: any;
  InstitutionList: any;
  typedoc: string = "CIP";
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
  constructor(private fb: FormBuilder,
              private _snackBar: MatSnackBar,
              private _inscriptionService: InscriptionService,
              private _ActivityDetailService: ActivityDetailService,
              private http: HttpClient,
              private activatedRoute: ActivatedRoute,
              public elm: ElementRef,
              public _nav: Router) {
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
        console.log('Cronogramas:', data);
      },
      error: (e) => this.loading = false,
      complete: () => console.info('Complete')
    })

    this.activatedRoute.params.subscribe((params) => {
      this.idActivity = params['id'];
      this.form.patchValue({ activityId: this.idActivity });
      this.getActividad();
    })

    this.loadDependencias();
    this.loadCargos();
    this.loadOrganosCop();
    this.loadUniversidades();
    this.loadIntituciones();
  }
  regresar() {
    this._nav.navigate([localStorage.getItem('ruta_local')]);
  }
  nuevaIn() {
    location.reload();
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
          if(this.typedoc == "CIP"){
            this.disabled = true;
          }
          else
          {
            this.disabled = false;
          }
          this.personData = data;
          console.log('Datos de la persona:', data[0]?.datasetPersona);
        },
        error: (e) => this.loading = false,
        complete: () => console.info('Complete')
      })

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
    this._inscriptionService.init_ResponseInscripcion();
    this._ActivityDetailService.GetOneActivity(this.idActivity?.toString()).
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
        const moodlecourseid = localStorage.getItem('moodle_course_id');
        if(moodlecourseid){
          const enrollmentdata = {
            moodleCourseId: 0,//moodlecourseid,
            inscriptionId: data.inscriptionId
          }
          this._inscriptionService.enrollmentDirect(enrollmentdata).subscribe({
            next:(res)=>{
              console.log(res);
              const  reqOBJ = {
                activityId: this.idActivity,
                participantId: this._inscriptionService._ResponseInscripcion.id,
                isReentry: false
              }
              this._inscriptionService.CreateECAcademicRecord(reqOBJ).subscribe({
                next:(res)=>{
                  console.log('CreateECAcademicRecord',res);
                }
              })
            }
          })
        }


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

