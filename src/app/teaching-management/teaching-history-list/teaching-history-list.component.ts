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
  user!: User;
  cedula!: string;
  DataSubjects!: any;
  docForm!: UntypedFormGroup;

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
   
    

}

  async getSubjects() {
    this._teacherService.getSubjectsByCedula(this.docForm.value).subscribe({
       next: (res) => {
 
         this.DataSubjects = res;

       }
     })
   }
}
