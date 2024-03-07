import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DegreeCurriculumDesign } from 'app/admission/FormalEducations/Models/Degree';
import { DegreeService } from 'app/admission/FormalEducations/Services/degree.service';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
export interface DialogData {
  id_carrera: string;
  accion: string;
  malla: DegreeCurriculumDesign;
}
@Component({
  selector: 'app-add-malla-curricular',
  templateUrl: './add-malla-curricular.component.html',
  styleUrls: ['./add-malla-curricular.component.scss']
})
export class AddMallaCurricularComponent implements OnInit {
  public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message: ''
  }
  action: string;
  dialogTitle: string = '';
  MallaForms: UntypedFormGroup;
  id_carrera: string = '';
  constructor(
    public dialogRef: MatDialogRef<AddMallaCurricularComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public _DegreeService: DegreeService,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    this.action = data.accion;
    console.log(data);
    if (this.action === 'add') {
      this.dialogTitle = "Nueva Malla Curricular";
      this.id_carrera = data.id_carrera;
    } else {
      this.dialogTitle = "Editar Malla Curricular";
      this.id_carrera = data.id_carrera;
    }
    this.MallaForms = this.fb.group({
      name: [data.malla.name, [Validators.required]],
      description: [data.malla.description, [Validators.required]],
      statusId: [data.malla.statusId, [Validators.required]],
      id: [data.malla.id],
      degreeId: [data.id_carrera, [Validators.required]],
      startDate: [data.malla.startDate, [Validators.required]],
      endDate: [data.malla.endDate, [Validators.required]],
    });
  }
  ngOnInit(): void {

  }

  submit() {
    if (this.action === 'add') {
      this._DegreeService.SaveCurriculumDesign(this.MallaForms.getRawValue()).subscribe({
        next: (res: any) => {
          this.ResponseMessage.CodError = 200;
          this.ResponseMessage.Message = 'Cargado correctamente.';
          this.dialogRef.close(this.ResponseMessage);
        },
        error: (err: any) => {
          this.ResponseMessage.CodError = 500;
          this.ResponseMessage.Message = "Intento Nuevamente.";
          this.dialogRef.close(this.ResponseMessage);
        }
      });
    } else {
      this._DegreeService.UpdateCurriculumDesign(this.MallaForms.getRawValue()).subscribe({
        next: (res: any) => {
          this.ResponseMessage.CodError = 200;
          this.ResponseMessage.Message = 'Editado correctamente.';
          this.dialogRef.close(this.ResponseMessage);
        },
        error: (err: any) => {
          this.ResponseMessage.CodError = 500;
          this.ResponseMessage.Message = "Intento Nuevamente.";
          this.dialogRef.close(this.ResponseMessage);
        }
      });
    }

  }
}
