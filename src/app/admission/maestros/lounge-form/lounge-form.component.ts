import { Component, Inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Lounge } from 'app/admission/models/lounge';
import { MasterService } from '../services/master.service';
export interface DialogData {
  id: string;
  action: string;
  lounge: Lounge;
}
@Component({
  selector: 'app-lounge-form',
  templateUrl: './lounge-form.component.html',
  styleUrls: ['./lounge-form.component.scss']
})
export class LoungeFormComponent {

  action: string;
  dialogTitle: string;
  loungeForm: UntypedFormGroup;
  lounge: Lounge;
  constructor(
    public dialogRef: MatDialogRef<LoungeFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public loungeService: MasterService,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle ="Editar salón";
      this.lounge = data.lounge;
    } else {
      this.dialogTitle = 'Crear salón';
      this.lounge = new Lounge();
      this.lounge.statusId=1;
    }
    this.loungeForm = this.createContactForm();
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
      id: [this.lounge.id],
      name: [this.lounge.name, [Validators.required]],
      description: [this.lounge.description, [Validators.required]],
      statusId: [this.lounge.statusId, [Validators.required]],
     
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    if  (this.action==='edit'){
    this.loungeService.updateLounge(
      this.loungeForm.getRawValue()
    ); }else{
      this.loungeService.addLounge(
        this.loungeForm.getRawValue()
      );
    }
  
  }
}

