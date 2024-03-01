import { Component, OnInit } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { TeacherService } from '../services/teacher.service';
import { AuthService } from '@core/service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UntypedFormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { User } from '@core/models/user';
import { RequestServicesService } from 'app/intranet-academic-registration/Services/request-services.service';
import { DegreeCurriculumDesign } from 'app/admission/FormalEducations/Models/AnnualPlan';

@Component({
  selector: 'app-career-list',
  templateUrl: './career-list.component.html',
  styleUrls: ['./career-list.component.scss']
})
export class CareerListComponent extends UnsubscribeOnDestroyAdapter
implements OnInit {


displayedColumns = [
  'name',
  'actions',
];

user!: User;
cedula!: string;
DataCareer!: any;
//subjects:Subject[] = [];
DataActivities!: any;
//activities:Activity[] = [];
// docForm!: UntypedFormGroup;
view: boolean = false;
selectedOption: number = 2;


public typeUser: string = '';
constructor(public _teacherService: TeacherService,
  private authenticationService: AuthService,
  private _nav: Router,
  private _RequestService:RequestServicesService,
  private fb: UntypedFormBuilder,
  private activatedRoute: ActivatedRoute,
  public dialog: MatDialog,
) {
  super()
}
ngOnInit() {
  this.user = this.authenticationService.currentUserValue;
  this.typeUser = this._RequestService.getRoleFromToken(this.user.token);
  this.cedula = this.activatedRoute.snapshot.params["cedula"];
  if (this.cedula == undefined) {
    this.cedula = this.user.cedula;
    this.getCareers();
  }
  
}

Detail(row: DegreeCurriculumDesign) {
  localStorage.setItem('idCareer', row.id.toString());
  this._nav.navigate(['/teaching-management/teacher-history-list/']);
}

async getCareers() {

  this._teacherService.getCareer(this.cedula).subscribe({
    next: (res) => {

      this.DataCareer = res;
     

    }
  })
}
















}


