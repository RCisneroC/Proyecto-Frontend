import { Component, Inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { Teacher } from '../models/Teacher';
import { TeacherService } from '../services/teacher.service';
import { UserService } from 'app/security/user/service/user.service';
import { map, switchMap } from 'rxjs';


export interface DialogData {
  id: string;
  teacher: Teacher;
  accion:string;
}
@Component({
  selector: 'app-aproved-teacher',
  templateUrl: './aproved-teacher.component.html',
  styleUrls: ['./aproved-teacher.component.scss']
})
export class AprovedTeacherComponent {
  public ResponseMessage: ResponseMessageMaestra = {
      CodError: 0,
      Message:''
  }
    
    action: string;
    dialogTitle: string='';
    ApprovedForm: UntypedFormGroup;
    UserForm: UntypedFormGroup;
    id_cronograma: number = 0;
    constructor(
      public dialogRef: MatDialogRef<AprovedTeacherComponent>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData,
      public _teacherService:TeacherService,
      public _userService:UserService,
      private fb: UntypedFormBuilder,
      private fbUser: UntypedFormBuilder
    ) {
      // Set the defaults
      this.action = data.accion;
      console.log(data);
      
      if (this.action === 'approved') {
        this.dialogTitle ="Aprobar Cronograma";
        //this.id_cronograma = data.scheduleActivity.id;
      }
      this.ApprovedForm = this.fb.group({
        teacherId: [data.teacher.teacherId,[Validators.required]],
        statusId:['',[Validators.required]],
        approvalMessage:['',[Validators.required]]
      });
      
     this.UserForm= this.fbUser.group({
        id: [''],
        userName: ["Docente"+this.data.teacher.teacherId, [Validators.required]],
        firstName: [this.data.teacher.name, [Validators.required]],
        lastName: [this.data.teacher.lastName, [Validators.required]],
        email: [this.data.teacher.email, [Validators.required]],
        phoneNumber: ["04248772488", [Validators.required]],
        gender:["M", [Validators.required]],
        roles:[["Profesor"], [Validators.required]],
      });
    }
    
    async login(): Promise<void> {
      // Realiza la solicitud HTTP
      const usuario = await this._teacherService.aprovedTeacher(this.ApprovedForm.getRawValue());
      
      if (!usuario) {
         this._userService.addUser(this.UserForm.value).subscribe({

          next: () => {
          this.ResponseMessage.CodError = 200;
          this.ResponseMessage.Message = 'Aprobado correctamente.';
          this.dialogRef.close(this.ResponseMessage);
        },
            error: (err) => {
              this.ResponseMessage.CodError = 500;
              this.ResponseMessage.Message = err;
              this.dialogRef.close(this.ResponseMessage);
            }
        });
      }else{
        
           
              this.ResponseMessage.CodError = 500;
             
              this.dialogRef.close(this.ResponseMessage);
          
      }
    }
    submit() {
     //this.login();

    
      
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
    //       this.ResponseMessage.Message = err;
    //       this.dialogRef.close(this.ResponseMessage);
    //     }
    //   });
     
  
  
  
