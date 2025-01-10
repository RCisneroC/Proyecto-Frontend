import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TableElement, TableExportUtil, UnsubscribeOnDestroyAdapter } from '@shared';
import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { Cooperating } from 'app/admission/models/Cooperating';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatMenuTrigger } from '@angular/material/menu';
import { Direction } from '@angular/cdk/bidi';
import { FormCooperatingOrganizationComponent } from '../form-cooperating-organization/form-cooperating-organization.component';
import { ResponseGenerica, ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import Swal from 'sweetalert2';
import { CooperationgOrganizationService } from '../services/cooperationg-organization.service';
import { BehaviorSubject, Observable, fromEvent, map, merge } from 'rxjs';
import { VerificarBS64Pipe } from 'app/pipes/verificar-bs64.pipe';
import { ViewLogoComponent } from 'app/admission/activitydetail/forms/view-logo/view-logo.component';

@Component({
  selector: 'app-list-cooperating-organization',
  templateUrl: './list-cooperating-organization.component.html',
  styleUrls: ['./list-cooperating-organization.component.scss']
})
export class ListCooperatingOrganizationComponent extends UnsubscribeOnDestroyAdapter
implements OnInit{

  displayedColumns = [
    'name',
    'description',
    'image',
    'statusId',
    'actions',
  ];
  
  exampleDatabase?: CooperationgOrganizationService;
  dataSource!: ExampleDataSource;
  selection = new SelectionModel<Cooperating>(true, []);
  id?: number;
  cooperating?: Cooperating;

  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public _CooperatingOrganizationService: CooperationgOrganizationService,
    private snackBar: MatSnackBar,
    private _verificarBS64:VerificarBS64Pipe
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
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(FormCooperatingOrganizationComponent, {
      data: {
        cooperating: {
                  id: 0,
                  description: '',
                  name: '',
                  statusId: 1,
                  logo:'',
                },
        action: 'add',
      },
      disableClose:true,
      direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result:ResponseMessageMaestra) => {
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
  editCall(row: Cooperating) {
    this.id = row.id;
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(FormCooperatingOrganizationComponent, {
      data: {
        cooperating: row,
        action: 'edit',
      },
      direction: tempDirection,
      disableClose:true,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result:ResponseMessageMaestra) => {
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

  viewDocumento(row:Cooperating) {
    this._CooperatingOrganizationService.getByIdLogo(row.id).subscribe({
      next: (logo) => {
        if (logo.logo == null) {
         Swal.fire({
              title: "Escuela Judicial!",
              text: "No mantiene logo cargado.",
              icon: "warning"
            });
          return;
       }

        if (this._verificarBS64.transform(logo.logo.fileContents) != "pdf") {
              const dialogRef = this.dialog.open(ViewLogoComponent, {
              data: {
                type: this._verificarBS64.transform(logo.logo.fileContents),
                accion: 'view-logo',
                logofile: logo.logo.fileContents,
                logo: logo,
              },
              disableClose: true,
            });
            }
      }, error: () => {
        
      }
    })
  }
  delete(row:Cooperating) {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "Inactivar "+row.name,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Inactivar"
    }).then((result) => {
      if (result.isConfirmed) {
        this._CooperatingOrganizationService.DeleteCooperating(row.id).subscribe({
        next:(res:ResponseGenerica)=>{
             Swal.fire({
              title: "Eliminado!",
              text: row.name+" fue Inactivado.",
              icon: "success"
            });
            this.loadData();
          },
          error: (err:any) => {
            console.log(err);
             Swal.fire({
              title: "Intente nuevamente!",
              text: row.name+" no se pudo Inactivar.",
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
  /** Whether the number of selected elements matches the total number of rows. */


  /** Selects all rows if they are not all selected; otherwise clear selection. */


  public loadData() {
    this.exampleDatabase = new CooperationgOrganizationService(this.httpClient);
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
export class ExampleDataSource extends DataSource<Cooperating> {
  filterChange = new BehaviorSubject('');
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: Cooperating[] = [];
  renderedData: Cooperating[] = [];
  constructor(
    public exampleDatabase: CooperationgOrganizationService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Cooperating[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    this.exampleDatabase.getAllCooperating();
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.exampleDatabase.data
          .slice()
          .filter((cooperating: Cooperating) => {
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
  sortData(data: Cooperating[]): Cooperating[] {
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
