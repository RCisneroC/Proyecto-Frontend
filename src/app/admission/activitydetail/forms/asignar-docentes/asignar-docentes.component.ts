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
  selector: 'app-asignar-docentes',
  templateUrl: './asignar-docentes.component.html',
  styleUrls: ['./asignar-docentes.component.scss']
})
export class AsignarDocentesComponent {
displayedColumns: string[] = [
    'id',
    'name',
    'cedula',
    ];
  public resultado = [
    {
      "cedula": 21324340,
      "name": "rummi",
      "lastName": "chino",
      "applicationDate": "2024-01-10T14:06:57.959",
      "selected": true,
      "dischargeDate": "2024-01-10T14:06:57.959",
      "placeResidence": "string",
      "jobTitle": "string",
      "graduateDegree": "string",
      "professionalExperience": "string",
      "teachingExperience": "string",
      "listCourse": [
        {
          "courseId": 1,
          "year": 2022
        }
      ],
      "listTraining": [
        {
          "trainingId": 2,
          "year": 0,
          "typeId": 2022
        }
      ],
      "listSpecialty": [
        {
          "specialtyId": 1
        }
      ],
      "process": 0,
      "topics": 0
    },
    {
      "cedula": 21324339,
      "name": "Conrado",
      "lastName": "arquer",
      "applicationDate": "2024-01-10T14:06:57.959",
      "selected": true,
      "dischargeDate": "2024-01-10T14:06:57.959",
      "placeResidence": "string",
      "jobTitle": "string",
      "graduateDegree": "string",
      "professionalExperience": "string",
      "teachingExperience": "string",
      "listCourse": [],
      "listTraining": [],
      "listSpecialty": [],
      "process": 0,
      "topics": 0
    },
    {
      "cedula": 213232321,
      "name": "ricardo",
      "lastName": "cisnero",
      "applicationDate": "2024-01-09T22:22:30.735",
      "selected": true,
      "dischargeDate": "2024-01-09T22:22:30.735",
      "placeResidence": "string",
      "jobTitle": "string",
      "graduateDegree": "string",
      "professionalExperience": "string",
      "teachingExperience": "string",
      "listCourse": [],
      "listTraining": [],
      "listSpecialty": [],
      "process": 0,
      "topics": 0
    }
  ];
  action: string;
  dialogTitle: string='';
  AsignarDocentesForm: UntypedFormGroup;
  id_actividad: string = '';
  ListadoDocentes: any;
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
      this.id_actividad = data.id;
    }
    this.LoadDocumentRequirement();
    this.AsignarDocentesForm =this.fb.group({
        docentes: this.fb.array([])
    });
  }
     applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.ListadoDocentes.filter = filterValue.trim().toLowerCase();
  }

  LoadDocumentRequirement() {
    this.ListadoDocentes = new MatTableDataSource(this.resultado);
    console.log(this.ListadoDocentes);
    // this._ActivityDetailService.GetAllTeacher().subscribe({
    //   next: (res) => {
        
    //   }
    // });
  }
  submit() {
    console.log('====================================');
    console.log(this.AsignarDocentesForm.getRawValue());
    console.log('====================================');
  }
  get checkboxesFormArray(): UntypedFormArray {
    console.log("hola");
    
    return this.AsignarDocentesForm.get('docentes') as UntypedFormArray;
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
