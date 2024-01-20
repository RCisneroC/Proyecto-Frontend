import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { DetalleAcademico } from 'app/admission/models/DetalleAcademico';
import { DetalleExperiencia } from 'app/admission/models/DetalleExperiencia';
import { ValidateFileResponse } from '../../../../models/VerificacionDocumentacion';

@Component({
  selector: 'app-backoffice-ef',
  templateUrl: './backoffice-ef.component.html',
  styleUrls: ['./backoffice-ef.component.scss']
})
export class BackofficeEFComponent {

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
  SourceAcademico = new MatTableDataSource<DetalleAcademico>(this.DataAcademico);
  SourceExperiencia = new MatTableDataSource<DetalleExperiencia>(this.DataExperiencia);
 public FormsEF: FormGroup;
  public FormsEFDocument: FormGroup;
  @ViewChild(MatPaginator) 
      set paginator(value: MatPaginator) {
          this.SourceAcademico.paginator = value;
  }
  @ViewChild('paginatorExperiencia') 
      set paginatorExperiencia(value: MatPaginator) {
          this.SourceExperiencia.paginator = value;
  } 
  
 constructor(private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    public elm: ElementRef,
    public _nav: Router) {
    // nombre**, apellidos**, cedula**, sexo**, universidad, institucion, dependencia, entidad cooperante, cargo, provincia**, distrito judicial**, correo electronico, fecha de invitacion
    this.FormsEF=this.fb.group({
      cedula:['',[Validators.required]],
      firstName:['',[Validators.required]],
      lastName:['',[Validators.required]],
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
     this.SourceAcademico.paginator = this.paginator;
     this.SourceExperiencia.paginator = this.paginatorExperiencia;
}

  submit() {
    
  }
}
