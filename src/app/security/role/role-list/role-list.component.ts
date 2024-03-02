

import { SelectionModel, DataSource } from '@angular/cdk/collections';

import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarVerticalPosition, MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { TableElement, TableExportUtil, UnsubscribeOnDestroyAdapter } from '@shared';

import { RoleService } from './services/role.service';
import { Menu, Role, SubMenu } from 'app/security/models/role';
import { BehaviorSubject, Observable, fromEvent, map, merge } from 'rxjs';
import { Direction } from '@angular/cdk/bidi';
import { RoleFormComponent } from '../role-form/role-form.component';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { FormsAsignedRolesComponent } from '../forms-asigned-roles/forms-asigned-roles.component';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss']
})
export class RoleListComponent extends UnsubscribeOnDestroyAdapter
  implements OnInit {

  displayedColumns = [
    'name',
    'actions',
  ];

  public _menu: Menu[] = [
    {
      id: 1,
      name: 'Planificación',
    },
    {
      id: 2,
      name: 'Inscripción de Entrenamiento',
    },
    {
      id: 3,
      name: 'Inscripción de Educación Especializada',
    },
    {
      id: 4,
      name: 'Aprobaciones de Entrenamiento',
    },
    {
      id: 5,
      name: 'Aprobaciones de Educación Especializada',
    },
    {
      id: 6,
      name: 'Ajustes Educación Especializada',
    },
    {
      id: 8,
      name: 'Ajustes Educación Especializada',
    },
    {
      id: 9,
      name: 'Gestión de Solicitudes Varias',
    },
    {
      id: 10,
      name: 'Panel de control del estudiante',
    },
    {
      id: 12,
      name: 'Matricula del estudiante',
    },
    {
      id: 13,
      name: 'Historial Academido del estudiante',
    },
    {
      id: 14,
      name: 'Perfil del docente',
    },
    {
      id: 15,
      name: 'Solicitudes de docentes',
    },
    {
      id: 16,
      name: 'Historial del docente',
    },
    {
      id: 17,
      name: 'Intranet',
    },
    {
      id: 18,
      name: 'Seguridad',
    },

  ]
  public _SubMenu: SubMenu[] = [
    {
      id: 1,
      name: 'Cronograma de Entrenamieno',
      idMenu: 1
    },
    {
      id: 2,
      name: 'Cronograma de Educación Especializada',
      idMenu: 1
    },
    {
      id: 3,
      name: 'Incripción por Backoffice',
      idMenu: 2
    },
    {
      id: 4,
      name: 'Listado de participantes',
      idMenu: 2
    },
    {
      id: 5,
      name: 'Incripción por Backoffice',
      idMenu: 3
    },
    {
      id: 6,
      name: 'Listado de participantes',
      idMenu: 3
    },
    {
      id: 5,
      name: 'Cronograma de Entrenamiento',
      idMenu: 4
    },
    {
      id: 6,
      name: 'Solicitudes de Salones',
      idMenu: 4
    },
    {
      id: 5,
      name: 'Solicitudes de Afiches',
      idMenu: 4
    },
    {
      id: 6,
      name: 'Plan Anual',
      idMenu: 5
    },
    {
      id: 5,
      name: 'Mallas Curriculares',
      idMenu: 5
    },
    {
      id: 6,
      name: 'Solicitud de Afiches',
      idMenu: 5
    }
  ]
  exampleDatabase?: RoleService;
  dataSource!: ExampleDataSource;
  selection = new SelectionModel<Role>(true, []);
  id?: string;
  role?: Role;

  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public roleService: RoleService,
    private snackBar: MatSnackBar
  ) {
    super();
  }
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild('filter', { static: true }) filter!: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu?: MatMenuTrigger;
  contextMenuPosition = { x: '0px', y: '0px' };
  ngOnInit() {
    console.log('====================================');
    console.log(this._menu, this._SubMenu);
    console.log('====================================');
    this.loadData();
  }
  refresh() {
    this.loadData();
  }
  addNew() {
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(RoleFormComponent, {
      data: {
        role: this.role,
        action: 'add',
      },
      direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        this.exampleDatabase?.dataChange.value.unshift(
          this.roleService.getDialogData()
        );
        this.refreshTable();
        this.showNotification(
          'snackbar-success',
          'Registro creado exitosamente...!!!',
          'bottom',
          'center'
        );
      }
    });
  }
  editCall(row: Role) {
    this.id = row.id;
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(RoleFormComponent, {
      data: {
        role: row,
        action: 'edit',
      },
      direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.exampleDatabase?.dataChange.value.findIndex(
          (x) => x.id === this.id
        );
        // Then you update that record using data from dialogData (values you enetered)
        if (foundIndex != null && this.exampleDatabase) {
          this.exampleDatabase.dataChange.value[foundIndex] =
            this.roleService.getDialogData();
          // And lastly refresh table
          this.refreshTable();
          this.showNotification(
            'black',
            'Registro editado exitosamente...!!!',
            'bottom',
            'center'
          );
        }
      }
    });
  }
  addPermisos(row: Role) {

    this.id = row.id;
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(FormsAsignedRolesComponent, {
      data: {
        role: row,
        action: 'nuevo'
      },
      direction: tempDirection,
      width: "900px"
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result: ResponseMessageMaestra) => {
      if (result == undefined) {
        return;
      }
      if (result.CodError == 200) {
        this.loadData();
        Swal.fire({
          title: "Escuela Judicial",
          text: result.Message,
          icon: "success"
        });
      } else {
        Swal.fire({
          title: "Escuela Judicial",
          text: result.Message,
          icon: "warning"
        });
      }
    });
  }

  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }
  /** Whether the number of selected elements matches the total number of rows. */


  /** Selects all rows if they are not all selected; otherwise clear selection. */


  public loadData() {
    this.exampleDatabase = new RoleService(this.httpClient);
    this.dataSource = new ExampleDataSource(
      this.exampleDatabase,
      this.paginator,
      this.sort
    );
    this.subs.sink = fromEvent(this.filter.nativeElement, 'keyup').subscribe(
      () => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      }
    );
  }
  showNotification(
    colorName: string,
    text: string,
    placementFrom: MatSnackBarVerticalPosition,
    placementAlign: MatSnackBarHorizontalPosition
  ) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

  // export table data in excel file
  exportExcel() {
    // key name with space add in brackets
    const exportData: Partial<TableElement>[] =
      this.dataSource.filteredData.map((x) => ({
        'First Name': x.name,

      }));

    TableExportUtil.exportToExcel(exportData, 'excel');
  }


}
export class ExampleDataSource extends DataSource<Role> {
  filterChange = new BehaviorSubject('');
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: Role[] = [];
  renderedData: Role[] = [];
  constructor(
    public exampleDatabase: RoleService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Role[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    this.exampleDatabase.getAllRols();
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.exampleDatabase.data
          .slice()
          .filter((role: Role) => {
            const searchStr = (role.name).toLowerCase();
            return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
          });
        // Sort filtered data
        const sortedData = this.sortData(this.filteredData.slice());
        // Grab the page's slice of the filtered sorted data.
        const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
        this.renderedData = sortedData.splice(
          startIndex,
          this.paginator.pageSize
        );
        return this.renderedData;
      })
    );
  }
  disconnect() {
    //disconnect
  }
  /** Returns a sorted copy of the database data. */
  sortData(data: Role[]): Role[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';
      switch (this._sort.active) {
        case 'id':
          [propertyA, propertyB] = [a.id, b.id];
          break;
        case 'name':
          [propertyA, propertyB] = [a.name, b.name];
          break;

      }
      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
      return (
        (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1)
      );
    });
  }
}