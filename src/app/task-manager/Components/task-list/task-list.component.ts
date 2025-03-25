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
  console.log("refresh");
  this.loadTasks();

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

