import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TableElement, TableExportUtil, UnsubscribeOnDestroyAdapter } from '@shared';
import { InscriptionService } from '../../services/inscription.service';
import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatMenuTrigger } from '@angular/material/menu';
import { Direction } from '@angular/cdk/bidi';
import { BehaviorSubject, Observable, fromEvent, map, merge } from 'rxjs';
import { GetDataResultResponse, Participant } from '../../../models/participant';

import { ActivatedRoute, Router } from '@angular/router';
import { ApproveParticipantComponent } from './detalle/approve-participant/approve-participant.component';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-activity-participants-list',
  templateUrl: './activity-participants-list.component.html',
  styleUrls: ['./activity-participants-list.component.scss']
})
export class ActivityParticipantsListComponent  extends UnsubscribeOnDestroyAdapter
  implements OnInit{
    displayedColumns = [
      'name',
      'lastName',
      'cedula',
      'activdad',
      'estado',
      'fecha_inscrito',
      'actions',
    ];
    
    exampleDatabase?: InscriptionService;
    dataSource!: ExampleDataSource;
    selection = new SelectionModel<Participant>(true, []);
    id?: any;
    schedule?: Participant;
  
    constructor(
      public httpClient: HttpClient,
      public dialog: MatDialog,
      public scheduleActivitiesService:InscriptionService ,
      private snackBar: MatSnackBar,
      private router: Router,
      private activatedRoute:ActivatedRoute
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
       this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
  })
      this.loadData();
    }
    refresh() {
      this.loadData();
    }
    ViewDetail(row:Participant) {
      this.router.navigate(['/admission/activity-list-inscription',row.id]);
    }
    editCall(row: Participant) {
     
    }
    addNew() {
      let tempDirection: Direction;
    
    }
  
    aprobar(row:GetDataResultResponse) {
      const dialogRef = this.dialog.open(ApproveParticipantComponent, {
          data: {
            participant : row,
            accion: 'approved',
          },
          disableClose:true
        });

        dialogRef.afterClosed().subscribe((result:ResponseMessageMaestra) => {
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
    /** Whether the number of selected elements matches the total number of rows. */
  
  
    /** Selects all rows if they are not all selected; otherwise clear selection. */
  
  
    public loadData() {
      this.exampleDatabase = new InscriptionService(this.httpClient);
      this.dataSource = new ExampleDataSource(
        this.exampleDatabase,
        this.paginator,
        this.sort,
         this.activatedRoute
      );
      console.log(this.dataSource)
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
          'Nombre': x.firstName.toString(),
          'Apellido': x.lastName.toString(),
          'Cedula': x.cedula.toString(),
          'Actividad': x.activityName.toString(),
          'Estado': x.statusName.toString(),
          'Fecha': x.fechaInscrito.toString()
        }));
  
      TableExportUtil.exportToExcel(exportData, 'excel');
    }
  }
  export class ExampleDataSource extends DataSource<GetDataResultResponse> {
    filterChange = new BehaviorSubject('');
    get filter(): string {
      return this.filterChange.value;
    }
    set filter(filter: string) {
      this.filterChange.next(filter);
    }
     id!: any;
    filteredData: GetDataResultResponse[] = [];
    renderedData: GetDataResultResponse[] = [];
    constructor(
      public exampleDatabase: InscriptionService,
      public paginator: MatPaginator,
      public _sort: MatSort,
      public activatedRoute: ActivatedRoute
    ) {
      super();
      // Reset to the first page when the user changes the filter.
      this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
    }
    /** Connect function called by the table to retrieve one stream containing the data to render. */
    connect(): Observable<GetDataResultResponse[]> {
      this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
  })
      // Listen for any changes in the base data, sorting, filtering, or pagination
      const displayDataChanges = [
        this.exampleDatabase.dataChangeParticipant,
        this._sort.sortChange,
        this.filterChange,
        this.paginator.page,
      ];
      this.exampleDatabase.getParticipanteActividad(this.id);
      return merge(...displayDataChanges).pipe(
        map(() => { 
          this.filteredData = this.exampleDatabase.dataParticipantActivity
            .slice()
            .filter((role: GetDataResultResponse) => {
              const searchStr = (role.firstName).toLowerCase();
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
    sortData(data: GetDataResultResponse[]): GetDataResultResponse[] {
      if (!this._sort.active || this._sort.direction === '') {
        return data;
      }
      return data.sort((a, b) => {
        let propertyA: number | string = '';
        let propertyB: number | string = '';
        switch (this._sort.active) {
          case 'id':
            [propertyA, propertyB] = [a.cedula, b.cedula];
            break;
          case 'name':
            [propertyA, propertyB] = [a.firstName, b.firstName];
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