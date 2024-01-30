import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CompetencesService } from 'app/admission/FormalEducations/Services/competences.service';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
export interface DialogData {
  id_carrera: string;
  accion: string;
}
@Component({
  selector: 'app-add-competencias',
  templateUrl: './add-competencias.component.html',
  styleUrls: ['./add-competencias.component.scss']
})
export class AddCompetenciasComponent implements OnInit {
  public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message:''
  }
  action: string;
  dialogTitle: string='';
  CompetenceForms: UntypedFormGroup;
  id_carrera: string = '';
  constructor(
    public dialogRef: MatDialogRef<AddCompetenciasComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public _CompetencesService:CompetencesService,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    this.action = data.accion;
    console.log(data);
    if (this.action === 'add') {
      this.dialogTitle ="Agregar Competencia";
      this.id_carrera = data.id_carrera;
    }
    this.CompetenceForms = this.fb.group({
      name:['',[Validators.required]],
      description:['',[Validators.required]],
      degreeId:[data.id_carrera,[Validators.required]]
    });
  }
  ngOnInit(): void {
     
  }

  submit() {
    this._CompetencesService.addCompetence(this.CompetenceForms.getRawValue()).subscribe({
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
