import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivityTeachers } from 'app/admission/models/GetOneActivity';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { DetalleDocente } from 'app/admission/models/docentes';
import { ActivityDetailService } from 'app/admission/services/activity-detail.service';
export interface DialogData {
  id_actividad: string;
  accion: string;
}
@Component({
  selector: 'app-asignar-docentes',
  templateUrl: './asignar-docentes.component.html',
  styleUrls: ['./asignar-docentes.component.scss']
})
export class AsignarDocentesComponent implements OnInit {
    public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message:''
  }
displayedColumns: string[] = [
    'id',
    'name',
    'cedula',
  ];
  action: string;
  dialogTitle: string='';
  AsignarDocentesForm: UntypedFormGroup;
  id_actividad: string = ''; 
  dataSourceActivityTeachers: DetalleDocente[] = [
    this._ActivityDetailService._DetalleDocente
  ];
  ListadoDocentes = new MatTableDataSource<DetalleDocente>(this.dataSourceActivityTeachers);
  public IsLoading: boolean = true;
   @ViewChild('paginatorPoster') set paginator(value: MatPaginator) {
      console.log(value);
     setTimeout(() => {
       this.ListadoDocentes.paginator = value;
       this.IsLoading = false;
     }, 3000);
  }
  
  constructor(
    public dialogRef: MatDialogRef<AsignarDocentesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public _ActivityDetailService:ActivityDetailService,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    this.action = data.accion;
    console.log(data);
    
    if (this.action === 'add-teachers') {
      this.dialogTitle ="Agregar Docentes";
      this.id_actividad = data.id_actividad;
    }
    this.LoadDocumentRequirement();
    this.AsignarDocentesForm = this.fb.group({
      activityId:[data.id_actividad,[Validators.required]],
      teacherCedulas: this.fb.array([])
    });
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
     this.ListadoDocentes.paginator = this.paginator;
  } 

     applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.ListadoDocentes.filter = filterValue.trim().toLowerCase();
  }

  LoadDocumentRequirement() {
    this._ActivityDetailService.GetAllTeacher().subscribe({
      next: (res: DetalleDocente[]) => {
        this._ActivityDetailService._ListadoDocentes = res;
        // this.ListadoDocentes = new MatTableDataSource(this._ActivityDetailService._ListadoDocentes);
        this.ListadoDocentes =new MatTableDataSource<DetalleDocente>(this._ActivityDetailService._ListadoDocentes);
      }
    });
  }
  submit() {
    // AddTeachers
    this._ActivityDetailService.AddTeachers(this.AsignarDocentesForm.getRawValue()).subscribe({
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
    console.log("hola");
    
    return this.AsignarDocentesForm.get('teacherCedulas') as UntypedFormArray;
  }

    checkboxChange(event: any, checkboxId: any): void {
    if (event.checked) {
      this.checkboxesFormArray.push(this.fb.control(checkboxId.toString()));
    } else {
      const index = this.checkboxesFormArray.controls.findIndex(x => x.value === checkboxId);
      if (index !== -1) {
        this.checkboxesFormArray.removeAt(index);
      }
    }
  }
}
