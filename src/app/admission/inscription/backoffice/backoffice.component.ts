import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InscriptionService } from '../services/inscription.service';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-backoffice',
  templateUrl: './backoffice.component.html',
  styleUrls: ['./backoffice.component.scss']
})
export class BackofficeComponent {
  form:FormGroup
  displayedColumns: string[] = ['nombre', 'edad', 'raza', 'color', 'peso', 'acciones']
  loading:boolean=false;
  personData : any;
  disabled:boolean = false;


  constructor(private fb: FormBuilder, private _inscriptionService:InscriptionService){
    // nombre**, apellidos**, cedula**, sexo**, universidad, institucion, dependencia, entidad cooperante, cargo, provincia**, distrito judicial**, correo electronico, fecha de invitacion
    this.form=this.fb.group({
      name:['', Validators.required],
      surname:['', Validators.required],
      secondSurname:['', Validators.required],
      identificationCard:['', Validators.required],
      gender:['', Validators.required],
      province:['', Validators.required],
      judicialDistrict:['', Validators.required],

      university:['',Validators.required],
      institution:['',Validators.required],
      dependency:['',Validators.required],
      cooperatingEntity:['',Validators.required],
      position:['',Validators.required],
      email:['', Validators.required]
      // 
      // 
      // province:['',Validators.required],
      // judicialDistrict:['',Validators.required],
      // invitationDate:['',Validators.required],
      // userId:['',Validators.required],
      // activityDateId:['',Validators.required],
      

    })

  }

  getPersonData(){
    
    this.loading=true;
    setTimeout(() => {
      this._inscriptionService.getDataPerson().subscribe({
        next:(data)=>{
          
          this.loading=false;
          this.disabled=true;
          this.personData=data;
          console.log('Datos de la persona:', data[0].DatasetPersona?.PersonaPublica?.primer_nombre);
        },
        error:(e)=>this.loading=false,
        complete:()=> console.info('Complete')
      })
    }, 3000);
   
   

  }

  addParticipant(){
    console.log("funciona")
  }
}
