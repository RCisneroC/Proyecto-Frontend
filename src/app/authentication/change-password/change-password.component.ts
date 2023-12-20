import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '@core';
import { User } from '@core/models/user';
import { UnsubscribeOnDestroyAdapter } from '@shared';

import { UserService } from 'app/security/user/service/user.service';
import { DialogData } from 'app/security/user/user-form/user-form.component';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class  ChangePasswordComponent   extends UnsubscribeOnDestroyAdapter
implements OnInit {


  action?: string;
  dialogTitle?: string;
  userForm!: UntypedFormGroup;
  user!: User;
  
 
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
       // Set the defaults
     
         this.dialogTitle ="Cambiar contraseña";
         
         this.user =this.authenticationService.currentUserValue;
      
        this.userForm = this.createContactForm();
       
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
  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      id:[this.user.id, [Validators.required]],
      currentPassword:["", [Validators.required]],
      newPassword: ["", [Validators.required]],
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
   
      this.userService.changePassword(
        this.userForm.getRawValue()
      ); 
      
  }
  

  
}
