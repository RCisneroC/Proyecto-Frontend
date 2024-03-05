import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TableElement, TableExportUtil, UnsubscribeOnDestroyAdapter } from '@shared';
import { MenuService } from '../user/service/menu.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatMenuTrigger } from '@angular/material/menu';
import { ResponseGenerica, ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { FormsMenuComponent } from '../forms-menu/forms-menu.component';
import Swal from 'sweetalert2';
import { MenuResponse } from '../models/role';
import { BehaviorSubject, Observable, fromEvent, map, merge } from 'rxjs';
import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { ViewMenuModalComponent } from '../view-menu-modal/view-menu-modal.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent extends UnsubscribeOnDestroyAdapter
  implements OnInit {

  displayedColumns = [
    'title',
    'icons',
    'estado',
    'accion',
  ];

  exampleDatabase?: MenuService;
  dataSource!: ExampleDataSource;
  selection = new SelectionModel<MenuResponse>(true, []);
  id?: string;
  user?: MenuResponse;

  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public _MenuService: MenuService,
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
    this.loadData();
  }
  refresh() {
    this.loadData();
  }
  AddMenu() {

    const dialogRef = this.dialog.open(FormsMenuComponent, {
      data: {
        menu: this._MenuService._MenuJson,
        action: 'add',
        parent: null
      }
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result: ResponseMessageMaestra) => {
      if (result == undefined) {
        return;
      }

      if (result.CodError == 200) {
        Swal.fire({
          title: "Escuela Judicial",
          text: result.Message,
          icon: "success"
        });
        this.loadData();
      } else {
        Swal.fire({
          title: "Escuela Judicial",
          text: result.Message,
          icon: "warning"
        });
      }
    });
  }
  EditMenu(row: MenuResponse) {

    const dialogRef = this.dialog.open(FormsMenuComponent, {
      data: {
        menu: row,
        action: 'edit',
        parent: null
      }
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result: ResponseMessageMaestra) => {
      if (result == undefined) {
        return;
      }

      if (result.CodError == 200) {
        Swal.fire({
          title: "Escuela Judicial",
          text: result.Message,
          icon: "success"
        });
        this.loadData();
      } else {
        Swal.fire({
          title: "Escuela Judicial",
          text: result.Message,
          icon: "warning"
        });
      }
    });
  }

  addSubmenu(row: MenuResponse) {

    const dialogRef = this.dialog.open(FormsMenuComponent, {
      data: {
        menu: this._MenuService._MenuJson,
        action: 'submenu',
        parent: row.id,
        titulo: row.title
      }
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result: ResponseMessageMaestra) => {
      if (result == undefined) {
        return;
      }

      if (result.CodError == 200) {
        Swal.fire({
          title: "Escuela Judicial",
          text: result.Message,
          icon: "success"
        });
        this.loadData();
      } else {
        Swal.fire({
          title: "Escuela Judicial",
          text: result.Message,
          icon: "warning"
        });
      }
    });
  }

  verMenu(row: MenuResponse) {

    const dialogRef = this.dialog.open(ViewMenuModalComponent, {
      data: {
        menu: row,
        action: 'view',
      }
    });
  }

  delete(row: MenuResponse) {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "Eliminara " + row.title,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
        this._MenuService.DeleteMenu(row.id).subscribe({
          next: (res: ResponseGenerica) => {
            console.log('====================================');
            console.log(res);
            console.log('====================================');
            Swal.fire({
              title: "Eliminado!",
              text: res.message,
              icon: "success"
            });
            this.loadData();
          },
          error: (err: any) => {
            console.log(err);
            Swal.fire({
              title: "Intente nuevamente!",
              text: row.title + " no se pudo eliminar.",
              icon: "warning"
            });
          }
        })
      } else {
      }
    });
  }


  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  public loadData() {
    this.exampleDatabase = new MenuService(this.httpClient);
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
        'usuario': x.title

      }));

    TableExportUtil.exportToExcel(exportData, 'excel');
  }


}
export class ExampleDataSource extends DataSource<MenuResponse> {
  filterChange = new BehaviorSubject('');
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: MenuResponse[] = [];
  renderedData: MenuResponse[] = [];
  constructor(
    public MenuService: MenuService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<MenuResponse[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.MenuService.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    this.MenuService.GetAllMenu();
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.MenuService.data
          .slice()
          .filter((user: MenuResponse) => {
            const searchStr = (
              user.title

            ).toLowerCase();
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
  sortData(data: MenuResponse[]): MenuResponse[] {
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
        case 'title':
          [propertyA, propertyB] = [a.title, b.title];
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
