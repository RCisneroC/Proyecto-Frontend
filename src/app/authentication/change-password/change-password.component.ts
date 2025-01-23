import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import {  UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '@core';
import { User } from '@core/models/user';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { PasswordValidator } from 'app/CallsTeachers/models/PasswordValidator';

import { UserService } from 'app/security/user/service/user.service';
import { DialogData } from 'app/security/user/user-form/user-form.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class  ChangePasswordComponent   extends UnsubscribeOnDestroyAdapter
implements OnInit {

  public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message: ''
  }
  action?: string;
  dialogTitle?: string;
  userForm!: UntypedFormGroup;
  user!: User;
  showPasswordCriteria=false;
  passwordValidations: any = {};
constructor(
  public dialogRef: MatDialogRef<ChangePasswordComponent>,
  @Inject(MAT_DIALOG_DATA) public data: DialogData,
  public userService: UserService,
  private authenticationService: AuthService,
  private fb: UntypedFormBuilder
) {
  super();
  
  
 
}


  ngOnInit() {
    this.dialogTitle = "Cambiar contraseña";
    this.user = this.authenticationService.currentUserValue;
    this.userForm = this.createContactForm();

    const newPasswordControl = this.userForm.get('newPassword');
    newPasswordControl?.valueChanges.subscribe((value: string) => {
      const validationResult = PasswordValidator.strongPasswordValidator()(newPasswordControl);
      this.passwordValidations = validationResult ? validationResult['passwordStrength'] : {
        hasUpperCase: /[A-Z]/.test(value),
        hasLowerCase: /[a-z]/.test(value),
        hasNumeric: /[0-9]/.test(value),
        hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(value),
        isValidLength: value.length >= 8
      };
    });
  }








  formControl = new UntypedFormControl('', [
    Validators.required,
    // Validators.email,
  ]);
  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Required field'
      : this.formControl.hasError('email')
      ? 'Not a valid email'
      : '';
  }
  



  hasInvalidCriteria(): boolean {
    return !this.passwordValidations.hasUpperCase || !this.passwordValidations.hasLowerCase || !this.passwordValidations.hasNumeric || !this.passwordValidations.hasSpecial || !this.passwordValidations.isValidLength;
  }

  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      id:[this.user.id, [Validators.required]],
      currentPassword:["", [Validators.required]],
      newPassword: ['', [Validators.required,PasswordValidator.strongPasswordValidator()]],
      confirmPassword:["", [Validators.required]],
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
   
      this.userService.changePassword(this.userForm.getRawValue()).subscribe({
        next: (res:any) => {
          console.log(res);
          if(res.message == 'Password actual incorrecto'){
            this.ResponseMessage.CodError = 200;
            this.ResponseMessage.Message = res.message; 
            Swal.fire({
              title: "Escuela Judicial",
              text: 'Password actual incorrecto.',
              icon: "warning"
            });
          }else{
            this.ResponseMessage.CodError = 200;
          this.ResponseMessage.Message = res.message;
          this.dialogRef.close(this.ResponseMessage);
          }
          
        },
        error: (error: HttpErrorResponse) => { 
          Swal.fire({
            title: "Escuela Judicial",
            text: error.error.Details,
            icon: "warning"
          }); 
        },
      });
      
  }

}
