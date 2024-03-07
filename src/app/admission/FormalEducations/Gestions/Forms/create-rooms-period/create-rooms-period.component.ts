import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Rooms } from 'app/admission/FormalEducations/Models/Rooms';
import { DegreeService } from 'app/admission/FormalEducations/Services/degree.service';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
export interface DialogData {
  accion: string;
  id_periodo: string;
  id_years: string;
  Rooms: Rooms[];
}
@Component({
  selector: 'app-create-rooms-period',
  templateUrl: './create-rooms-period.component.html',
  styleUrls: ['./create-rooms-period.component.scss']
})
export class CreateRoomsPeriodComponent implements OnInit {
  public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message: ''
  }
  action: string;
  dialogTitle: string = '';
  PeriodForm: UntypedFormGroup;
  constructor(
    public dialogRef: MatDialogRef<CreateRoomsPeriodComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public _DegreeService: DegreeService,
    private fb: UntypedFormBuilder
  ) {
    this.action = data.accion;
    console.log(data);
    if (this.action === 'add') {
      this.dialogTitle = "Nuevo Salón";
    }
    this.PeriodForm = this.fb.group({
      periodId: [data.id_periodo, [Validators.required]],
      year: [data.id_years, [Validators.required]],
      roomsIds: [[0], [Validators.required]],
      numOfStudents: [0, Validators.required]
    });
  }
  ngOnInit(): void {

  }



  submit() {
    let senData = {
      periodId: this.PeriodForm.controls['periodId'].value,
      year: this.PeriodForm.controls['year'].value,
      roomsIds: [this.PeriodForm.controls['roomsIds'].value],
      numOfStudents: this.PeriodForm.controls['numOfStudents'].value
    }
    this._DegreeService.SaveRoomsPeriod(senData).subscribe({
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
  }
}