import { ChangeDetectorRef, Component, OnInit, ViewChild, OnDestroy} from '@angular/core';
import { CallsTeachersService } from '../services/calls-teachers.service';
import { TeacherDocumentsStatus } from '../models/TeacherDocumentsStatus';
import { Filtros } from 'app/estadisticas/PersonalDocente/model/Filtros';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { HttpErrorResponse } from '@angular/common/http';
import { TableElement, TableExportUtil } from '@shared';
import { StatusTeacherPipe } from 'app/pipes/status-teacher.pipe';

@Component({
  selector: 'app-teacher-document-status',
  templateUrl: './teacher-document-status.component.html',
  styleUrls: ['./teacher-document-status.component.scss']
})
export class TeacherDocumentStatusComponent implements OnInit, OnDestroy{
  public listResultados : TeacherDocumentsStatus[] = [];
  public filtros = new FormControl();
  public lstFiltrosSelected: string= "";
  public subscriptions: Subscription[] = [];
  public IsLoading: boolean = false;
  dataSource = new MatTableDataSource<TeacherDocumentsStatus>(this.listResultados);
  @ViewChild('paginator', { static: true })
  paginator!: MatPaginator;
  displayedColumns = [
    'cedula',
    'name',
    'lastName',
    'gender',
    'dateOfBirth',
    'placeOfBirth',
    'email',
    'phoneNumber',
    'placeResidence',
    'statusId',
  ];
  public lstFiltros: Filtros[] = [
    {
      codigo: "0",
      texto: "No completado"
    },
    {
      codigo: "1",
      texto: "Verificados"
    },
    {
      codigo: "2",
      texto: "Ambos"
    },
  ];

  constructor(private servCallsTeachersService: CallsTeachersService,
    private cb: ChangeDetectorRef,
    private statusPipe: StatusTeacherPipe,){}

  ngOnInit(): void {
    this.consultar();
  }

  consultar():void{
    this.IsLoading = true;
    const lstF: string[] = [];
    lstF[0] = this.lstFiltrosSelected;
    this.servCallsTeachersService.GetByDocumentsStatesTeachers(lstF).subscribe(
      {
        next: (request: TeacherDocumentsStatus[]) => {
          this.listResultados = request;
          this.dataSource = new MatTableDataSource<TeacherDocumentsStatus>(this.listResultados);
          this.dataSource.paginator = this.paginator;
          this.IsLoading = false;
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
          this.IsLoading = false;
        }
      }
    );
  }

  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
    this.dataSource.paginator = this.paginator;
  }

  exportExcel(){
    const exportData: Partial<TableElement>[] =
    this.dataSource.filteredData.map((x) => ({
      'Cedula': x.cedula,
      'Nombre': x.name,
      'Apellido': x.lastName,
      'Sexo': x.gender == null ? "" : x.gender,
      'Fecha de Nacimiento': x.dateOfBirth == null ? "" : x.dateOfBirth,
      'Lugar de Nacimiento': x.placeOfBirth == null ? "" : x.placeOfBirth,
      'Correo_Electronico': x.email,
      'No_Telefono': x.phoneNumber == null ? "" : x.phoneNumber,
      'Lugar_Residencia': x.placeResidence,
      'Estado': x.statusId == null ? "" : this.statusPipe.transform(x.statusId),
    }));
  TableExportUtil.exportToExcel(exportData, 'excel');
 }

 sortData(sort: Sort) {
  const data = this.listResultados.slice();
  if (!sort.active || sort.direction === '') {
    this.dataSource = new MatTableDataSource<TeacherDocumentsStatus>(data);
    this.dataSource.paginator = this.paginator;
    return;
  }

  this.listResultados = data.sort((a, b) => {
    const isAsc = sort.direction === 'asc';
    switch (sort.active) {
      case 'cedula':
        return this.compare(a.cedula, b.cedula, isAsc);
      case 'name':
        return this.compare(a.name, b.name, isAsc);
      case 'lastName':
        return this.compare(a.lastName, b.lastName, isAsc);
      case 'dateOfBirth':
        return this.compare(a.dateOfBirth, b.dateOfBirth, isAsc);
      case 'placeOfBirth':
        return this.compare(a.placeOfBirth, b.placeOfBirth, isAsc);
      case 'email':
          return this.compare(a.email, b.email, isAsc);
      case 'phoneNumber':
            return this.compare(a.phoneNumber, b.phoneNumber, isAsc);
      case 'placeResidence':
              return this.compare(a.placeResidence, b.placeResidence, isAsc);
      case 'statusId':
                return this.compare(a.statusId, b.statusId, isAsc);
      default:
        return 0;
    }
  });
  this.dataSource = new MatTableDataSource<TeacherDocumentsStatus>(this.listResultados);
  this.dataSource.paginator = this.paginator;
}

 compare(a: number | string, b: number | string, isAsc: boolean):number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}


public eventSelection() {
  this.cb.detectChanges();
}

ngOnDestroy(): void {
  this.subscriptions.forEach(s => s.unsubscribe())
}

}

