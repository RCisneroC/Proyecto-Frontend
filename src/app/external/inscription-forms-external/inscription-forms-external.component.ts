import { HttpClient } from '@angular/common/http';
import { Component, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { InscriptionService } from 'app/admission/inscription/services/inscription.service';
import Swal from 'sweetalert2';

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
  loading: boolean = false;
  personData: any;
  meshList: any;
  activities: any[] = [];
  schedule: any[] = [];
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
  planId:string = "";
  IsError: boolean = false;
  public converId: any;
  busquedaR: boolean = false;
  constructor(private fb:
    FormBuilder,
    private Path: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private http: HttpClient,
    public _router: Router,
    public elm: ElementRef,
    private activatedRoute: ActivatedRoute,
    private _inscriptionService: InscriptionService,
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
          console.log('Datos de la persona:', data[0]?.datasetPersona);
        },
        error: (e) => this.loading = false,
        complete: () => console.info('Complete')
      })

    }


  }

}
