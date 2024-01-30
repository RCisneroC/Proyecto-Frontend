import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { Period } from 'app/admission/FormalEducations/Models/AnnualPlan';
import { Subject } from 'app/admission/FormalEducations/Models/Subject';
import { SubjectServiceService } from 'app/admission/FormalEducations/Services/subject-service.service';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { DetalleDocente } from 'app/admission/models/docentes';
import { ActivityDetailService } from 'app/admission/services/activity-detail.service';

export interface DialogData {
  accion: string;
  id_malla: string;
  id_plan: string;
  period: Period[];
  subject: Subject;
}

@Component({
  selector: 'app-create-asigned',
  templateUrl: './create-asigned.component.html',
  styleUrls: ['./create-asigned.component.scss']
})
export class CreateAsignedComponent implements OnInit {
  public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message: ''
  }
  action: string;
  dialogTitle: string = '';
  AsignacionForms: UntypedFormGroup;
  constructor(
    public dialogRef: MatDialogRef<CreateAsignedComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public _SubjectServiceService: SubjectServiceService,
    private fb: UntypedFormBuilder,
    public _ActivityDetailService: ActivityDetailService
  ) {
    this.action = data.accion;
    console.log(data);
    if (this.action === 'add') {
      this.dialogTitle = "Nueva asignación";
      this.LoadAlTeachers();
    }
    this.AsignacionForms = this.fb.group({
      periodId: ['', [Validators.required]],
      degreeCurriculumDesignId: [data.id_malla, [Validators.required]],
      subjectsIds: [[data.subject.id], [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      examDate: ['', [Validators.required]],
      teacherCedula: ['', [Validators.required]],
      virtualRoom: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {

  }
  onChange(item: MatSelectChange) {
    var valor = this.data.period.find(x => x.id == item.value);
    console.log(valor);
    this.AsignacionForms.controls['startDate'].setValue(valor?.startDate);
    this.AsignacionForms.controls['endDate'].setValue(valor?.endDate);
  }
  submit() {
    console.log(this.AsignacionForms.getRawValue());

    if (this.action === 'add') {
      this._SubjectServiceService.SaveAsignacion(this.AsignacionForms.getRawValue()).subscribe({
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

  LoadAlTeachers() {
    this._ActivityDetailService.GetAllTeacher().subscribe({
      next: (res: DetalleDocente[]) => {
        this._ActivityDetailService._ListadoDocentes = res;
        console.log('====================================');
        console.log(this._ActivityDetailService._ListadoDocentes);
        console.log('====================================');
      }
    });
  }

}
