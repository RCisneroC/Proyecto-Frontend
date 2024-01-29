import {AfterViewInit, Component, ElementRef, Inject, ViewChild} from '@angular/core';
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
import {ResponseInscripcionEF} from "../../../../models/InscripcionEFResponse";
import {DetallePlanes} from "../../../../models/DetallePlanes";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {
  MAT_DIALOG_DATA, MatDialog,
  MatDialogRef,
} from "@angular/material/dialog";
import {MaterialModule} from "@shared";
import {NgFor, NgIf} from "@angular/common";

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
    institution:"",
    city:"",
    completionDate: new Date(),
    startDate: new Date(),
    academicInstitutionId: 0
  }
   educationlevelList:any;
    datoprueba:string ="textprueba";

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
      educationalLevelId: [this.modalityAC.educationalLevelId,[Validators.required]],
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
  }
  onNoClick(): void {
    this.dialogACRef.close();
  }

  getEducationLevel(){
    this._inscriptionService.getEducationLevel().subscribe({
      next:(data)=>{
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

  InformacionAcademica:string[] = [
    'nivel',
    'institucion',
    'ciudad',
    'fecha_culiminacion',
    'fecha_grado',
    'titulo_obtenido',
    'acciones',
  ];
  InformacionLaboral:string[] = [
    'entidad',
    'cargo',
    'ciudad',
    'inicio',
    'fin',
    'tiempo',
    'acciones',
  ];

  public DataAcademico:DetalleAcademico[] = [
    {
      educationalLevelId: 1,
      obtainedTitle: "string",
      institution: "string",
      city: "string",
      completionDate: new Date(),
      startDate: new Date(),
      academicInstitutionId: 1,
    },
    {
      educationalLevelId: 1,
      obtainedTitle: "string",
      institution: "string",
      city: "string",
      completionDate: new Date(),
      startDate: new Date(),
      academicInstitutionId: 1
    }
  ];

  public DataExperiencia:DetalleExperiencia[] = [
    {
      position: "string",
      cityEmployment: "string",
      startDateEmployment: new Date(),
      endDate: new Date(),
      time: "string"
    },
    {
      position: "string",
      cityEmployment: "string",
      startDateEmployment: new Date(),
      endDate: new Date(),
      time: "string"
    }
  ];
  loading:boolean=false;
  personData : any;
  modalityList:any;
  disabled:boolean = false;
 public cedulaParticipant:string="";
  showTable: boolean = true;
  Participant = {
    backOffice:0,
    firstName : "",
    lastName:"",
    secondsurname:"",
    cedula:"",
    dateOfBirth:"",
    placeOfBirth:"",
    residentialAddress:"",
    telephoneNumber:"",
    email:"",
    degreeId:0,
    observation:"",
    createdBy:""
  };
  datoprueba:string = "algo";
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

  @ViewChild(DialogOverviewDetalleAcademico)  DialogOverviewDetalleAcademico:any;

 constructor(private fb: FormBuilder,
             public dialog: MatDialog,
    private _snackBar: MatSnackBar, private _inscriptionService: InscriptionService,
    private activatedRoute: ActivatedRoute,
    public elm: ElementRef,
    public _nav: Router) {
    // nombre**, apellidos**, cedula**, sexo**, universidad, institucion, dependencia, entidad cooperante, cargo, provincia**, distrito judicial**, correo electronico, fecha de invitacion
    this.FormsEF=this.fb.group({
      cedula:['',[Validators.required]],
      firstName:['',[Validators.required]],
      lastName:['',[Validators.required]],
      secondsurname:['',[Validators.required]],
      placeOfBirth:['',[Validators.required]],
      dateOfBirth:['',[Validators.required]],
      residentialAddress:['',[Validators.required]],
      email:['',[Validators.required]],
      telephoneNumber:['',[Validators.required]],
      carreraId:['',[Validators.required]],
    })



   this.FormsEFDocument=this.fb.group({
      Photo:[''],
      CIP:[''],
      Title:[''],
      Credits:[''],
      Idoneidad:[''],
      LetterMotivation:[''],
      LetterAval:[''],
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

loadPlans(){
    this._inscriptionService.getPlanesAprobados().subscribe({
      next:(data) =>{
this.SourcePlan = data;
        console.log('Datos de los planes:',data);
      }
    })
}

changestatus(id:string){
    this.showTable = false;
    this._inscriptionService.getDegreeCurriculumdesingByPlan(id).subscribe({
      next:(data)=>{
        console.log("Datos de los Mallas de plan"+ id, data);
        this.modalityList = data;
      }
    })
}

addAspirantEF(){
    this._inscriptionService.AddEFAspirant(this.Participant).subscribe({
          next:(data: ResponseInscripcionEF)=>{
            this._inscriptionService._ResponseInscripcionEF = data;
            if (!this._inscriptionService._ResponseInscripcionEF.isError){
              Swal.fire({
                title: "Escuela Judicial",
                text: 'Creado correctamente, siguiente paso: cargar información académica.',
                icon: "success"
              });
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

  getPersonData(cedula: string){
    this.loading=false;
    this.disabled=true;

    if(!cedula){

      Swal.fire({
        title: "Escuela Judicial",
        text: 'Por favor, ingrese una cédula',
        icon: "warning"
      });

    }else{
      this.loading=true;
      this.cedulaParticipant=cedula;
      this._inscriptionService.getDataPerson(cedula).subscribe({
        next:(data)=>{

          this.loading=false;
          this.disabled=true;
          this.personData=data;
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
        error:(e)=>this.loading=false,
        complete:()=> console.info('Complete')
      })

    }


  }

  submit() {

  }
  openDialogAC(): void {
    const dialogACRef = this.dialog.open(DialogOverviewDetalleAcademico, {
      data: {},//{name: this.name, animal: this.animal},
    });

    dialogACRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}

