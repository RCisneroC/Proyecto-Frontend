
import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { AnnualPlanService } from 'app/admission/FormalEducations/Services/annual-plan.service';
import { DegreeService } from 'app/admission/FormalEducations/Services/degree.service';
import { SubjectServiceService } from 'app/admission/FormalEducations/Services/subject-service.service';
import { VerificarBS64Pipe } from 'app/pipes/verificar-bs64.pipe';
import { CreateRoomsPeriodComponent } from '../../Forms/create-rooms-period/create-rooms-period.component';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import Swal from 'sweetalert2';
import { RoomsService } from 'app/admission/FormalEducations/Services/rooms.service';
import { Rooms } from 'app/admission/FormalEducations/Models/Rooms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-create-rooms',
  templateUrl: './create-rooms.component.html',
  styleUrls: ['./create-rooms.component.scss']
})
export class CreateRoomsComponent extends UnsubscribeOnDestroyAdapter
  implements OnInit {


  DisplayNamePeriod: string[] = [
    'name',
    'descripcion',
    'Estado',
    'accion',
  ];
  public id: string = '';
  public degree: string = '';
  public cantidad: number = 0;
  public CountYears: any[] = [];
  public anioSelect: any = 0;
  busqueda: UntypedFormGroup;

  dataSorceRooms: Rooms[] = [
    {
      statusId: 0,
      id: 0,
      name: '',
      description: '',
    },
  ];
  dataRooms = new MatTableDataSource<Rooms>(this.dataSorceRooms);

  @ViewChild('rooms')
  set paginatorRooms(value: MatPaginator) {
    this.dataRooms.paginator = value;
  }
  constructor(
    private _Router: Router,
    private activatedRoute: ActivatedRoute,
    public _AnnualPlanService: AnnualPlanService,
    public _dialog: MatDialog,
    public _verificarBS64: VerificarBS64Pipe,
    public _subjectService: SubjectServiceService,
    public _Degree: DegreeService,
    private fb: UntypedFormBuilder,
    public _RoomService: RoomsService
  ) {
    super();

    this.busqueda = this.fb.group({
      busquedaAnio: [''],
    });
    this.activatedRoute.params.subscribe((params) => {
      _Degree.init_DetalleMalla();
      this.id = params['id'];
      this.degree = params['id_degree'];
      this.getOneMalla();
      this.getRooms();
      ;
    });
  }

  getOneMalla() {
    this._Degree.init_DetalleMalla();
    this._Degree.getOneMallaCurricular(this.degree).subscribe({
      next: (res) => {
        this._Degree._DetalleMalla = res;
        this.cantidad = this._Degree._DetalleMalla.degree.durationInYears
        for (let index = 1; index <= this.cantidad; index++) {
          this.CountYears.push(index);
        }
      }
    })
  }

  ngOnInit(): void {

  }
  getRooms() {
    this._RoomService.init_Rooms();

    this._RoomService.getAllRoomsFiltro(1).subscribe({
      next: (res) => {
        this._RoomService._Rooms = res;
      }
    })
  }
  volverAtras() {
    var url = localStorage.getItem('url_plan') || '';
    this._Router.navigate([url]);
  }
  onChange(event: any) {
    let data = {
      PeriodId: this.id,
      Year: event.value
    };
    if (event.value != "") {
      this.getGroup(data);
      // this._Degree.getSalonesPeriod(data).subscribe({
      //   next: (res) => {
      //     this.dataRooms = new MatTableDataSource<Rooms>(res);
      //   }
      // })
    } else {
      this.dataRooms = new MatTableDataSource<Rooms>([]);
    }
  }

  getGroup(data: any) {
    this._Degree.getSalonesPeriod(data).subscribe({
      next: (res) => {
        this.dataRooms = new MatTableDataSource<Rooms>(res);
      }
    })
  }

  AddSalones() {
    console.log(this.busqueda);
    if (this.busqueda.controls['busquedaAnio'].value == "") {
      Swal.fire({
        title: 'Escuela Judicial',
        text: 'Debe seleccionar el año',
        icon: 'warning',
      });
      return;
    }
    const dialogRef = this._dialog.open(CreateRoomsPeriodComponent, {
      data: {
        id_periodo: this.id,
        accion: 'add',
        id_years: this.busqueda.controls['busquedaAnio'].value,
        Rooms: this._RoomService._Rooms
      },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result: ResponseMessageMaestra) => {
      if (result == undefined) {
        return;
      }
      if (result.CodError == 200) {
        let dataYears = {
          PeriodId: this.id,
          Year: this.busqueda.controls['busquedaAnio'].value
        };
        this.getGroup(dataYears);
        Swal.fire({
          title: 'Escuela Judicial',
          text: result.Message,
          icon: 'success',
        });
      } else {
        Swal.fire({
          title: 'Escuela Judicial',
          text: result.Message,
          icon: 'warning',
        });
      }
    });
  }
  submit() {

  }

  deleteRoomsPeriod(row: Rooms) {
    let data = {
      periodId: this.id,
      year: this.busqueda.controls['busquedaAnio'].value,
      roomId: row.id,
    }
    this._Degree.DeleteRooms(data).subscribe({
      next: () => {
        Swal.fire({
          title: 'Escuela Judicial',
          text: 'Eliminado correctamente.',
          icon: 'success',
        });

        let dataYears = {
          PeriodId: this.id,
          Year: this.busqueda.controls['busquedaAnio'].value
        };
        this.getGroup(dataYears);
      }, error: () => {
        Swal.fire({
          title: 'Escuela Judicial',
          text: 'Intente nuevamente.',
          icon: 'warning',
        });
      }
    });
  }
  GoRoomsPeriod(row: Rooms) {

  }
}
