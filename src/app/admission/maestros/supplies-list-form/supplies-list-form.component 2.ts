import { Component, Inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ResponseGenerica, ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { Supplies } from 'app/admission/models/supplies';
import { SuppliesService } from '../services/supplies.service';

export interface DialogData {
  id: string;
  action: string;
  supplies : Supplies;
}
@Component({
  selector: 'app-supplies-list-form',
  templateUrl: './supplies-list-form.component.html',
  styleUrls: ['./supplies-list-form.component.scss']
})
export class SuppliesListFormComponent {
public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message:''
  }
  public action: string;
  public dialogTitle: string;
  public suppliesForm: UntypedFormGroup;
  public supplies: Supplies = {
    id: 0,
    description: '',
    name: '',
    statusId:1
  }
  constructor(
    public dialogRef: MatDialogRef<SuppliesListFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public suppliesService: SuppliesService,
    private fb: UntypedFormBuilder
  ) {
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle ="Editar Suplemento de actividad";
      this.supplies = data.supplies;
    } else {
      this.dialogTitle = 'Nueva Suplemento de actividad';
    }
    this.suppliesForm = this.createContactForm();
  }


    createContactForm(): UntypedFormGroup {
    return this.fb.group({
      id: [this.supplies.id],
      name: [this.supplies.name, [Validators.required]],
      description: [this.supplies.description],
      statusId: [this.supplies.statusId, [Validators.required]],
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
      this.suppliesService.updateSupplies(this.suppliesForm.getRawValue())
        .subscribe({
          next: (res:ResponseGenerica) => {
            this.ResponseMessage.CodError = 200;
            this.ResponseMessage.Message = 'Editado correctamente.';
           this.dialogRef.close(this.ResponseMessage);
          },
          error: (err:any) => {
            this.ResponseMessage.CodError = 200;
            this.ResponseMessage.Message = 'Intente nuevamente.';
            this.dialogRef.close(this.ResponseMessage);
          }
      });
          
    } else {
      this.suppliesService.addSupplies(this.suppliesForm.getRawValue())
      .subscribe({
          next: (res:ResponseGenerica) => {
            this.ResponseMessage.CodError = 200;
            this.ResponseMessage.Message = 'Creado correctamente.';
           this.dialogRef.close(this.ResponseMessage);
          },
          error: (err:any) => {
            this.ResponseMessage.CodError = 200;
            this.ResponseMessage.Message = 'Intente nuevamente.';
            this.dialogRef.close(this.ResponseMessage);
          }
      });
    }
  }
}
