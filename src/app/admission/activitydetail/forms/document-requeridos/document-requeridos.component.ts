import { Component, Inject } from '@angular/core';
import { FormArray, FormControl, UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { RequirementService } from 'app/admission/maestros/services/requirement.service';
export interface DialogData {
  id: string;
  accion: string;
}
@Component({
  selector: 'app-document-requeridos',
  templateUrl: './document-requeridos.component.html',
  styleUrls: ['./document-requeridos.component.scss']
})
export class DocumentRequeridosComponent {
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
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    this.action = data.accion;
    console.log(data);
    
    if (this.action === 'add-document') {
      this.dialogTitle ="Agregar Requerimientos";
      this.id_actividad = data.id;
    }
    this.LoadDocumentRequirement();
    this.requiremetForm =this.fb.group({
        documentos: this.fb.array([])
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
    console.log('====================================');
    console.log(this.requiremetForm.getRawValue());
    console.log('====================================');
  }
  get checkboxesFormArray(): UntypedFormArray {
    console.log("hola");
    
    return this.requiremetForm.get('documentos') as UntypedFormArray;
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
