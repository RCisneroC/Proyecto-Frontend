import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SuppliesService } from 'app/admission/maestros/services/supplies.service';
import { RequestRooms } from 'app/admission/models/RequestRooms';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { Supplies } from 'app/admission/models/supplies';
import { ActivityDetailService } from 'app/admission/services/activity-detail.service';
export interface DialogData {
  requestRooms: RequestRooms;
  id_actividad: string;
  accion: string;
}

@Component({
  selector: 'app-requerimiento-salones',
  templateUrl: './requerimiento-salones.component.html',
  styleUrls: ['./requerimiento-salones.component.scss']
})
export class RequerimientoSalonesComponent implements OnInit {
  public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message: ''
  }
  displayedColumns: string[] = [
    'id',
    'name',
    'description',
    'amount'
  ];

  action: string = '';
  dialogTitle: string = '';
  requiremetForm!: UntypedFormGroup;
  id_actividad: string = '';
  dataSourceSuppliesRequirement: Supplies[] = [
    this._RequirementService.dialogData
  ];
  ListadoSupplies = new MatTableDataSource<Supplies>(this.dataSourceSuppliesRequirement);
  public IsLoading: boolean = true;
  @ViewChild('paginatorRequirement') set paginator(value: MatPaginator) {
    console.log(value);
    setTimeout(() => {
      this.ListadoSupplies.paginator = value;
      this.IsLoading = false;
    }, 3000);
  }

  constructor(
    public dialogRef: MatDialogRef<RequerimientoSalonesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public _RequirementService: SuppliesService,
    public _ActivityDetailService: ActivityDetailService,
    private fb: UntypedFormBuilder
  ) {
    console.log('====================================');
    console.log(data);
    console.log('====================================');
    this.requiremetForm = this.fb.group({
      roomRequirementsIds: this.fb.array([]),
      roomRequestId: [this.data.requestRooms.id, Validators.required],
     // amount: this.fb.array([])
      amount: [0]
    });
    this.action = this.data.accion;
    if (this.action === 'add-requirement') {
      this.dialogTitle = "Agregar Requerimientos";
      this.id_actividad = this.data.id_actividad;
    }
    this.LoadDocumentRequirement();
  }
  ngOnInit(): void {

    this.ListadoSupplies.paginator = this.paginator;

  }
  
  saveRow(element: any) {
    //element.amount = false;
    // Perform any necessary updates to the data source
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.ListadoSupplies.filter = filterValue.trim().toLowerCase();
  }

  LoadDocumentRequirement() {
    this._RequirementService.getAllSuppli2Filter(1).subscribe({
      next: (res) => {
        this.ListadoSupplies = new MatTableDataSource<Supplies>(res.filter(x=>parseInt(x.amount)>0));
        console.log(this.ListadoSupplies);

      }
    });
  }
  submit() {
    this._RequirementService.addSuppliesRequirement(this.requiremetForm.getRawValue()).subscribe({
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
    return this.requiremetForm.get('roomRequirementsIds') as UntypedFormArray;
  }
  get checkboxesAmountFormArray(): UntypedFormArray {
    return this.requiremetForm.get('amount') as UntypedFormArray;
  }

  checkboxChange(event: any, checkboxId: any,amount:number): void {
    if (event.checked) {
      this.checkboxesFormArray.push(this.fb.control(checkboxId));
      this.checkboxesAmountFormArray.push(this.fb.control(amount));
      console.log(this.checkboxesFormArray);
      console.log(this.checkboxesAmountFormArray);
    } else {
      const index = this.checkboxesFormArray.controls.findIndex(x => x.value === checkboxId);
      if (index !== -1) {
        this.checkboxesFormArray.removeAt(index);
        this.checkboxesAmountFormArray.removeAt(index);
      }
    }
  }
}
