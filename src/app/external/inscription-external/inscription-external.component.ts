import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExternalInscriptionService } from '../services/external-inscription.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from "@angular/common/http";
import { throwError } from "rxjs";

@Component({
  selector: 'app-inscription-external',
  templateUrl: './inscription-external.component.html',
  styleUrls: ['./inscription-external.component.scss']
})
export class InscriptionExternalComponent {
  
  shortLink: string = ""; 
  loadingFile: boolean = false; // Flag variable 
  files: File[] =[]; 





form:FormGroup
displayedColumns: string[] = ['nombre', 'edad', 'raza', 'color', 'peso', 'acciones']
loading:boolean=false;
personData : any;
activities:any[]=[];
schedule:any[]=[]
disabled:boolean = false;
mostrarActividad:boolean=true;
mostrarCronograma:boolean=true;
fileSelected:boolean=false
selected = '';
selectedSchedule:any = {};
filteredActivities: any[] = [];
filteredSchedule:any[]=[];
showMessage: boolean = false;
messageType: 'error' | 'info' = 'info';
errorMessage: string = '';
infoMessage: string = '';
selectedActivity: any;
status: "initial" | "uploading" | "success" | "fail" = "initial"


constructor(private fb: FormBuilder,private _snackBar: MatSnackBar, private _inscriptionService:ExternalInscriptionService ,private http: HttpClient){
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
    email:['', [Validators.required, Validators.email]],
    description:['', Validators.required],
  
    

  })

}
ngOnInit():void{
   
    this._inscriptionService.getShedule().subscribe({
        next:(data)=>{
          this.schedule=data;
          this.filteredSchedule=data;
          console.log('Cronogramas:', data);
        },
        error:(e)=>this.loading=false,
        complete:()=> console.info('Complete')
    })
 
   

}

getPersonData(cedula: string){
  this.loading=false;
  this.disabled=true;
  
 if(!cedula){
  this._snackBar.open('Por favor, ingrese una cédula', 'Cerrar', {
    duration: 4000,
  });

 }else{
  this.loading=true;
 
    this._inscriptionService.getDataPerson(cedula).subscribe({
      next:(data)=>{
        
        this.loading=false;
        this.disabled=true;
        this.personData=data;
        console.log('Datos de la persona:', data[0]?.datasetPersona);
      },
      error:(e)=>this.loading=false,
      complete:()=> console.info('Complete')
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
      console.log('Actividadesssssss:',this.filteredActivities);
    },
    error: (e) => this.loading = false,
    complete: () => console.info('Complete')
  });
}


getSchedule(){
if(this.selectedSchedule==''){
  this.showMessage=true;
}else{
this.showMessage=false;
this.mostrarCronograma=false;
this._inscriptionService.getShedule().subscribe({
    next:(data)=>{
      this.schedule=data;
      this.getActivities(data.id)
      console.log('Cronogrmas :', data, this.activities);
    },
    error:(e)=>this.loading=false,
    complete:()=> console.info('Complete')
})

}

}

onActivityChange(value: string): void{
  if(this.selected==''){
    this.showMessage=true;
}else{
  this.showMessage=false;
  this.filteredActivities = this.activities.filter(activity =>
    activity.name.toLowerCase().includes(value.toLowerCase())
  );


}
  
}

onScheduleChange(selectedSchedule:any): void{
  if (!selectedSchedule) {
    this.showMessage = true;
  } else {
    this.showMessage = false;
    this.filteredSchedule = this.schedule.filter(schedule =>
      schedule.name.toLowerCase().includes(selectedSchedule.name.toLowerCase())
    );
    this.getActivities(String(selectedSchedule.id))
    console.log("DATOSSSSS", selectedSchedule.id, this.activities);
  }
  
}

cambiarAIInscripcion(){
  this.mostrarActividad=false;
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


addParticipant() {
  if(this.fileSelected){
    this._snackBar.open('Se agrego con éxito el participante ', 'Cerrar', {
      duration: 4000,
    });
    setTimeout(() => {
       window.location.reload();
    }, 4000);
   
  }else{
    this._snackBar.open('Algunos archivos son requisito!!', 'Cerrar', {
      duration: 4000,
    });
  }
  
  //
  // Update the method name accordingly
//   this._inscriptionService.updateParticipant(this.form.value).subscribe({
//     next: (data) => {
//       // Handle success response
//       console.log('Participant added successfully:', data);
//     },
//     error: (error) => {
//       // Handle error response
//       console.error('Error adding participant:', error);
//     },
//   });
}

onFileSelected(event: any) {
  const fileInput = event.target;
  if (fileInput.files.length > 0) {
    const file = fileInput.files[0];
    // Puedes hacer algo con el archivo, por ejemplo, guardarlo en una variable
    this.form.get('file')?.setValue(file);
  }
}
onChangeFile(event: any) {
  const files = event.target.files;

  if (files.length) {
    this.status = "initial";
    this.files = files;
  }
}
onUpload() {
  this.fileSelected=true
  if (this.files.length) {
    const formData = new FormData();

    [...this.files].forEach((file) => {
      formData.append("file", file, file.name);
    });

    const upload$ = this.http.post("https://httpbin.com/post", formData);

    this.status = "uploading";

    upload$.subscribe({
      next: () => {
        this.status = "success";
      },
      error: (error: any) => {
        this.status = "fail";
        return throwError(() => error);
      },
    });
  }
} 

} 
