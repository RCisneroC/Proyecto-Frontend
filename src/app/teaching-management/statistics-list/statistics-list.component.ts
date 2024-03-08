import { Component, OnInit } from '@angular/core';
import { User } from '@core/models/user';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { TeacherService } from '../services/teacher.service';
import { AuthService } from '@core/service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UntypedFormBuilder } from '@angular/forms';
import { RequestServicesService } from 'app/intranet-academic-registration/Services/request-services.service';
import { MatDialog } from '@angular/material/dialog';
import { Activity, SubjectResponse } from '../models/Teacher';
import { EncuestaActivityComponent } from 'app/enrollment/Encuestas/encuesta-activity/encuesta-activity.component';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import Swal from 'sweetalert2';
import { ViewSurveyComponent } from 'app/enrollment/Encuestas/view-survey/view-survey.component';
import { EncuestaSubjectComponent } from 'app/enrollment/Encuestas/encuesta-subject/encuesta-subject.component';

@Component({
  selector: 'app-statistics-list',
  templateUrl: './statistics-list.component.html',
  styleUrls: ['./statistics-list.component.scss']
})
export class StatisticsListComponent  extends UnsubscribeOnDestroyAdapter
implements OnInit {


displayedColumns = [
  'name',
  'numOfCredits',
  'numOfHours',
  'numOfClasses',
  'hasLaboratory',
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

processList = [
  { id: 1, name: 'Formación Especializada' },
  { id: 2, name: 'Entrenamiento' },

];
user!: User;
cedula!: string;
DataSubjects!: any;
//subjects:Subject[] = [];
DataActivities!: any;
//activities:Activity[] = [];
// docForm!: UntypedFormGroup;
view: boolean = false;
selectedOption: number = 2;
noDataMessage:string="No se encontraron resultados";

public typeUser: string = '';
idCareer!: number;
from!: string | null;
constructor(public _teacherService: TeacherService,
  private authenticationService: AuthService,
  private _nav: Router,
  private fb: UntypedFormBuilder,
  public _RequestService: RequestServicesService,
  private activatedRoute: ActivatedRoute,
  public dialog: MatDialog,
) {

  super();
 
}
ngOnInit() {
  this.user = this.authenticationService.currentUserValue;
  this.typeUser = this._RequestService.getRoleFromToken(this.user.token);
  this.cedula = this.activatedRoute.snapshot.params["cedula"];
  if (this.typeUser != 'Profesor') {
    this.displayedColumns.splice(5, 1);
    this.displayedColumns2.splice(5, 1);

  }
  this.idCareer = Number(localStorage.getItem("idCareer"));
  
  
  if (this.cedula == undefined) {
    localStorage.setItem('carrer',"0");
    this.cedula = this.user.cedula;
    this.getSubjects();
    this.getActivities();

  } if (this.cedula != undefined && this.cedula != '') {
    localStorage.setItem('carrer',"1");
    this.cedula = this.user.cedula;
    this.getSubjects();
    this.getActivities();
  }
  this.from=localStorage.getItem("carrer");
  
}


viewTable(id: number) {
  console.log('====================================');
  console.log(id);
  console.log('====================================');
  localStorage.setItem('tipoSolicitud', id.toString());
  if (id == 1) {
    this.view = true;

  } else {
    this.view = false;

  }
}

calificacionesActividades(row: Activity) {
  // console.log(row);
  localStorage.setItem('actividadEscogida', row.name);
  localStorage.setItem('id', row.id.toString());
  localStorage.setItem('tipoSolicitud', "2");
  this._nav.navigate(['/teaching-management/detail-asignatura/', row.id]);
}

volverAtras() {
  this._nav.navigate(['/teaching-management/career-list/']);
}


calificacionesAasignatura(row: SubjectResponse) {
  localStorage.setItem('tipoSolicitud', "1");
  localStorage.setItem('actividadEscogida', row.subjectName);
  localStorage.setItem('id', row.subjectId.toString());
  this._nav.navigate(['/teaching-management/detail-asignatura/', row.subjectId]);
}

Detail(row: SubjectResponse) {
  localStorage.setItem('tipoSolicitud', "1");
  localStorage.setItem('actividadEscogida', row.subjectName);
  localStorage.setItem('id', row.subjectId.toString());
  this._nav.navigate(['/teaching-management/detail-subject/', row.subjectId]);
}
Detail2(row: Activity) {
  localStorage.setItem('tipoSolicitud', "2");
  localStorage.setItem('actividadEscogida', row.name);
  localStorage.setItem('id', row.id.toString());
  this._nav.navigate(['/teaching-management/detail-subject/', row.id]);
}
async getSubjects() {

  this._teacherService.getSubjectsByCedulaNewApi(this.cedula, this.idCareer).subscribe({
    next: (res) => {

      this.DataSubjects = res;
      console.log(this.DataSubjects);

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


ViewSurveySub(row: SubjectResponse) {

  const dialogRef = this.dialog.open(ViewSurveyComponent, {
    data: {
      activity: null,
      action: "S",
      subject: row,
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


calificacionFinalSubject(row: SubjectResponse) {
  localStorage.setItem('tipoSolicitud', "1");
  localStorage.setItem('actividadEscogida', row.subjectName);
  localStorage.setItem('id', row.subjectId.toString());
  this._nav.navigate(['/teaching-management/list-students/', row.subjectId]);
}

calificacionFinalActivity(row: Activity) {
  localStorage.setItem('tipoSolicitud', "2");
  localStorage.setItem('actividadEscogida', row.name);
  localStorage.setItem('id', row.id.toString());
  this._nav.navigate(['/teaching-management/list-students//', row.id]);

}



sendEncuestaSubject(row: SubjectResponse) {
  console.log('====================================');
  console.log(row);
  console.log('====================================');
  const dialogRef = this.dialog.open(EncuestaSubjectComponent, {
    data: {
      subject: [],
      action: 'encuesta',
      typeUser: 'Profesor',
      docente: this.cedula,
      id_asignatura: row.subjectId,
      subjectRow: row
    },
    width: '1200px',
    disableClose: true
  });

  this.subs.sink = dialogRef.afterClosed().subscribe((result: ResponseMessageMaestra) => {
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

}


