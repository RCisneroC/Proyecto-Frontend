import { Component, Inject } from '@angular/core';
import { UserService } from '../service/user.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { User } from '@core';
import { RoleService } from 'app/security/role/role-list/services/role.service';
import { Role } from 'app/security/models/role';
import { HttpErrorResponse } from '@angular/common/http';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';


export interface DialogData {
  id: string;
  action: string;
  user: User;
}
@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent {
public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message:''
}
  action: string;
  dialogTitle: string;
  userForm: UntypedFormGroup;
  user: User;
  roleList!: Role[];
 
  constructor(
    private _roleService: RoleService,
    public dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public userService: UserService,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle ="Editar usuario";
      
      this.user = data.user;
    } else {
      
      this.dialogTitle = 'Crear usuario';
      this.user = new User();
      this.user.statusId=1;
    }
    this.userForm = this.createContactForm(this.action);
    // this._roleService.getAllRols();
    // this.roleList =this._roleService.data.map((x)=>x
    // );
   this.loadRol();
    
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
  createContactForm(acc:string): UntypedFormGroup {
    let rol = '';
    if (acc != 'edit') {
      rol = '';
    } else {
      
      rol = this.user.roles[0];
    }
    return this.fb.group({
      id: [this.user.id],
      userName: [this.user.userName, [Validators.required]],
      firstName: [this.user.firstName, [Validators.required]],
      lastName: [this.user.lastName, [Validators.required]],
      email: [this.user.email, [Validators.required]],
      phoneNumber: [this.user.phoneNumber, [Validators.required]],
      statusId:[this.user.statusId, [Validators.required]],
      gender:["M", [Validators.required]],
      roles:[rol, [Validators.required]],
      isRegistered:[true, [Validators.required]],
    });
  }
  

  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
   this.userForm.controls['roles'].setValue([this.userForm.controls['roles'].value])
    if  (this.action==='edit'){
      this.userService.updateUser(
        this.userForm.getRawValue())
        .subscribe({
          next: () => {
            this.ResponseMessage.CodError = 200;
            this.ResponseMessage.Message = 'Editado correctamente.';
            this.dialogRef.close(this.ResponseMessage);
          },
          error: (error: HttpErrorResponse) => {
            this.userService.isTblLoading = false;
            this.ResponseMessage.CodError = 500;
            this.ResponseMessage.Message = 'Intente nuevamente..';
            this.dialogRef.close(this.ResponseMessage);
          },
        });
    } else {
        this.userService.addUser(
          this.userForm.getRawValue()).subscribe({
          next: () => {
            this.ResponseMessage.CodError = 200;
            this.ResponseMessage.Message = 'Editado correctamente.';
            this.dialogRef.close(this.ResponseMessage);
          },
          error: (error: HttpErrorResponse) => {
            this.userService.isTblLoading = false;
            this.ResponseMessage.CodError = 500;
            this.ResponseMessage.Message = 'Intente nuevamente..';
            this.dialogRef.close(this.ResponseMessage);
          },
        });
      }
      
  }
  
  loadRol() {
    this._roleService.getAllRols2().subscribe({
      next: (data) => {
      this.roleList=data;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
      },
    });
  }
  

}
