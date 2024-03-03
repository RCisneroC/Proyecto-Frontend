import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { CooperationgOrganizationService } from 'app/admission/maestros/services/cooperationg-organization.service';
import { ActivityRequirement, GetOneActivity, RoomRequest, RoomRequestRoom, RoomRequestRoomRequirement } from 'app/admission/models/GetOneActivity';
import { ActivityDetailService } from 'app/admission/services/activity-detail.service';
import { VerificarBS64Pipe } from 'app/pipes/verificar-bs64.pipe';
import { NuevaSolicitudComponent } from './forms/nueva-solicitud/nueva-solicitud.component';
import { ResponseGenerica, ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { RequestRooms } from 'app/admission/models/RequestRooms';
import Swal from 'sweetalert2';
import { RequerimientoSalonesComponent } from './forms/requerimiento-salones/requerimiento-salones.component';
import { ReservaSalonesComponent } from './forms/reserva-salones/reserva-salones.component';
import { SuppliesService } from 'app/admission/maestros/services/supplies.service';
import { MasterService } from 'app/admission/maestros/services/master.service';
import { FranjaHorariaComponent } from './forms/franja-horaria/franja-horaria.component';
import { RoomRequestRoomDateTimeSlots } from 'app/admission/models/RoomRequestRoomDateTimeSlots';

@Component({
  selector: 'app-room-requests',
  templateUrl: './room-requests.component.html',
  styleUrls: ['./room-requests.component.scss']
})
export class RoomRequestsComponent {

  public paramsId: string = '';
  dataSoruceRoomList: ActivityRequirement[] = [
    {
      description: '',
      id: 0,
      name: '',
      statusId: 0
    }
  ];
  dataRooms = new MatTableDataSource<ActivityRequirement>(this.dataSoruceRoomList);
  @ViewChild(MatPaginator)
  set paginator(value: MatPaginator) {
    this.dataRooms.paginator = value;
  }
  public step = 0;
  public hrefApproved: boolean = false;
  public lstRoomRequestRoomDateTimeSlots: any[]=[];

  constructor(
    private Path: ActivatedRoute,
    public _ActivityService: ActivityDetailService,
    public _dialog: MatDialog,
    public _verificarBS64: VerificarBS64Pipe,
    public _CooperatingOrganizationService: CooperationgOrganizationService,
    public _router: Router,
    public _suppleService: SuppliesService,
    public _masterLounge: MasterService

  ) {
    this.paramsId = Path.snapshot.params['id'];
    if (this.paramsId != null) {
      const url_storage = localStorage.getItem('url');
      console.log(url_storage);
      if (url_storage == '/admission/list-rooms-approve') {
        this.hrefApproved = true;
      } else {
        this.hrefApproved = false;
      }
      this.getOneActivity();
      // this.dataTeacher = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
      // this.dataOrganismos = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
    } else {
      this._router.navigate(['/admission/schedule-activities-list']);
    }
  }

  setStep(index: number) {
    this.step = index;
  }

  volverAtras() {
    let url = localStorage.getItem('url') || '';
    this._router.navigate([url]);
  }

  nuevaSolicitud() {
    this._ActivityService.init_RequestRooms();
    const dialogRef = this._dialog.open(NuevaSolicitudComponent, {
      data: {
        accion: 'add-room',
        id_actividad: this.paramsId,
        requestRooms: this._ActivityService._RequestRooms,
        actividad: this._ActivityService._GetOneActivity
      },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result: ResponseMessageMaestra) => {
      if (result == undefined) {
        return;
      }
      if (result.CodError == 200) {
        Swal.fire({
          title: "Escuela Judicial",
          text: result.Message,
          icon: "success"
        });
        this.getOneActivity();
      } else {
        Swal.fire({
          title: "Escuela Judicial",
          text: result.Message,
          icon: "warning"
        });
      }
    });
  }


  editarSolicitud(item: RequestRooms) {
    console.log(item);
    //  this._ActivityService.init_RequestRooms();
    const dialogRef = this._dialog.open(NuevaSolicitudComponent, {
      data: {
        accion: 'edit-room',
        id_actividad: this.paramsId,
        requestRooms: item,
        actividad: this._ActivityService._GetOneActivity
      },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result: ResponseMessageMaestra) => {
      if (result == undefined) {
        return;
      }
      if (result.CodError == 200) {
        Swal.fire({
          title: "Escuela Judicial",
          text: result.Message,
          icon: "success"
        });
        this.getOneActivity();
      } else {
        Swal.fire({
          title: "Escuela Judicial",
          text: result.Message,
          icon: "warning"
        });
      }
    });

  }

  deleteRooms(item: RequestRooms) {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "Se Eliminara la solicitud",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
        this._ActivityService.DeleteRequestRooms(item.id).subscribe({
          next: (res: ResponseGenerica) => {
            Swal.fire({
              title: "Escuela Judicial!",
              text: "Eliminado.",
              icon: "success"
            });
            this.getOneActivity();
          },
          error: (err: any) => {
            Swal.fire({
              title: "Intente nuevamente!",
              text: "no se pudo eliminar.",
              icon: "warning"
            });
          }
        })
      } else {
      }
    });
  }

  requiremitRooms(item: RequestRooms) {
    const dialogRef = this._dialog.open(RequerimientoSalonesComponent, {
      data: {
        accion: 'add-requirement',
        id_actividad: this.paramsId,
        requestRooms: item,

      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result: ResponseMessageMaestra) => {
      if (result == undefined) {
        return;
      }
      if (result.CodError == 200) {
        Swal.fire({
          title: "Escuela Judicial",
          text: result.Message,
          icon: "success"
        });
        this.getOneActivity();
      } else {
        Swal.fire({
          title: "Escuela Judicial",
          text: result.Message,
          icon: "warning"
        });
      }
    });
  }

  AddSalones(item: RequestRooms) {
    const dialogRef = this._dialog.open(ReservaSalonesComponent, {
      data: {
        accion: 'add-rooms',
        id_actividad: this.paramsId,
        requestRooms: item,
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result: ResponseMessageMaestra) => {
      if (result == undefined) {
        return;
      }
      if (result.CodError == 200) {
        Swal.fire({
          title: "Escuela Judicial",
          text: result.Message,
          icon: "success"
        });
        this.getOneActivity();
      } else {
        Swal.fire({
          title: "Escuela Judicial",
          text: result.Message,
          icon: "warning"
        });
      }
    });
  }

  AddFranjaHoraria(item: RequestRooms) {
    const dialogRef = this._dialog.open(FranjaHorariaComponent, {
      data: {
        accion: 'add-timeslot',
        id_actividad: this.paramsId,
        requestRooms: item,
      },
      disableClose: true,
      height:"650px",
      width:"750px"
    });
  }


  getOneActivity() {
    this._ActivityService.loading = true;
    this._ActivityService.GetOneActivity(this.paramsId).
      subscribe({
        next: (res: GetOneActivity) => {
          this._ActivityService._GetOneActivity = res;
          console.log('====================================');
          console.log(this._ActivityService._GetOneActivity);
          console.log('====================================');
          // this.getRomsSolicitud(this._ActivityService._GetOneActivity.roomRequests)
          // this.getDocumentos(res.activityActivityRequirements);
          // this.dataPoster = new MatTableDataSource<PosterRequest>(res.posterRequests);
          // this.dataTeacher = new MatTableDataSource<ActivityTeachers>(res.activityTeachers);
          // this.dataOrganismos = new MatTableDataSource<ActivityCooperatingOrganization>(res.activityCooperatingOrganizations);
        }, error: (err) => {
          console.log(err);
          this._router.navigate(['/admission/schedule-activities-list']);
        },
        complete: () => {
          this._ActivityService.loading = false;
        }
      })
  }

  deleteRomsAsignado(rooms: RoomRequestRoom, id: any) {
    this._masterLounge.DeleteRoomsRequirement(rooms.room.id, id).subscribe({
      next: () => {
        Swal.fire({
          title: "Escuela Judicial",
          text: 'Eliminado correctamente.',
          icon: "success"
        });
        this.getOneActivity();
      },
      error: () => {
        Swal.fire({
          title: "Escuela Judicial",
          text: 'Intente nuevamente.',
          icon: "warning"
        });
      }
    })
  }

  deleteRequirement(requirement: RoomRequestRoomRequirement, id: any) {
    this._suppleService.DeleteSuppliesRequirement(requirement.roomRequirement.id, id).subscribe({
      next: () => {
        Swal.fire({
          title: "Escuela Judicial",
          text: 'Eliminado correctamente.',
          icon: "success"
        });
        this.getOneActivity();
      },
      error: () => {
        Swal.fire({
          title: "Escuela Judicial",
          text: 'Intente nuevamente.',
          icon: "warning"
        });
      }
    })
  }
  irDetalle(id: any) {
    //abrir modals.
  }

 public getRoomRequestRoomDateTimeSlots(id:number):void {

    this._masterLounge.getRoomRequestRoomDateTimeSlots(id).subscribe({
      next: (request) => {
        this.lstRoomRequestRoomDateTimeSlots[id] = request as RoomRequestRoomDateTimeSlots[];
      },
      error: () => {
        const temp :RoomRequestRoomDateTimeSlots[] = [];
        this.lstRoomRequestRoomDateTimeSlots[id] = temp;
        Swal.fire({
          title: "Escuela Judicial",
          text: 'Intente nuevamente.',
          icon: "warning"
        });
      }
    });
  }


  OndeleteRoomRequestRoomDateTimeSlots(id:number, timeSloteId:number) {
    this._masterLounge.deleteRoomRequestRoomDateTimeSlots(id,timeSloteId).subscribe({
      next: () => {
        Swal.fire({
          title: "Escuela Judicial",
          text: 'Eliminado correctamente.',
          icon: "success"
        });
        this.getOneActivity();
      },
      error: () => {
        Swal.fire({
          title: "Escuela Judicial",
          text: 'Intente nuevamente.',
          icon: "warning"
        });
      }
    })
  }

}
