import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MasterService } from 'app/admission/maestros/services/master.service';
import { RequestRooms } from 'app/admission/models/RequestRooms';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { Lounge } from 'app/admission/models/lounge';
import { ActivityDetailService } from 'app/admission/services/activity-detail.service';
export interface DialogData {
  requestRooms: RequestRooms;
  id_actividad: string;
  accion: string;
}
@Component({
  selector: 'app-reserva-salones',
  templateUrl: './reserva-salones.component.html',
  styleUrls: ['./reserva-salones.component.scss']
})
export class ReservaSalonesComponent implements OnInit {
   public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message:''
  }
    displayedColumns: string[] = [
    'id',
    'name',
    'description',
    ];
  
  action: string='';
  dialogTitle: string='';
  requiremetForm!: UntypedFormGroup;
  id_actividad: string = '';
  dataSourceLoungeRequirement: Lounge[] = [
    {
      description: '',
      id: 0,
      name: '',
      statusId:0
    }
  ];
  ListadoLounge= new MatTableDataSource<Lounge>(this.dataSourceLoungeRequirement);
  public IsLoading: boolean = true;
  @ViewChild('paginatorRequirement') set paginator(value: MatPaginator) {
     setTimeout(() => {
       this.ListadoLounge.paginator = value;
       this.IsLoading = false;
     }, 3000);
  }
  
  constructor(
    public dialogRef: MatDialogRef<ReservaSalonesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public _RoomServices:MasterService,
    public _ActivityDetailService:ActivityDetailService,
    private fb: UntypedFormBuilder
  ) {
   this.requiremetForm =this.fb.group({
      roomsIds: this.fb.array([]),
      roomRequestId:[this.data.requestRooms.id,Validators.required]
   });
    this.action = this.data.accion;
    if (this.action === 'add-rooms') {
      this.dialogTitle ="Agregar Salón";
      this.id_actividad = this.data.id_actividad;
    }
     this.LoadRooms();
  }
  ngOnInit(): void {

    this.ListadoLounge.paginator = this.paginator;
   
  }
     applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.ListadoLounge.filter = filterValue.trim().toLowerCase();
  }

  LoadRooms() {
    this._RoomServices.getRoomsFilter(1).subscribe({
      next: (res) => {
        this.ListadoLounge = new MatTableDataSource<Lounge>(res);
        
      }
    });
  }
  submit() {
    this._RoomServices.addRoomsRequestRooms(this.requiremetForm.getRawValue()).subscribe({
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
    return this.requiremetForm.get('roomsIds') as UntypedFormArray;
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