import { Component, Inject, OnInit, ChangeDetectorRef , OnDestroy} from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { Teacher } from '../models/Teacher';
import { TeacherService } from '../services/teacher.service';
import { UserService } from 'app/security/user/service/user.service';
import { CallsTeachersService } from '../services/calls-teachers.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';


export interface DialogData {
  teacher: Teacher;
}

@Component({
  selector: 'app-eval-teacher',
  templateUrl: './eval-teacher.component.html',
  styleUrls: ['./eval-teacher.component.scss']
})
export class EvalTeacherComponent  implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  dialogTitle: string = '';
  EvalForm: UntypedFormGroup;
  public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message: '',
  }

  constructor(
    public dialogRef: MatDialogRef<EvalTeacherComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public _teacherService: TeacherService,
    public _userService: UserService,
    private fb: UntypedFormBuilder,
    private fbUser: UntypedFormBuilder,
    private cb: ChangeDetectorRef,
    private serviceCallsTeachersService:CallsTeachersService
  ) {
    // Set the defaults
    this.dialogTitle = "Evaluar al Docente"
    const value: number = 0;
    this.EvalForm = this.fb.group({
      teacherId: [data.teacher.teacherId, [Validators.required]],
      evaluation: [value, [Validators.required, Validators.min(1), Validators.max(10)]],
      commentEvaluation: ['', [Validators.required]],
    });

  }


  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe())
  }


  ngOnInit(): void {
    console.log("Inicio")
  }

  submit() {
  this.subscriptions.push(
  this.serviceCallsTeachersService.evalTeacher(this.EvalForm.getRawValue()).subscribe(
      {
        next: (request: any) => {
          console.log(request)
          this.ResponseMessage.CodError = 200;
          this.ResponseMessage.Message = "Evaluación guardada con  éxito.";
          this.dialogRef.close(this.ResponseMessage);
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
          this.ResponseMessage.CodError = 404;
          this.ResponseMessage.Message = "No se pudo guardar la evaluación.";
          this.dialogRef.close(this.ResponseMessage);
        }
    }
  )
);

}

}
