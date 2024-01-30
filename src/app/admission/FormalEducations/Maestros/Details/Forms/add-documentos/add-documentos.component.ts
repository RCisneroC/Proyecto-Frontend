import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { RequirementAdmision } from 'app/admission/FormalEducations/Models/RequirementAdmision';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { AdmisionRequirimentService } from '../../../../Services/admision-requiriment.service';
export interface DialogData {
  id_carrera: string;
  accion: string;
}
@Component({
  selector: 'app-add-documentos',
  templateUrl: './add-documentos.component.html',
  styleUrls: ['./add-documentos.component.scss']
})
export class AddDocumentosComponent implements OnInit {
  public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message: ''
  }
  displayedColumns: string[] = [
    'id',
    'name',
    'description',
  ];

  action: string = '';
  dialogTitle: string = '';
  RequirementAdmision!: UntypedFormGroup;
  id_actividad: string = '';
  dataSourceRequirementAdmision: RequirementAdmision[] = [
    {
      description: '',
      id: 0,
      name: '',
      statusId: 0
    }
  ];
  ListadoDocumentosAdmision = new MatTableDataSource<RequirementAdmision>(this.dataSourceRequirementAdmision);
  public IsLoading: boolean = true;
  @ViewChild('paginatorDocumentos') set paginator(value: MatPaginator) {
    setTimeout(() => {
      this.ListadoDocumentosAdmision.paginator = value;
      this.IsLoading = false;
    }, 500);
  }

  constructor(
    public dialogRef: MatDialogRef<AddDocumentosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public _AdmisionRequirimentService: AdmisionRequirimentService,
    private fb: UntypedFormBuilder
  ) {
    this.RequirementAdmision = this.fb.group({
      degreeAdmissionRequirementsIds: this.fb.array([]),
      degreeId: [this.data.id_carrera, Validators.required]
    });
    this.action = this.data.accion;
    if (this.action === 'add') {
      this.dialogTitle = "Agregar Requerimientos";
      this.id_actividad = this.data.id_carrera;
    }
    this.LoadDocumentRequirement();
  }
  ngOnInit(): void {

    this.ListadoDocumentosAdmision.paginator = this.paginator;

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.ListadoDocumentosAdmision.filter = filterValue.trim().toLowerCase();
  }

  LoadDocumentRequirement() {
    this._AdmisionRequirimentService.getAllRequirementAdmisione2(this.data.id_carrera).subscribe({
      next: (res) => {
        console.log(res);

        this.ListadoDocumentosAdmision = new MatTableDataSource<RequirementAdmision>(res);
      }
    });
  }
  submit() {
    this._AdmisionRequirimentService.addDocumentRequirement(this.RequirementAdmision.getRawValue()).subscribe({
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
  get checkboxesFormArray(): UntypedFormArray {
    return this.RequirementAdmision.get('degreeAdmissionRequirementsIds') as UntypedFormArray;
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

