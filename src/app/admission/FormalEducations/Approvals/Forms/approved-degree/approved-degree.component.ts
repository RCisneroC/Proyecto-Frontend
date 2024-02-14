import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { Degree } from 'app/admission/FormalEducations/Models/Degree';
import { DegreeService } from 'app/admission/FormalEducations/Services/degree.service';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
export interface DialogData {
  malla: Degree;
  accion: string;
}
@Component({
  selector: 'app-approved-degree',
  templateUrl: './approved-degree.component.html',
  styleUrls: ['./approved-degree.component.scss']
})
export class ApprovedDegreeComponent {
  public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message: ''
  }

  action: string;
  dialogTitle: string = '';
  ApprovedForm: UntypedFormGroup;
  id_plan_anuel: number = 0;
  constructor(
    public dialogRef: MatDialogRef<ApprovedDegreeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public _DegreeService: DegreeService,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    this.action = data.accion;

    if (this.action === 'approved') {
      this.dialogTitle = "Aprobar Malla Curricular";
      this.id_plan_anuel = data.malla.id;
    }
    this.ApprovedForm = this.fb.group({
      Ids: [[data.malla.id], [Validators.required]],
      isApproved: ['', [Validators.required]],
      approvalMessage: ['', [Validators.required]]
    });
  }
  submit() {
    if (this.ApprovedForm.controls['isApproved'].value == "1") {
      this.ApprovedForm.controls['isApproved'].setValue(true);
    } else if (this.ApprovedForm.controls['isApproved'].value == "2") {
      this.ApprovedForm.controls['isApproved'].setValue(false);
    }

    this._DegreeService.ApprovedMallaCurricular(this.ApprovedForm.getRawValue()).subscribe({
      next: (res) => {
        this.ResponseMessage.CodError = 200;
        this.ResponseMessage.Message = 'Aprobado correctamente.';
        this.dialogRef.close(this.ResponseMessage);
      },
      error: (err) => {
        this.ResponseMessage.CodError = 500;
        this.ResponseMessage.Message = err;
        this.dialogRef.close(this.ResponseMessage);
      }
    });
  }
}