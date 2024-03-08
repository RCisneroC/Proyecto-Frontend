import { Component, Inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Lounge } from 'app/admission/models/lounge';
import { MasterService } from '../services/master.service';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { RoomDependencies } from 'app/admission/models/RoomDependencies';
import { HttpErrorResponse } from '@angular/common/http';
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
export class LoungeFormComponent implements OnInit {
  public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message:''
  }
  action: string;
  dialogTitle: string;
  loungeForm: UntypedFormGroup;
  lounge: Lounge;
  public lstDependencies: RoomDependencies[] = [];

  constructor(
    public dialogRef: MatDialogRef<LoungeFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public loungeService: MasterService,
    private fb: UntypedFormBuilder,
    private cb:ChangeDetectorRef
  ) {

    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle ="Editar salón";
      this.lounge = data.lounge;
    } else {
      this.dialogTitle = 'Nuevo salón';
      this.lounge = new Lounge();
      this.lounge.statusId=1;
    }
    this.loungeForm = this.createContactForm();

  }

  ngOnInit(): void {
    this.getDependences();
    this.loungeForm.controls["dependencia"].patchValue(this.lounge.facilityDependencyCode?.toString());
    this.cb.detectChanges();
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
      dependencia :['', [Validators.required]],
    });
  }

  onNoClick(): void {
    this.ResponseMessage.CodError = 0;
    this.ResponseMessage.Message = "";
    this.dialogRef.close(this.ResponseMessage);
  }
  public confirmAdd(): void {
    const nombreDependencia : string | undefined = this.lstDependencies.find( (f)=> f.codigo_dependencia === this.loungeForm.controls["dependencia"].value)?.nombre_dependencia;
    const loungeObj = new Lounge;
    loungeObj.id = parseInt(this.loungeForm.controls["id"].value);
    loungeObj.name = this.loungeForm.controls["name"].value;
    loungeObj.statusId = parseInt(this.loungeForm.controls["statusId"].value);
    loungeObj.description = this.loungeForm.controls["description"].value;
    loungeObj.facilityDependencyCode = parseInt(this.loungeForm.controls["dependencia"].value);
    loungeObj.facilityDependencyName = nombreDependencia;
    if  (this.action==='edit'){
      this.loungeService.updateLounge(loungeObj).subscribe({
          next: () => {
          this.loungeService.dialogData = loungeObj;
          this.ResponseMessage.CodError = 200;
          this.ResponseMessage.Message = 'Salón editado correctamente.';
          this.dialogRef.close(this.ResponseMessage);
          },
          error: (error: any) => {
            this.loungeService.isTblLoading = false;
            this.ResponseMessage.CodError = 500;
            this.ResponseMessage.Message = error;
            this.dialogRef.close(this.ResponseMessage);
          },
        });
    } else {
      this.loungeService.addLounge(loungeObj).subscribe({
        next: (res: any) => {
          this.loungeService.dialogData = loungeObj;
          this.ResponseMessage.CodError = 200;
          this.ResponseMessage.Message = 'Creado correctamente.';
          this.dialogRef.close(this.ResponseMessage);
        },
        error: (error: any) => {
          this.ResponseMessage.CodError = 500;
          this.ResponseMessage.Message = 'Faltan campos requeridos.';
          this.dialogRef.close(this.ResponseMessage);
          this.loungeService.isTblLoading = false;
        },
      });
    }

  }

  getDependences(){
      this.loungeService.getDependencies().subscribe(
        {
          next: (request) => {
            this.lstDependencies = request as RoomDependencies[];
          },
          error : (err:HttpErrorResponse) =>{
            console.log(err);
          }
        }
      );
  }
}

