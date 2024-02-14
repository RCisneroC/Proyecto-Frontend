import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PlanStudyActivity } from 'app/admission/models/PlanStudyActivity';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { ActivityDetailService } from 'app/admission/services/activity-detail.service';
import { VerificarBS64Pipe } from 'app/pipes/verificar-bs64.pipe';
export interface DialogData {
  id_actividad: string;
  accion: string;
  PlanStudy: PlanStudyActivity
}
@Component({
  selector: 'app-create-plan-study-forms',
  templateUrl: './create-plan-study-forms.component.html',
  styleUrls: ['./create-plan-study-forms.component.scss']
})
export class CreatePlanStudyFormsComponent implements OnInit {
  public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message: ''
  }


  action: string;
  dialogTitle: string = '';
  EditPlanStudyForms: UntypedFormGroup;
  id_actividad: string = '';


  public IsLoading: boolean = true;
  constructor(
    public dialogRef: MatDialogRef<CreatePlanStudyFormsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: UntypedFormBuilder,
    public _dialog: MatDialog,
    public _ActivityDetailService: ActivityDetailService,
    public _verificarBS64: VerificarBS64Pipe
  ) {
    // Set the defaults
    this.action = data.accion;
    console.log(data);

    if (this.action === 'edit-plans') {
      this.dialogTitle = "Editar Plan de Estudio";
      this.id_actividad = data.id_actividad;
    } else if (this.action === 'add-plans') {
      this.dialogTitle = "Agregar Plan de Estudio";
      this.id_actividad = data.id_actividad;
    }

    this.EditPlanStudyForms = this.fb.group({
      StatusId: [data.PlanStudy.statusId, [Validators.required]],
      Id: [data.PlanStudy.id, [Validators.required]],
      ActivityId: [data.id_actividad, [Validators.required]],
      Name: [data.PlanStudy.name, [Validators.required]],
      Description: [data.PlanStudy.description, [Validators.required]],
      CourseOutline: ['']
    });
  }
  ngOnInit(): void {

  }

  submit() {
    let FormsData = new FormData();
    FormsData.append('StatusId', this.EditPlanStudyForms.controls['StatusId'].value);
    FormsData.append('Id', this.EditPlanStudyForms.controls['Id'].value);
    FormsData.append('ActivityId', this.EditPlanStudyForms.controls['ActivityId'].value);
    FormsData.append('Name', this.EditPlanStudyForms.controls['Name'].value);
    FormsData.append('Description', this.EditPlanStudyForms.controls['Description'].value);
    FormsData.append('CourseOutline', this.EditPlanStudyForms.controls['CourseOutline'].value);
    if (this.data.accion == 'edit-plans') {
      this._ActivityDetailService.UpdateStudyPlan(FormsData).subscribe({
        next: (res: any) => {
          this.ResponseMessage.CodError = 200;
          this.ResponseMessage.Message = 'Cargado correctamente.';
          this.dialogRef.close(this.ResponseMessage);
        },
        error: (err: any) => {
          this.ResponseMessage.CodError = 500;
          this.ResponseMessage.Message = err;
          this.dialogRef.close(this.ResponseMessage);
        }
      });
    } else {
      this._ActivityDetailService.CreateStudyPlan(FormsData).subscribe({
        next: (res: any) => {
          this.ResponseMessage.CodError = 200;
          this.ResponseMessage.Message = 'Cargado correctamente.';
          this.dialogRef.close(this.ResponseMessage);
        },
        error: (err: any) => {
          this.ResponseMessage.CodError = 500;
          this.ResponseMessage.Message = err;
          this.dialogRef.close(this.ResponseMessage);
        }
      });
    }

  }

}
