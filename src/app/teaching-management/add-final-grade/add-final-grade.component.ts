import { Component, Inject } from '@angular/core';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { Student } from '../models/Asistencias';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TeacherService } from '../services/teacher.service';
import Swal from 'sweetalert2';
export interface DialogData {
  accion: string;
  studentId: number;
  participantId: string;
  id: string;
  tipo_solicitud: string;
  mallaId: number;
}

@Component({
  selector: 'app-add-final-grade',
  templateUrl: './add-final-grade.component.html',
  styleUrls: ['./add-final-grade.component.scss']
})
export class AddFinalGradeComponent {
  public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message: ''
  }

  action: string;
  dialogTitle: string = '';
  FormsCalificacion!: UntypedFormGroup;
  student!: Student;
  id!: number;

  constructor(
    public dialogRef: MatDialogRef<AddFinalGradeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: UntypedFormBuilder,
    public _ServiceTecher: TeacherService
  ) {
    // Set the defaults
    console.log('====================================');
    console.log(data);
    console.log('====================================');
    this.action = data.accion;

    if (this.action == 'add') {
      this.dialogTitle = "Agregar nota final";
      if (data.tipo_solicitud == '2') {
        this.SearchECAcademicRecord();
      }
      if (data.tipo_solicitud == '1') {
        this.SearchECAcademicRecord();
      }

    } else if (this.action == 'view') {
      // this.dialogTitle = "Ver calificación";
      // this.student = data.student;
      // //this.getCalificacion();
      // this.FormsCalificacion = this.createContactForm();
      // let local = localStorage.getItem('tipoSolicitud') || '';
      // if (local != '') {
      //   if (local == "1") {
      //     this.getCalificacionSubj();
      //   } else {
      //     this.getCalificacionActi();
      //   }
      // }
    }
    this.FormsCalificacion = this.createContactForm();
    //this.getRecordAcademic();
  }


  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      calif: new FormControl('', Validators.required),

    });
  }
  confirmAdd() {
    let paso: boolean = false;
    if (this.FormsCalificacion.controls['calif'].value > 0) {

      if (this.data.tipo_solicitud == "2") {
        let dataSearch = {
          activityId: this.data.id,
          participantId: this.data.participantId
        }
        this._ServiceTecher.GetAcademicActivity(dataSearch).subscribe({
          next: (res) => {
            if (res.data.length > 0) {
              if (this.FormsCalificacion.controls['calif'].value > 60) {
                paso = true;
              }
              let datasend = {
                isReentry: false,
                isPracticeApproved: paso,
                isFinalProjectApproved: paso,
                isActivityApproved: paso,
                certificateId: null,
                finalScore: this.FormsCalificacion.controls['calif'].value,
                id: res.data[0].id
              };
              this._ServiceTecher.UpdateECAcademicRecord(datasend).subscribe({
                next: (res) => {
                  console.log(res);
                  this.ResponseMessage.CodError = 200;
                  this.ResponseMessage.Message = 'Ingresado correctamente.';
                  this.dialogRef.close(this.ResponseMessage);
                }, error: (err) => {
                  console.log(err);
                  this.ResponseMessage.CodError = 500;
                  this.ResponseMessage.Message = 'Intente nuevamente.';
                  this.dialogRef.close(this.ResponseMessage);
                }
              })
            }
          }
        });
      } else if (this.data.tipo_solicitud == "1") {

      }
    }
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  SearchECAcademicRecord() {
    let dataSearch = {
      activityId: this.data.id,
      participantId: this.data.participantId
    }
    console.log(dataSearch);

    this._ServiceTecher.GetAcademicActivity(dataSearch).subscribe({
      next: (res) => {
        if (res.data.length == 0) {
          Swal.fire({
            title: "Escuela Judicial",
            text: 'No mantiene Record Academico',
            icon: "warning"
          });
          this.dialogRef.close();
        } else {
          if (res.data[0].finalScore > 0) {
            this.FormsCalificacion.controls['calif'].setValue(res.data[0].finalScore)
          }
        }
      }
    });
  }
}

