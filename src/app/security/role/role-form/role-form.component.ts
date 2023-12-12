import { Component, Inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

import { Role } from 'app/security/models/role';
import { RoleService } from '../role-list/services/role.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MAT_DATE_LOCALE } from '@angular/material/core';


export interface DialogData {
  id: string;
  action: string;
  role: Role;
}
@Component({
  selector: 'app-role-form',
  templateUrl: './role-form.component.html',
  styleUrls: ['./role-form.component.scss'],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
})

export class RoleFormComponent {

  action: string;
  dialogTitle: string;
  roleForm: UntypedFormGroup;
  role: Role;
  constructor(
    public dialogRef: MatDialogRef<RoleFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public roleService: RoleService,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle =
        data.role.name;
      this.role = data.role;
    } else {
      this.dialogTitle = 'Crear rol';
      //const blankObject = {} as Role;
      this.role = new Role();
    }
    this.roleForm = this.createContactForm();
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
      id: [this.role.id],
      name: [this.role.name, [Validators.required]],
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    this.roleService.addAdvanceTable(
      this.roleForm.getRawValue()
    );
  }
}
