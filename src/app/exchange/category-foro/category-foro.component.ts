import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Category, CategoryResponse } from '../models/Category';
import { UnsubscribeOnDestroyAdapter } from '../../shared/UnsubscribeOnDestroyAdapter';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, fromEvent, map, merge, Observable } from 'rxjs';
import { environment } from 'environments/environment.development';
import { ResponseGenerica, ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { CategoryServiceForoService } from '../services/category-service-foro.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute, Router } from '@angular/router';
import { VerificarBS64Pipe } from 'app/pipes/verificar-bs64.pipe';
import { CategoryFormsForoComponent } from '../Forms/category-forms-foro/category-forms-foro.component';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatMenuTrigger } from '@angular/material/menu';
import { TableElement, TableExportUtil } from '@shared';

@Component({
  selector: 'app-category-foro',
  templateUrl: './category-foro.component.html',
  styleUrls: ['./category-foro.component.scss']
})
export class CategoryForoComponent extends UnsubscribeOnDestroyAdapter
  implements OnInit {

  displayedColumns = [
    'name',
    'description',
    'fechacreacion',
    'actions',
  ];

  exampleDatabase?: CategoryServiceForoService;
  dataSource!: ExampleDataSource;
  selection = new SelectionModel<Category>(true, []);
  id?: number;
  cooperating?: Category;

  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public _dialog: MatDialog,
    public _CategoryServiceForoService: CategoryServiceForoService,
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

  addNew() {
    this._CategoryServiceForoService.init_Category();
    const dialogRef = this.dialog.open(CategoryFormsForoComponent, {
      data: {
        categoria: this._CategoryServiceForoService._Category,
        accion: 'add-category',
      },
      disableClose: true
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

  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  editCall(row: Category) {
    this._CategoryServiceForoService.init_Category();
    const dialogRef = this.dialog.open(CategoryFormsForoComponent, {
      data: {
        categoria: row,
        accion: 'edit-category',
      },
      disableClose: true
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
  delete(row: Category) {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "Eliminara " + row.name,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
        this._CategoryServiceForoService.DeleteCategory(row.categorieId).subscribe({
          next: (res: ResponseGenerica) => {
            Swal.fire({
              title: "Eliminado!",
              text: row.name + " fue eliminado.",
              icon: "success"
            });
            this.loadData();
          },
          error: (err: any) => {
            console.log(err);
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
        'Categoria': x.name,
        'Descripción': x.descripion,

      }));

    TableExportUtil.exportToExcel(exportData, 'excel');
  }


  public loadData() {
    this.exampleDatabase = new CategoryServiceForoService(this.httpClient);
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

}

export class ExampleDataSource extends DataSource<Category> {
  filterChange = new BehaviorSubject('');
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: Category[] = [];
  renderedData: Category[] = [];
  constructor(
    public exampleDatabase: CategoryServiceForoService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Category[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    this.exampleDatabase.getAllCategoria();
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.exampleDatabase.data
          .slice()
          .filter((cooperating: Category) => {
            const searchStr = (cooperating.name).toLowerCase();
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
  sortData(data: Category[]): Category[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';
      switch (this._sort.active) {
        case 'id':
          [propertyA, propertyB] = [a.categorieId, b.categorieId];
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
