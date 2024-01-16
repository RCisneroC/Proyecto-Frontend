import { Component, Inject } from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivityDetailService } from 'app/admission/services/activity-detail.service';
export interface DialogData {
  id: string;
  accion: string;
}
@Component({
  selector: 'app-asignar-cooperantes',
  templateUrl: './asignar-cooperantes.component.html',
  styleUrls: ['./asignar-cooperantes.component.scss']
})
export class AsignarCooperantesComponent {
displayedColumns: string[] = [
    'id',
    'name',
    'descipcion',
    'logo',
];
  
  public resultado = [
    {
      "id": 1,
      "name": "MIVIOT",
      "description": "MIVIOT",
      "image": "https://www.miviot.gob.pa/wp-content/uploads/2022/04/log-vertical-nuevo-para-gorras-01-678x381.jpg",
    },
    {
      "id": 2,
      "name": "MIVIOT",
      "description": "MIVIOT",
      "image": "https://www.miviot.gob.pa/wp-content/uploads/2022/04/log-vertical-nuevo-para-gorras-01-678x381.jpg",
    },
    {
      "id": 3,
      "name": "MIVIOT",
      "description": "MIVIOT",
      "image": "https://www.miviot.gob.pa/wp-content/uploads/2022/04/log-vertical-nuevo-para-gorras-01-678x381.jpg",
    }
  ];

  action: string;
  dialogTitle: string='';
  AsignarCooperantesForm: UntypedFormGroup;
  id_actividad: string = '';
  ListadoCooperantes: any;
  constructor(
    public dialogRef: MatDialogRef<AsignarCooperantesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    this.action = data.accion;
    console.log(data);
    
    if (this.action === 'add-cooperantes') {
      this.dialogTitle ="Agregar Docentes";
      this.id_actividad = data.id;
    }
    this.LoadCooperantes();
    this.AsignarCooperantesForm =this.fb.group({
        cooperantes: this.fb.array([])
    });
  }
     applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.ListadoCooperantes.filter = filterValue.trim().toLowerCase();
  }

  LoadCooperantes() {
    this.ListadoCooperantes = new MatTableDataSource(this.resultado);
    console.log(this.ListadoCooperantes);
    // this._ActivityDetailService.GetAllTeacher().subscribe({
    //   next: (res) => {
        
    //   }
    // });
  }
  submit() {
    console.log('====================================');
    console.log(this.AsignarCooperantesForm.getRawValue());
    console.log('====================================');
  }
  get checkboxesFormArray(): UntypedFormArray {
    console.log("hola");
    
    return this.AsignarCooperantesForm.get('cooperantes') as UntypedFormArray;
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
