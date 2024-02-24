import { Component, Inject, OnInit, ChangeDetectorRef, ViewChild, AfterViewInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Lounge } from 'app/admission/models/lounge';
import { MasterService } from '../services/master.service';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { TimeSlot } from 'app/admission/models/TimeSlot';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DatePipe } from '@angular/common';


export interface DialogData {
  id: string;
  action: string;
  lounge: Lounge;
}
@Component({
  selector: 'app-time-slots',
  templateUrl: './time-slots.component.html',
  styleUrls: ['./time-slots.component.scss']
})
export class TimeSlotsComponent implements OnInit,  AfterViewInit {

  public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message: ''
  }
  action: string;
  filaSeleccionada!: TimeSlot;
  dialogTitle: string;
  timeSlotsForm: UntypedFormGroup;
  lstTimeSlots: TimeSlot[] = [];
  public IsLoading: boolean = true;
  public pressSave: boolean = true;
  dataSource = new MatTableDataSource<TimeSlot>(this.lstTimeSlots);
  displayedColumns = [
    'startTime',
    'endTime',
    'actions',
  ];


  @ViewChild('paginatorTimeSlot', { static: true })
  paginator!: MatPaginator;

  constructor(
    public dialogRef: MatDialogRef<TimeSlotsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public timeslotService: MasterService,
    private fb: UntypedFormBuilder,
    private dtc: ChangeDetectorRef,
    private date:DatePipe
  ) {
    this.action = data.action;

    if (this.action === 'edit') {
      this.dialogTitle = "Editar Franja horaria";
    } else {
      this.dialogTitle = 'Nueva franja horaria';
    }
    this.timeSlotsForm = this.createTimeSlots();
  }

  public ngOnInit(): void {
    this.getTimeSlots();
    this.Limpiar();
    this.dataSource.paginator = this.paginator;
  }

  createTimeSlots(): UntypedFormGroup {
    return this.fb.group({
      fechaHoraInicial: ['', Validators.required],
      fechaHoraFinal: ['', Validators.required],
    });
  }


  Limpiar(): void {
    this.dialogTitle = "Nueva Franja horaria";
    this.pressSave = false;
    this.timeSlotsForm.reset();
    this.timeSlotsForm.controls["fechaHoraInicial"].markAsPending();
    this.timeSlotsForm.controls["fechaHoraFinal"].markAsPending();
    this.action = "nuevo";
  }

  public confirmAdd(): void {

    this.pressSave = true;
    this.IsLoading = true;

    if (this.timeSlotsForm.invalid){
      this.pressSave = false;
      this.IsLoading = false;
      return;
    }

  if(this.action == "nuevo"){
    this.timeslotService.createTimeSlot(this.data.lounge.id,
      this.timeSlotsForm.controls["fechaHoraInicial"].value,
      this.timeSlotsForm.controls["fechaHoraFinal"].value
    )
      .subscribe(
        {
          next: (request: any) => {
            Swal.fire({
              title: "Escuela Judicial",
              text: 'Creado correctamente.',
              icon: "success"
            });
            this.getTimeSlots();
            this.Limpiar();
            this.IsLoading = false;
            this.ngAfterViewInit();
          },
          error: (err: any) => {
            this.IsLoading = false;
            Swal.fire({
              title: "Escuela Judicial",
              text: "No se puedo crear la franja de horas",
              icon: "warning"
            });
          }
        }
      );
  }
  else if(this.action == "editar"){

    this.timeslotService.updateTimeSlot(this.filaSeleccionada).subscribe(
      {
        next: (request: any) => {
          Swal.fire({
            title: "Escuela Judicial",
            text: 'Actualizado correctamente.',
            icon: "success"
          });
                this.getTimeSlots();
                this.Limpiar();
                this.IsLoading = false;
                this.ngAfterViewInit();
        },
        error: (err: any) => {
          this.IsLoading = false;
          Swal.fire({
            title: "Escuela Judicial",
            text: "No se puedo actualizar la franja de horas",
            icon: "warning"
          });
        }
      }
    );

  }



  }

  public getTimeSlots() {
    this.IsLoading = true;
    this.timeslotService.getTimeSlotByRoom(this.data.lounge.id).subscribe(
      {
        next: (request: TimeSlot[]) => {
          this.dataSource = new MatTableDataSource<TimeSlot>(request);
          this.lstTimeSlots = request;
          this.dtc.detectChanges();
        }
      }
    )
  }

  public eliminar(fila: TimeSlot) {
   this.timeslotService.deleteTimeSlot(fila.id).subscribe(
    {
      next: (request: any) => {
        Swal.fire({
          title: "Escuela Judicial",
          text: 'Borrado correctamente.',
          icon: "success"
        });
              this.getTimeSlots();
              this.Limpiar();
              this.IsLoading = false;
              this.ngAfterViewInit();
      },
      error: (err: any) => {
              this.IsLoading = false;
        Swal.fire({
          title: "Escuela Judicial",
          text: "No se puedo borrar la franja de horas",
          icon: "warning"
        });
      }
    }
  );
  }

  public editar(fila: TimeSlot) {
    this.dialogTitle = "Editar Franja horaria";

    this.timeSlotsForm.controls["fechaHoraInicial"].patchValue(this.date.transform(fila.startTime,"shortTime"));
    this.timeSlotsForm.controls["fechaHoraFinal"].patchValue(this.date.transform(fila.endTime,"shortTime"));
    this.action = "editar";
    this.filaSeleccionada = Object.assign({},fila);
  }

  ngAfterViewInit() {
    setTimeout(()=>
    {
      this.dataSource.paginator = this.paginator;
      this.IsLoading = false;
    },2000
  );
  }

}
