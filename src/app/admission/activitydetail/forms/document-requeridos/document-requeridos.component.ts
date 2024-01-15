import { Component, Inject } from '@angular/core';
import { FormArray, FormControl, UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { RequirementService } from 'app/admission/maestros/services/requirement.service';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { ActivityDetailService } from 'app/admission/services/activity-detail.service';
export interface DialogData {
  id_actividad: string;
  accion: string;
}
@Component({
  selector: 'app-document-requeridos',
  templateUrl: './document-requeridos.component.html',
  styleUrls: ['./document-requeridos.component.scss']
})
export class DocumentRequeridosComponent {
   public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message:''
  }
    displayedColumns: string[] = [
    'id',
    'name',
    'description',
    ];
  
  action: string;
  dialogTitle: string='';
  requiremetForm: UntypedFormGroup;
  id_actividad: string = '';
  ListadoDocumentos: any;
  constructor(
    public dialogRef: MatDialogRef<DocumentRequeridosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public _RequirementService:RequirementService,
    public _ActivityDetailService:ActivityDetailService,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    this.action = data.accion;
    console.log(data);
    
    if (this.action === 'add-document') {
      this.dialogTitle ="Agregar Requerimientos";
      this.id_actividad = data.id_actividad;
    }
    this.LoadDocumentRequirement();
    this.requiremetForm =this.fb.group({
      activityRequirementsIds: this.fb.array([]),
      activityId:[data.id_actividad,Validators.required]
    });
  }
     applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.ListadoDocumentos.filter = filterValue.trim().toLowerCase();
  }

  LoadDocumentRequirement() {
    this._RequirementService.getAllDocumentFiltro(1).subscribe({
      next: (res) => {
        this.ListadoDocumentos = new MatTableDataSource(res);
      }
    });
  }
  submit() {
    this._ActivityDetailService.AddDocumentRequirement(this.requiremetForm.getRawValue()).subscribe({
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
    return this.requiremetForm.get('activityRequirementsIds') as UntypedFormArray;
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
