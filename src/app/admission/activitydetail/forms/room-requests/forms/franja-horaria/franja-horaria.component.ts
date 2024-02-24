import { Component, Inject, OnInit, ChangeDetectorRef, ViewChild, AfterViewInit } from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RequestRooms } from 'app/admission/models/RequestRooms';
import { MasterService } from 'app/admission/maestros/services/master.service';
import { ResponseError, ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Lounge } from 'app/admission/models/lounge';
import { TimeSlot } from 'app/admission/models/TimeSlot';
import { HttpErrorResponse } from '@angular/common/http';

export interface DialogData {
  id: string;
  action: string;
  requestRooms: RequestRooms;
}

@Component({
  selector: 'app-franja-horaria',
  templateUrl: './franja-horaria.component.html',
  styleUrls: ['./franja-horaria.component.scss']
})
export class FranjaHorariaComponent implements OnInit, AfterViewInit {
  public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message: ''
  }
  action: string = "";
  dialogTitle: string = "Franja Horaria";
  timeSlotsForm: UntypedFormGroup;
  public lstRooms: Lounge[] = [];
  public lstFechasNoDisponibles: any[] = [];
  public deshabilitarFecha: boolean = true;
  public IsLoading: boolean = true;
  public lstTimeSlots: TimeSlot[] = [];
  dataSource = new MatTableDataSource<TimeSlot>(this.lstTimeSlots);

  @ViewChild('paginatorTimeSlot', { static: true })
  paginator!: MatPaginator;

  displayedColumns = [
    'id',
    'startTime',
    'endTime',
  ];

  constructor(public dialogRef: MatDialogRef<FranjaHorariaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: UntypedFormBuilder,
    private dtc: ChangeDetectorRef,
    private RoomServices: MasterService
  ) {
    this.timeSlotsForm = this.createTimeSlots();
  }

  createTimeSlots(): UntypedFormGroup {
    return this.fb.group({
      timeslotsId: this.fb.array([], Validators.required),
      fecha: ['', Validators.required],
      salon: ['', Validators.required],
    });
  }

  get checkboxesFormArray(): UntypedFormArray {
    return this.timeSlotsForm.get('timeslotsId') as UntypedFormArray;
  }

  public ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.LoadRooms();
  }

  LoadRooms() {
    this.RoomServices.getRoomsFilterRangeDate(this.data.requestRooms.startDate,
      this.data.requestRooms.endDate).subscribe({
        next: (res) => {
          this.lstRooms = res as Lounge[];
        }
      });
  }


  LoadDates() {
    if (!this.timeSlotsForm.controls["salon"].value)
      return;

    this.RoomServices.getAvalableDateByRoom(parseInt(this.timeSlotsForm.controls["salon"].value)).subscribe({
      next: (res) => {
        this.lstFechasNoDisponibles = res as any[];

        if (this.lstFechasNoDisponibles.length > 0) {
          this.deshabilitarFecha = false;
          this.dtc.detectChanges();
        }
      }
    });
  }


  public FiltrarFechas = (d: Date | null): boolean => {

    let data: boolean = true;

    if (this.lstFechasNoDisponibles.length == 0)
      return true;

    let f = d?.toISOString().substring(0, 10);

    this.lstFechasNoDisponibles.forEach((item) => {
      data = f != item.date.substring(0, 10);
    });

    return data;
  }


  LoadTimeSlot() {
    this.IsLoading = true;
    this.RoomServices.getTimeSlotByRoomAndDate(
      parseInt(this.timeSlotsForm.controls["salon"].value),
      this.timeSlotsForm.controls["fecha"].value).subscribe({
        next: (request) => {
          this.dataSource = new MatTableDataSource<TimeSlot>(request);
          this.lstTimeSlots = request;
          this.dtc.detectChanges();
          this.IsLoading = false;
         this.ngAfterViewInit();
        }
      });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.IsLoading = false;
    }, 2000
    );
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

  checkBoxIsSelecterd(id: number) {

    if (this.checkboxesFormArray.length == 0)
      return false;

    return (this.checkboxesFormArray.controls.findIndex(x => x.value === id) >= 0);
  }

  guardar():void {
    const data = {
      roomRequestId: this.data.requestRooms.id,
      roomId: this.timeSlotsForm.controls["salon"].value,
      date: this.timeSlotsForm.controls["fecha"].value,
      roomTimeSlotIds: this.timeSlotsForm.getRawValue().timeslotsId as number[]
    };

    this.RoomServices.addRoomsRequestRooms(data).subscribe(
      {
        next: (request: any) => {
          console.log(request)

          Swal.fire({
            title: "Escuela Judicial",
            text: 'Creado correctamente.',
            icon: "success"
          });
          this.IsLoading = false;
          this.ResponseMessage.CodError = 200;
          this.ResponseMessage.Message = 'Creado correctamente.';
          this.dialogRef.close(this.ResponseMessage);
        },
        error: (err: HttpErrorResponse) => {
          this.IsLoading = false;
          console.log("error " + err)
          Swal.fire({
            title: "Escuela Judicial",
            text: "No se pudo crear la franja horaria",
            icon: "warning"
          });
        }
      });
  }

}
