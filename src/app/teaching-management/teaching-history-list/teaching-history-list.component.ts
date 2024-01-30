import { Component, OnInit } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { TeacherService } from '../services/teacher.service';
import { AuthService, User } from '@core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-teaching-history-list',
  templateUrl: './teaching-history-list.component.html',
  styleUrls: ['./teaching-history-list.component.scss']
})
export class TeachingHistoryListComponent extends UnsubscribeOnDestroyAdapter
implements OnInit{


  displayedColumns = [
    'name',
    'numOfCredits',
    'numOfHours',
    'numOfClasses',
    'hasLaboratory',
    
  ];
  
  displayedColumns2 = [
    'name',
    'activityModeName',
    'activityTypeName',
    'activityLocationName',
    'isExecuted',
    
  ];
  
  processList = [
    { id: 1, name: 'Formación Especialidad' },
    { id: 2, name: 'Entrenamiento' },
    
  ];
  user!: User;
  cedula!: string;
  DataSubjects!: any;
  DataActivities!: any;
  docForm!: UntypedFormGroup;
  view: boolean=false;
  selectedOption: number=2;

  constructor(public _teacherService: TeacherService,
  private authenticationService: AuthService,
  private fb: UntypedFormBuilder,
  ){
  super()
  }
ngOnInit()  {

  this.docForm= this.fb.group({
    code:new FormControl(""),
    name:new FormControl(""),
    teacherCedula:new FormControl("21324339"),
  });
  this.user =this.authenticationService.currentUserValue;
  this.getSubjects(); 
  this.getActivities();
  
    

}

viewTable(id:number){
if(id==1){
  this.view=true;
 
}else{
  this.view=false;
  
}


}
  async getSubjects() {
    this._teacherService.getSubjectsByCedula(this.docForm.value).subscribe({
       next: (res) => {
 
         this.DataSubjects = res;
         console.log(this.DataSubjects);

       }
     })
   }
   
   async getActivities() {
   //const ced=this.docForm.get('teacherCedula')?.value;
    this._teacherService.getActivitiesByCedula("12345678").subscribe({
       next: (res) => {
 
         this.DataActivities = res;
        console.log(res);

       }
     })
   }
}
