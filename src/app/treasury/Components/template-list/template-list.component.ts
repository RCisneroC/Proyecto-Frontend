import { Direction } from '@angular/cdk/bidi';
import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { UnsubscribeOnDestroyAdapter } from '@shared/UnsubscribeOnDestroyAdapter';
import { Template } from 'app/treasury/Models/Template';
import { TemplateService } from 'app/treasury/Services/template.service';
import { TemplateFormComponent } from '../template-form/template-form.component';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import Swal from 'sweetalert2';
import { BehaviorSubject, fromEvent, map, merge, Observable } from 'rxjs';
import { TableElement, TableExportUtil } from '@shared';

import { VerificarBS64Pipe } from 'app/pipes/verificar-bs64.pipe';
import { ViewPosterPDFComponent } from 'app/admission/activitydetail/forms/view-poster-pdf/view-poster-pdf.component';
import { ViewPosterComponent } from 'app/admission/activitydetail/forms/view-poster/view-poster.component';
import { AuthService } from '@core/service/auth.service';

@Component({
  selector: 'app-template-list',
  templateUrl: './template-list.component.html',
  styleUrls: ['./template-list.component.scss']
})
export class TemplateListComponent extends UnsubscribeOnDestroyAdapter
implements OnInit{

  displayedColumns = [
    'description',
    'statusId',
    'actualizar',
    'logo',
    'actions',
  ];
  
  exampleDatabase?: TemplateService;
  dataSource!: ExampleDataSource;
  selection = new SelectionModel<Template>(true, []);
  id?: number;
  template!: Template;
  loadingFile!: boolean;


  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public templateService: TemplateService,
    private authService: AuthService,
    public _verificarBS64: VerificarBS64Pipe,
    private snackBar: MatSnackBar,
    public elm: ElementRef
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
    const dialogRef = this.dialog.open(TemplateFormComponent, {
      data: {
        template: this.template,
        action: 'add',
      },
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
  editCall(row: Template) {
    this.id = row.id;
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(TemplateFormComponent, {
      data: {
        template: row,
        action: 'edit',
      },
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

  viewLogo(row: Template) {

    this.templateService.getAllTemplate2(row.id).subscribe({
      next:(data:any)=>{
      const res=data['getTemplates'][0].logo
      console.log(data['getTemplates'][0].logo);
        if (this._verificarBS64.transform(res) != "pdf") {
          const dialogRef = this.dialog.open(ViewPosterComponent, {
            data: {
              type: this._verificarBS64.transform(res),
              accion: 'view-poster',
              posterFile: res,
              comment: "",
              poster: row,
            },
            disableClose: true,
          });
        } else {
          const dialogRef = this.dialog.open(ViewPosterPDFComponent, {
            data: {
              type: this._verificarBS64.transform(res),
              accion: 'view-poster',
              posterFile: res,
              comment: "",
              poster: row,
            },
            width: '1000px',
            disableClose: true,
          });
        }
        },
        error: (err:any) => {
          console.log(err);
           Swal.fire({
            title: "Intente nuevamente!",
            text: row.description+" no se pudo eliminar.",
            icon: "warning"
          });
        }
    })
 

  }
  
  onChangeFile(event: any, docTypeId: number,element:Template) {
    this.loadingFile = true;
    const files: FileList = event.target.files;
    const elementImg = this.elm.nativeElement.querySelector('#archivo_' + docTypeId);
    const elementText = this.elm.nativeElement.querySelector('#texto_' + docTypeId);
    if (files.length > 0) {
      if ( files[0].type != 'image/png' && files[0].type != 'image/jpeg') {
        Swal.fire({
          title: "Escuela Judicial",
          text: 'Solo se permite tipo de archivo JPG/PNG.',
          icon: "warning"
        });
        this.loadingFile = false;
        elementImg.value = '';
        return;
      }
      const formData = new FormData();
      formData.append('Id', element.id.toString());
      formData.append('Description', element?.description);
      formData.append('CreatedBy',this.authService.currentUserValue.id);
      formData.append('ModifiedBy', this.authService.currentUserValue.id);
      formData.append('Logo',files[0]);
      formData.append('StatusId', element?.statusId.toString());
     
      this.templateService.updateTemplateMode(formData).subscribe(
        {
          next: () => {
            Swal.fire({
              title: "Escuela Judicial",
              text: ' Cargado Correctamente.',
              icon: "success"
            });
            elementImg.value = '';
            elementText.innerHTML =  'Cargado Correctamente.';
            this.ngOnInit();
            this.loadingFile = false;

          }, error: (err: HttpErrorResponse) => {
            console.log(err);

            elementImg.value = '';
            Swal.fire({
              title: "Escuela Judicial",
              text: 'Intente nuevamente..',
              icon: "warning"
            });
            this.loadingFile = false;
          }
        }
      );

    }
 }
  delete(row:Template) {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "Eliminara "+row.description,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.templateService.DeleteTemplateMode(row.id).subscribe({
        next:()=>{
             Swal.fire({
              title: "Eliminado!",
              text: row.description+" fue eliminado.",
              icon: "success"
            });
            this.loadData();
          },
          error: (err:any) => {
            console.log(err);
             Swal.fire({
              title: "Intente nuevamente!",
              text: row.description+" no se pudo eliminar.",
              icon: "warning"
            });
          }
      })
      } else { /* empty */ }
    });
  }

  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }
  /** Whether the number of selected elements matches the total number of rows. */


  /** Selects all rows if they are not all selected; otherwise clear selection. */


  public loadData() {
    this.exampleDatabase = new TemplateService(this.httpClient);
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
        'First Name': x.description,
       
      }));

    TableExportUtil.exportToExcel(exportData, 'excel');
  }


}
export class ExampleDataSource extends DataSource<Template> {
  filterChange = new BehaviorSubject('');
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: Template[] = [];
  renderedData: Template[] = [];
  constructor(
    public exampleDatabase: TemplateService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Template[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    this.exampleDatabase.getAllTemplate();
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.exampleDatabase.data
          .slice()
          .filter((template: Template) => {
            const searchStr = (template.description).toLowerCase();
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
  sortData(data: Template[]): Template[] {
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
        case 'description':
          [propertyA, propertyB] = [a.description, b.description];
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

