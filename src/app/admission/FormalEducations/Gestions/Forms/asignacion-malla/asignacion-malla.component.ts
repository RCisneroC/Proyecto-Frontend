import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DegreeCurriculumDesign } from 'app/admission/FormalEducations/Models/Degree';
import { DegreeService } from 'app/admission/FormalEducations/Services/degree.service';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
export interface DialogData {
  id_plan: string;
  accion: string;
}
@Component({
  selector: 'app-asignacion-malla',
  templateUrl: './asignacion-malla.component.html',
  styleUrls: ['./asignacion-malla.component.scss']
})
export class AsignacionMallaComponent implements OnInit {
  public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message: ''
  }
  displayedColumns: string[] = [
    'name',
    'description',
    'fechas',
    'estado',
  ];

  action: string = '';
  dialogTitle: string = '';
  DegreeCurriculumDesignForms!: UntypedFormGroup;
  id_actividad: string = '';
  dataSouceDegreeCurriculumDesign: DegreeCurriculumDesign[] = [
    {
      statusId: 0,
      id: 0,
      name: '',
      description: '',
      startDate: new Date(),
      endDate: new Date(),
      degreeCurriculumDesignTarget: 0,
    }
  ];
  ListadoMallaCurriculares = new MatTableDataSource<DegreeCurriculumDesign>(this.dataSouceDegreeCurriculumDesign);
  public IsLoading: boolean = true;
  @ViewChild('paginatorDocumentos') set paginator(value: MatPaginator) {
    setTimeout(() => {
      this.ListadoMallaCurriculares.paginator = value;
      this.IsLoading = false;
    }, 1000);
  }

  constructor(
    public dialogRef: MatDialogRef<AsignacionMallaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public _DegreeService: DegreeService,
    private fb: UntypedFormBuilder
  ) {
    this.DegreeCurriculumDesignForms = this.fb.group({
      degreeCurriculumDesignsIds: this.fb.array([]),
      annualPlanId: [this.data.id_plan, Validators.required],
      inscriptionStartDate: ['', [Validators.required]],
      inscriptionEndDate: ['', [Validators.required]],
    });
    this.action = this.data.accion;
    if (this.action === 'add') {
      this.dialogTitle = "Agregar Mallas Curriculares";
      this.id_actividad = this.data.id_plan;
    }
    this.LoadDocumentRequirement();
  }
  ngOnInit(): void {

    this.ListadoMallaCurriculares.paginator = this.paginator;

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.ListadoMallaCurriculares.filter = filterValue.trim().toLowerCase();
  }

  LoadDocumentRequirement() {
    this._DegreeService.getAllMallasCurriculares(this.data.id_plan).subscribe({
      next: (res) => {
        this.ListadoMallaCurriculares = new MatTableDataSource<DegreeCurriculumDesign>(res);
        this.ListadoMallaCurriculares.paginator = this.paginator;
      }
    });
  }
  submit() {
    console.log(this.DegreeCurriculumDesignForms.getRawValue());

    this._DegreeService.SaveMallaCurricular(this.DegreeCurriculumDesignForms.getRawValue()).subscribe({
      next: (res: any) => {
        this.ResponseMessage.CodError = 200;
        this.ResponseMessage.Message = 'Cargado correctamente.';
        this.dialogRef.close(this.ResponseMessage);
      },
      error: (err: HttpErrorResponse) => {
        this.ResponseMessage.CodError = 500;
        this.ResponseMessage.Message = err.error.Message;
        this.dialogRef.close(this.ResponseMessage);
      }
    });
  }
  get checkboxesFormArray(): UntypedFormArray {
    return this.DegreeCurriculumDesignForms.get('degreeCurriculumDesignsIds') as UntypedFormArray;
  }

  checkboxChange(event: any, checkboxId: any): void {
    if (event.checked) {
      this.checkboxesFormArray.push(this.fb.control(checkboxId));
    } else {
      const index = this.checkboxesFormArray.controls.findIndex(x => x.value === checkboxId);
      if (index !== -1) {
        this.checkboxesFormArray.removeAt(index);
      }
    }
  }
}
