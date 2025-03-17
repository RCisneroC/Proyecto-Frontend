import { Direction } from '@angular/cdk/bidi';
import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { TableElement, TableExportUtil, UnsubscribeOnDestroyAdapter } from '@shared';
import { TaskManager } from 'app/task-manager/Models/taskModel';
import { TaskManagerService } from 'app/task-manager/Services/task-manager.service';
import { TaskFormComponent } from '../task-form/task-form.component';
import Swal from 'sweetalert2';
import { BehaviorSubject, map, merge, Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent extends UnsubscribeOnDestroyAdapter
  implements OnInit {

  displayedColumns = [
    'title',
    'description',
    'completed',
    'actions',
  ];

  taskDatabase?: TaskManagerService;
  dataSource = new MatTableDataSource<any>();
  selection = new SelectionModel<TaskManager>(true, []);
  id?: number;
  task?: TaskManager;
  filteredTasks: TaskManager[] = [];
  filterValue: string = "all"; // Filtro inicial
  tasks: TaskManager[] = [];
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public taskManagerService: TaskManagerService,
    private snackBar: MatSnackBar,
    private cdRef: ChangeDetectorRef
  ) {
    super();
  }
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild('filter', { static: true }) filter!: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu?: MatMenuTrigger;
  contextMenuPosition = { x: '0px', y: '0px' };

  refresh() {
  this.loadTasks();
   // this.getFilteredTasks('all');
   this.cdRef.detectChanges();
  }


  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskManagerService.getTasks().subscribe({
      next: (data) => {
        this.dataSource.data = data["data"]; // Asigna los datos al dataSource
        this.applyFilter();
      },
      error: (err) => {
        console.error('Error al cargar las tareas:', err); // Manejo de errores
      },
    });
  }
  
  
 
  applyFilter(): void {
    const originalData = this.dataSource.data; // Mantén los datos originales para filtrar

  const filteredData = originalData.filter((task: any) => {
      if (this.filterValue === 'all') {
        return true; // Sin filtrar, retorna todas las tareas
      } else if (this.filterValue === 'completed') {
        return task.completed === true; // Solo tareas completadas
      } else if (this.filterValue === 'pending') {
        return task.completed === false; // Solo tareas pendientes
      }
      return true; // Caso por defecto
    });

    this.dataSource.data = filteredData; // Asignar los datos filtrados
  }
  
  
  addNew() {
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(TaskFormComponent, {
      data: {
        task: this.task,
        action: 'add',
      },
      direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result == undefined) {
        return;
      }
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        this.taskDatabase?.dataChange.value.unshift(
          this.taskManagerService.getDialogData()
        );
        this.refreshTable();
        Swal.fire({
          title: "Gestión de tareas",
          text: "Guardado exitosamente",
          icon: "success"
        });
       // this.loadData();
           this.loadTasks();
      } else {
        Swal.fire({
          title: "Gestión de tareas",
          text: "Intente de nuevo",
          icon: "warning"
        });
      }
    });
  }
  editTask(row: TaskManager) {
    this.id = row.id;
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(TaskFormComponent, {
      data: {
        taskRequest: row,
        action: 'edit',
      },
      direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result == undefined) {
        return;
      }
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        this.taskDatabase?.dataChange.value.unshift(
          this.taskManagerService.getDialogData()
        );
        this.refreshTable();
        Swal.fire({
          title: "Gestión de tareas",
          text: "Guardado exitosamente",
          icon: "success"
        });
        this.loadTasks();
       // this.loadData();
      } else {
        Swal.fire({
          title: "Gestión de tareas",
          text: "Intente de nuevo",
          icon: "warning"
        });
      }
    });
  }
  

  delete(row: TaskManager) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Eliminar ${row.title}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.eliminarTarea(row);
      }
    });
  }
  
   eliminarTarea(row: TaskManager) {
    this.taskManagerService.DeleteTask(row.id).subscribe({
      next: () => this.mostrarMensajeExito(row),
      error: () => this.mostrarMensajeError(row)
    });
  }
  
   mostrarMensajeExito(row: TaskManager) {
    Swal.fire({
      title: 'Gestión de tareas',
      text: `${row.title} fue eliminado.`,
      icon: 'success'
    });
   // this.loadData();
   this.loadTasks();
  }
  
   mostrarMensajeError(row: TaskManager) {
    Swal.fire({
      title: 'Intente nuevamente!',
      text: `${row.title} no se pudo eliminar.`,
      icon: 'warning'
    });
  }
  

   refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }
  /** Whether the number of selected elements matches the total number of rows. */


  /** Selects all rows if they are not all selected; otherwise clear selection. */


  // public loadData() {
  //   this.taskDatabase = new TaskManagerService(this.httpClient);
  //   this.dataSource = new TaskDataSource(
  //     this.taskDatabase,
  //     this.paginator,
  //     this.sort
  //   );
  //   this.subs.sink = fromEvent(this.filter.nativeElement, 'keyup').subscribe(
  //     () => {
  //       if (!this.dataSource) {
  //         return;
  //       }
  //       this.dataSource.filter = this.filter.nativeElement.value;
  //     }
  //   );
  // }
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
        'Title': x.title,

      }));

    TableExportUtil.exportToExcel(exportData, 'excel');
  }


}
export class TaskDataSource extends DataSource<TaskManager> {
  filterChange = new BehaviorSubject('');
  filterValue: string='all';
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: TaskManager[] = [];
  renderedData: TaskManager[] = [];
  constructor(
    public taskDatabase: TaskManagerService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<TaskManager[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.taskDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    this.taskDatabase.getAllTask();
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
     // Aplicar el filtro por booleano (completado o no)
     this.filteredData = this.taskDatabase.data
     .slice()
     .filter((taskManager: TaskManager) => {
       if (this.filterValue === 'all') {
         return true; // Sin filtrar, muestra todo
       } else if (this.filterValue === 'completed') {
         return taskManager.completed === true; // Filtra completados
       } else if (this.filterValue === 'pending') {
         return taskManager.completed === false; // Filtra pendientes
       }
       return true; // Por defecto, muestra todos
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
  sortData(data: TaskManager[]): TaskManager[] {
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

