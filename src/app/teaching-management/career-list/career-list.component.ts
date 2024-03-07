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
import { Activity } from 'app/admission/models/activity';
import { EncuestaActivityComponent } from 'app/enrollment/Encuestas/encuesta-activity/encuesta-activity.component';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import Swal from 'sweetalert2';
import { ViewSurveyComponent } from 'app/enrollment/Encuestas/view-survey/view-survey.component';

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


displayedColumns2 = [
  'name',
  'activityModeName',
  'activityTypeName',
  'activityLocationName',
  'isExecuted',
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
noDataMessage:string="No se encontraron resultados."

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
    this.getActivities();
  }
}

Detail(row: DegreeCurriculumDesign) {
  localStorage.setItem('idCareer', row.id.toString());
  localStorage.setItem('tipoSolicitud', "2");
  this._nav.navigate(['/teaching-management/teacher-history-list/']);
}

async getCareers() {

  this._teacherService.getCareer(this.cedula).subscribe({
    next: (res) => {

      this.DataCareer = res;
     

    }
  })
}

async getActivities() {
  //const ced=this.docForm.get('teacherCedula')?.value;
  this._teacherService.getActivitiesByCedula(this.cedula).subscribe({
    next: (res) => {

      this.DataActivities = res;
      console.log(res);

    }
  })
}

sendEncuestas(row: Activity) {
  const dialogRef = this.dialog.open(EncuestaActivityComponent, {
    data: {
      activity: row,
      accion: 'encuesta',
      typeUser: 'Profesor',
      docente: this.cedula,
      id_actividad: row.id
    },
    width: '1200px',
    disableClose: true
  });

  dialogRef.afterClosed().subscribe((result: ResponseMessageMaestra) => {
    if (result == undefined) {
      return;
    }
    if (result.CodError == 200) {
      Swal.fire({
        title: "Escuela Judicial",
        text: result.Message,
        icon: "success"
      });
    } else {
      Swal.fire({
        title: "Escuela Judicial",
        text: result.Message,
        icon: "warning"
      });
    }
  });

}

ViewSurveyAct(row: Activity) {
  const dialogRef = this.dialog.open(ViewSurveyComponent, {
    data: {
      activity: row,
      action: "A",
      subject: null,
      cedula: this.cedula
    },
    width: '1200px',
    disableClose: true
  });

  dialogRef.afterClosed().subscribe((result: ResponseMessageMaestra) => {
    if (result == undefined) {
      return;
    }

  });

}

calificacionFinalActivity(row: Activity) {
  localStorage.setItem('tipoSolicitud', "2");
  localStorage.setItem('actividadEscogida', row.name);
  localStorage.setItem('id', row.id.toString());
  this._nav.navigate(['/teaching-management/list-students/', row.id]);

}

Detail2(row: Activity) {
  localStorage.setItem('tipoSolicitud', "2");
  localStorage.setItem('actividadEscogida', row.name);
  localStorage.setItem('id', row.id.toString());
  this._nav.navigate(['/teaching-management/detail-subject/', row.id]);
}

calificacionesActividades(row: Activity) {
  // console.log(row);
  localStorage.setItem('actividadEscogida', row.name);
  localStorage.setItem('id', row.id.toString());
  localStorage.setItem('tipoSolicitud', "2");
  this._nav.navigate(['/teaching-management/detail-asignatura/', row.id]);
}


















}


