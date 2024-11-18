import { Component, Inject } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { TaskSubject } from '../models/Teacher';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService, User } from '@core';
import { AcademicRecord, CalificacionEstudiante, Student } from '../models/Asistencias';
import { TeacherService } from '../services/teacher.service';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
export interface DialogData {
  id: string;
  accion: string;
  student: Student;
  studentId: number;
  participantId: string;
  taskSubject: TaskSubject
}



export interface RespuestaServicio {
  id: number;
  ///edad: number;
}
@Component({
  selector: 'app-add-calif',
  templateUrl: './add-calif.component.html',
  styleUrls: ['./add-calif.component.scss']
})
export class AddCalifComponent {
  public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message: ''
  }
  public _CalificacionEstudiante: CalificacionEstudiante[] = [];
  public _CalificacionEstudianteUser: CalificacionEstudiante[] = [];
  public _CalificacionEstudianteOne: CalificacionEstudiante = {
    statusId: 0,
    startDate: new Date(),
    idEstudiante: '',
    cedula: '',
    name: '',
    lastname: '',
    id: 0,
    idasignatura: '',
    docente: '',
    type: '',
    calificacion: '',
    nameTarea: '',
    idTask: 0,
  }

  action: string;
  dialogTitle: string = '';
  FormsCalificacion!: UntypedFormGroup;
  student!: Student;
  id!: number;

  constructor(
    public dialogRef: MatDialogRef<AddCalifComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: UntypedFormBuilder,
    public _TeacherService: TeacherService,
    public authservice: AuthService,
    private activatedRoute: ActivatedRoute
  ) {
    // Set the defaults
    console.log('====================================');
    console.log(data.taskSubject);
    console.log('====================================');
    this.action = data.accion;
    this.activatedRoute.params.subscribe((params) => {

      this.id = params['id'];
    });
    if (this.action == 'add-calificacion') {
      this.dialogTitle = "Agregar calificación";

    } else if (this.action == 'view') {
      this.dialogTitle = "Ver calificación";
      this.student = data.student;
      //this.getCalificacion();
      this.FormsCalificacion = this.createContactForm();
      let local = localStorage.getItem('tipoSolicitud') || '';
    
      if (local != '') {
        if (local == "1") {
          this.getCalificacionSubj();
        } else {
          this.getCalificacionActi();
        }
      }


    }

    this.student = data.student;

    this.FormsCalificacion = this.createContactForm();
    //this.getRecordAcademic();
  }


  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      calif: new FormControl('', Validators.required),

    });
  }



  getRecordAcademic() {
    console.log('====================================');
    console.log(this.data.student);
    console.log('====================================');
    const data = {
      subjectId: this.data.student.asignaturaId,
      studentId: this.data.student.studentId,
      degreeCurriculumDesignId: this.data.student.degreeCurriculumDesignId,
    }

    this._TeacherService.GetAcademicSubject(data).subscribe(
      (res: AcademicRecord) => {
        console.log(res);

        if (res["data"].length == 0) {
          this.ResponseMessage.CodError = 500;
          this.ResponseMessage.Message = "Estudiante sin registro academico";
          this.dialogRef.close(this.ResponseMessage);
          return;
        }
        const datos = {
          academicSubjectRecordId: res["data"][0].id,
          score: this.FormsCalificacion.get("calif")?.value,
          scoreTypeId: 1,
          subjectTaskId: this.data.taskSubject.id,
        }
        this._TeacherService.AddCalifTask(datos).subscribe(
          (data) => {
            console.log(data)
            this.ResponseMessage.CodError = 200;
            this.ResponseMessage.Message = 'calificacion correctamente.';
            this.dialogRef.close(this.ResponseMessage);
          },
          (error) => {
            this.ResponseMessage.CodError = 500;
            this.ResponseMessage.Message = error;
            this.dialogRef.close(this.ResponseMessage);
          })
      }
    )
  }

  getCalificacionSubj() { 
    const idGeneral = Number(localStorage.getItem('id')) || 0;
    const data = {
      subjectId: idGeneral,
      studentId: this.data.student.studentId,
      degreeCurriculumDesignId: this.data.student.degreeCurriculumDesignId,
    }

    this._TeacherService.GetAcademicSubject(data).subscribe(
      (res: AcademicRecord) => {
        console.log(res);

        if (res["data"].length == 0) {
          this.ResponseMessage.CodError = 500;
          this.ResponseMessage.Message = "Estudiante sin registro academico";
          this.dialogRef.close(this.ResponseMessage);
          return;
        }
        const datos = {
          academicSubjectRecordId: res["data"][0].id,
          subjectTaskId: this.data.taskSubject.id,
        }


        this._TeacherService.GetCalifSubject(datos).subscribe(
          (data: any) => {
            this._CalificacionEstudianteOne.calificacion = data.data[0]?.score;


          },
          (error) => {
            this.ResponseMessage.CodError = 500;
            this.ResponseMessage.Message = error;
            this.dialogRef.close(this.ResponseMessage);
          })
      }
    )
  }

  getCalificacionActi() {
    const idGeneral = Number(localStorage.getItem('id')) || 0;
    const data = {
      activityId: idGeneral,
      participantId: this.data.participantId,
    }

    this._TeacherService.GetAcademicActivity(data).subscribe(
      (res: AcademicRecord) => {
        console.log(res);

        if (res["data"].length == 0) {
          this.ResponseMessage.CodError = 500;
          this.ResponseMessage.Message = "Participante sin registro academico";
          this.dialogRef.close(this.ResponseMessage);
          return;
        }

        const datos = {
          ecAcademicRecordId: res["data"][0]?.id,
          activityTaskId: this.data.taskSubject.id,
        }


        this._TeacherService.GetCalifActi(datos).subscribe(
          (data: any) => {
            this._CalificacionEstudianteOne.calificacion = data.data[0]?.score;


          },
          (error) => {
            this.ResponseMessage.CodError = 500;
            this.ResponseMessage.Message = error;
            this.dialogRef.close(this.ResponseMessage);
          })
      }
    )
  }



  getRecordAcademicAct() {

    const idGeneral = Number(localStorage.getItem('id')) || 0;
    const data = {
      activityId: idGeneral,
      participantId: this.data.participantId,
    }


    this._TeacherService.GetAcademicActivity(data).subscribe(
      (res: AcademicRecord) => {
        console.log(res);
        if (res["data"].length == 0) {
          this.ResponseMessage.CodError = 500;
          this.ResponseMessage.Message = "Participante sin registro academico";
          this.dialogRef.close(this.ResponseMessage);
          return;
        }

        const datos = {
          ecAcademicRecordId: res["data"][0]?.id,
          score: this.FormsCalificacion.get("calif")?.value,
          scoreTypeId: 1,
          activityTaskId: this.data.taskSubject.id,
        }
        this._TeacherService.AddCalifTaskActi(datos).subscribe(
          (data) => {
            console.log(data)
            this.ResponseMessage.CodError = 200;
            this.ResponseMessage.Message = 'calificacion correctamente.';
            this.dialogRef.close(this.ResponseMessage);
          },
          (error:HttpErrorResponse) => { 
            this.ResponseMessage.CodError = 500;
            this.ResponseMessage.Message = error.error.Message;
            this.dialogRef.close(this.ResponseMessage);
          })
      }
    )
  }



  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {


    let local = localStorage.getItem('tipoSolicitud') || '';
    if (local != '') {
      if (local == "1") {
        this.getRecordAcademic();
      } else {
        this.getRecordAcademicAct()
      }
    }

    // let type = localStorage.getItem('tipoSolicitud') || '1';
    // let local = localStorage.getItem('calificaciones') || '';
    // console.log(local);

    // if (local != '') {
    //   this._CalificacionEstudiante = JSON.parse(local);
    //   let existe = this._CalificacionEstudiante.filter(x => x.cedula == this.data.user.cedula && x.idasignatura == this.data.taskSubject.idAsignatura && x.idTask == this.data.taskSubject.id);
    //   if (existe.length > 0) {
    //     this.ResponseMessage.CodError = 500;
    //     this.ResponseMessage.Message = 'Ya mantiene una calificación.';
    //     this.dialogRef.close(this.ResponseMessage);
    //   } else {
    //     this._CalificacionEstudianteOne = {
    //       statusId: 1,
    //       startDate: new Date(),
    //       idEstudiante: this.data.user.id,
    //       cedula: this.data.user.cedula,
    //       name: this.data.user.firstName,
    //       lastname: this.data.user.lastName,
    //       id: this._CalificacionEstudiante.length + 1,
    //       idasignatura: this.data.taskSubject.idAsignatura,
    //       docente: this.authservice.currentUserValue.firstName + ' ' + this.authservice.currentUserValue.firstName,
    //       type: type,
    //       calificacion: this.FormsCalificacion.controls['calif'].value,
    //       nameTarea: this.data.taskSubject.Titulo,
    //       idTask: this.data.taskSubject.id
    //     };
    //     this._CalificacionEstudiante.push(this._CalificacionEstudianteOne);
    //     localStorage.setItem('calificaciones', JSON.stringify(this._CalificacionEstudiante));
    //     this.ResponseMessage.CodError = 200;
    //     this.ResponseMessage.Message = 'Calificación creada correctamente..';
    //     this.dialogRef.close(this.ResponseMessage);
    //   }


    // } else {
    //   this._CalificacionEstudianteOne = {
    //     statusId: 1,
    //     startDate: new Date(),
    //     idEstudiante: this.data.user.id,
    //     cedula: this.data.user.cedula,
    //     name: this.data.user.firstName,
    //     lastname: this.data.user.lastName,
    //     id: 1,
    //     idasignatura: this.data.taskSubject.idAsignatura,
    //     docente: this.authservice.currentUserValue.firstName + ' ' + this.authservice.currentUserValue.firstName,
    //     type: type,
    //     calificacion: this.FormsCalificacion.controls['calif'].value,
    //     nameTarea: this.data.taskSubject.Titulo,
    //     idTask: this.data.taskSubject.id
    //   };
    //   this._CalificacionEstudiante.push(this._CalificacionEstudianteOne);
    //   localStorage.setItem('calificaciones', JSON.stringify(this._CalificacionEstudiante))
    //   console.log(this._CalificacionEstudianteOne);

    // }
  }


}



