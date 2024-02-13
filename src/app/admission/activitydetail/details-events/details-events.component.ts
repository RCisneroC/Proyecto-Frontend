import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { GetOneActivity } from 'app/admission/models/GetOneActivity';
import { ActivityDetailService } from 'app/admission/services/activity-detail.service';
import { VerificarBS64Pipe } from 'app/pipes/verificar-bs64.pipe';
import { CreateEventsComponent } from './Forms/create-events/create-events.component';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import Swal from 'sweetalert2';
import { EventsActivity } from 'app/admission/models/EventsActivity';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-details-events',
  templateUrl: './details-events.component.html',
  styleUrls: ['./details-events.component.scss']
})
export class DetailsEventsComponent {
  public DisplayNameDocument = [
    'hora',
    'fecha',
    'tema',
    'docente',
    'accion'
  ]
  public paramsId: string = '';
  dataSourceEvent: EventsActivity[] = [
    this._ActivityService._EventsActivity
  ]
  dataEvent = new MatTableDataSource<EventsActivity>(this.dataSourceEvent);
  // @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatPaginator)
  set paginator(value: MatPaginator) {
    this.dataEvent.paginator = value;
  }
  constructor(
    private Path: ActivatedRoute,
    public _router: Router,
    public _ActivityService: ActivityDetailService,
    public _dialog: MatDialog,
    public _verificarBS64: VerificarBS64Pipe,
    private sanitizer: DomSanitizer
  ) {
    this.Path.params.subscribe((params) => {
      this.paramsId = params['id'];
      this.getOneActivity();
    });
  }
  volverAtras() {
    this._router.navigate(['/admission/activity-detail/' + this.paramsId]);
  }
  getOneActivity() {
    // this._ActivityService.loading = true;
    this._ActivityService.GetOneActivity(this.paramsId).
      subscribe({
        next: (res: GetOneActivity) => {
          this._ActivityService._GetOneActivity = res;
          console.log(this._ActivityService._GetOneActivity);
          this.GetEventsActivity();
        }, error: (err) => {
          this._router.navigate(['/admission/activity-detail/' + this.paramsId]);
        },
        complete: () => {
          //  this._ActivityService.loading = false;
        }
      })
  }
  GetEventsActivity() {
    this._ActivityService.GetEventsActivity(this.paramsId).subscribe({
      next: (res) => {
        this.dataEvent = new MatTableDataSource<EventsActivity>(res);
        this.dataEvent.paginator = this.paginator;
      },
      error: (err) => {

      }
    })
  }
  NewEvents() {
    this._ActivityService.init_EventActivity();
    const dialogRef = this._dialog.open(CreateEventsComponent, {
      data: {
        id_actividad: this.paramsId,
        accion: 'add-events',
        event: this._ActivityService._EventsActivity,
        docentes: this._ActivityService._GetOneActivity.activityTeachers,
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
        this.GetEventsActivity();
      } else {
        Swal.fire({
          title: "Escuela Judicial",
          text: result.Message,
          icon: "warning"
        });
      }
    });
  }

  EditarEvents(row: EventsActivity) {
    this._ActivityService.init_EventActivity();
    const dialogRef = this._dialog.open(CreateEventsComponent, {
      data: {
        id_actividad: this.paramsId,
        accion: 'edit-events',
        event: row,
        docentes: this._ActivityService._GetOneActivity.activityTeachers,
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
        this.GetEventsActivity();
      } else {
        Swal.fire({
          title: "Escuela Judicial",
          text: result.Message,
          icon: "warning"
        });
      }
    });
  }


  deleteEvents(row: EventsActivity) {
    console.log(row);

    Swal.fire({
      title: "¿Estas seguro?",
      text: "Eliminara " + row.name,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar",
      cancelButtonText: "No, Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this._ActivityService.DeleteEvents(row.id).subscribe({
          next: (res) => {
            Swal.fire({
              title: "Eliminado!",
              text: row.name + " fue eliminado.",
              icon: "success"
            });
            this.GetEventsActivity();
          }, error: () => {
            Swal.fire({
              title: "Intente nuevamente!",
              text: row.name + " no se pudo eliminar.",
              icon: "warning"
            });
          }
        })
      } else {
      }
    });

  }

  // DeleteEvents
}
