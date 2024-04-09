import { Component, Inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { Teacher } from '../models/Teacher';
import { TeacherService } from '../services/teacher.service';
import { UserService } from 'app/security/user/service/user.service';
import Swal from 'sweetalert2';
import { CallsTeachersService } from '../services/calls-teachers.service';
import { HttpErrorResponse } from '@angular/common/http';



export interface DialogData {
  id: string;
  teacher: Teacher;
  accion: string;
}
@Component({
  selector: 'app-aproved-teacher',
  templateUrl: './aproved-teacher.component.html',
  styleUrls: ['./aproved-teacher.component.scss']
})
export class AprovedTeacherComponent implements OnInit {
  public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message: '',
  }

  processList = [
    { id: "", name: 'Seleccione' },
    { id: "1", name: 'Formación Especializada' },
    { id: "2", name: 'Entrenamiento' },
    { id: "3", name: 'Ambos procesos' }
  ];

  contractTypeList = [
    { id: "", name: 'Seleccione' },
    { id: "T", name: 'Temporal' },
    { id: "P", name: 'Permanente' },
    { id: "N", name: 'No Aplica' }
  ];
  action: string;
  dialogTitle: string = '';
  ApprovedForm: UntypedFormGroup;
  UserForm: UntypedFormGroup;
  id_cronograma: number = 0;
  viewProcess!: boolean;
  public isCalls: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<AprovedTeacherComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public _teacherService: TeacherService,
    public _userService: UserService,
    private fb: UntypedFormBuilder,
    private fbUser: UntypedFormBuilder,
    private cb: ChangeDetectorRef,
    private serviceCallsTeachersService:CallsTeachersService
  ) {
    // Set the defaults
    this.action = data.accion;
    this.dialogTitle = "Aprobar solicitud de docente"
    this.ApprovedForm = this.fb.group({
      teacherId: [data.teacher.teacherId, [Validators.required]],
      process: ['', [Validators.required]],
      statusId: ['', [Validators.required]],
      approvalMessage: ['', [Validators.required]],
      contractType: ['']
    });

    this.UserForm = this.fbUser.group({
      id: [''],
      userName: ["Docente" + this.data.teacher.teacherId, [Validators.required]],
      firstName: [this.data.teacher.name, [Validators.required]],
      lastName: [this.data.teacher.lastName, [Validators.required]],
      cedula: [this.data.teacher.cedula, [Validators.required]],
      email: [this.data.teacher.email, [Validators.required]],
      phoneNumber: [this.data.teacher.phoneNumber, [Validators.required]],
      gender: [this.data.teacher.gender, [Validators.required]],
      dateOfBirth: [this.data.teacher.dateOfBirth, [Validators.required]],
      placeOfBirth: [this.data.teacher.placeOfBirth, [Validators.required]],
      placeOfResidence: [this.data.teacher.placeResidence, [Validators.required]],
      roles: [["Profesor"], [Validators.required]],
      isRegistered: [true, [Validators.required]],

    });

    this.viewProcess = false;


  }


  ngOnInit(): void {
    if(this.data.teacher.type != undefined){
      if(this.data.teacher.type == "C"){

        this.serviceCallsTeachersService.getCallsAvailableById(this.data.teacher.id!).subscribe(
          {
            next : (request)=>{
              this.ApprovedForm.controls["process"].patchValue(request.proceso!.toString());
              this.ApprovedForm.controls["process"].disable();
            },
            error :(err:HttpErrorResponse) =>{
              console.log(err)
            }
          }
        );

        this.ApprovedForm.controls["contractType"].setValidators([Validators.required]);
        this.ApprovedForm.controls["contractType"].updateValueAndValidity();
        this.isCalls = true;
        this.cb.detectChanges();
      }
    }
  }
  Valor(value: string) {

    this.viewProcess = value == "1" ? true : false;

  }

  submit() {
    let process;
    const status = this.ApprovedForm.get("statusId")?.value;
    const process1 = this.ApprovedForm.get("process")?.value;
    console.log(this.data);

    if (this.data.teacher.listSubject.length > 0 && this.data.teacher.listActivity.length > 0) {
      process = "3";
    } else if (this.data.teacher.listSubject.length > 0) {
      process = "1";
    } else if (this.data.teacher.listActivity.length > 0) {
      process = "2";
    } else {
      process = 0;
    }

    if (process != process1 && status == 1) {
      Swal.fire({
        title: "Escuela Judicial",
        text: "Verifique en el detalle de este profesor si el proceso asignado es igual al seleccionado",
        icon: "warning"
      });
    } else {

      this._teacherService.aprovedTeacher(this.ApprovedForm.getRawValue()).subscribe(
        (res) => {
          if (status == 1) {


            this._userService.addUser(this.UserForm.value).subscribe(
              (data) => {
                console.log(data)
                this.ResponseMessage.CodError = 200;
                this.ResponseMessage.Message = 'Aprobado correctamente.';
                this.dialogRef.close(this.ResponseMessage);
              },
              (error) => {
                this.ResponseMessage.CodError = 500;
                this.ResponseMessage.Message = error;
                this.dialogRef.close(this.ResponseMessage);
              })
          } else {
            this.ResponseMessage.CodError = 200;
            this.ResponseMessage.Message = 'Guardado correctamente.';
            this.dialogRef.close(this.ResponseMessage);
          }
        },
        (error) => {
          this.ResponseMessage.CodError = 500;
          this.ResponseMessage.Message = error;
          this.dialogRef.close(this.ResponseMessage);
        },
        () => {
          // this.ResponseMessage.CodError = 200;
          //    this.ResponseMessage.Message = 'Aprobado correctamente.';
          //    this.dialogRef.close(this.ResponseMessage);
          // La promesa se resolvió correctamente.
        }
      );

    }
  }
}

//    this._teacherService.aprovedTeacher(this.ApprovedForm.getRawValue()).subscribe({
//     next: () => {
//       this._userService.addUser(this.UserForm.value).subscribe({

//       next: () => {
//       this.ResponseMessage.CodError = 200;
//       this.ResponseMessage.Message = 'Aprobado correctamente.';
//       this.dialogRef.close(this.ResponseMessage);
//     }
//     });
//     },
//     error: (err) => {
//       this.ResponseMessage.CodError = 500;
//       this.ResponseMessage.Message = "Intento Nuevamente.";
//       this.dialogRef.close(this.ResponseMessage);
//     }
//   });




