import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { GetOneActivity } from 'app/admission/models/GetOneActivity';
import { ActivityDetailService } from 'app/admission/services/activity-detail.service';
import { ActivityListService } from 'app/intranet-academic-registration/Services/activity-list.service';
import { FormsCreateTaskComponent } from '../Forms/forms-create-task/forms-create-task.component';
import Swal from 'sweetalert2';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { TaskActivity } from 'app/intranet-academic-registration/Models/TaskSubject';
import { SubjectListService } from 'app/intranet-academic-registration/Services/subject-list.service';
import { ResponseGenerica, ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { ResponseListActivity, TaskActivityData } from 'app/intranet-academic-registration/Models/ResponseListTaskActivity';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-details-info-task-activity',
  templateUrl: './details-info-task-activity.component.html',
  styleUrls: ['./details-info-task-activity.component.scss']
})
export class DetailsInfoTaskActivityComponent extends UnsubscribeOnDestroyAdapter
  implements OnInit {

  public _OneActivity!: GetOneActivity;
  DisplayNameDocument = [
    'name',
    'tipo',
    'Actividad',
    'observacion',
    'finalDate',
    'accion',
  ]
  dataActivity: TaskActivityData[] = [
    {
      id: 0,
      createdDate: new Date(),
      createdBy: '',
      lastModifiedDate: '',
      lastModifiedBy: '',
      totalRecords: 0,
      taskFiles: [{
        name: '',
        fileType: '',
        content: '',
        subjectTaskId: 0,
        activityTaskId: 0,
      }],
      taskType: {
        id: 0,
        name: ''
      },
      activity: {
        id: 0,
        name: ''
      },
      title: '',
      finalDate: new Date(),
      taskTypeId: 0,
      description: '',
      observation: '',
      activityId: 0,
    }
  ]
  dataTask = new MatTableDataSource<TaskActivityData>(this.dataActivity);
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatPaginator)

  set paginator_(value: MatPaginator) {
    this.dataTask.paginator = value;
  }

  constructor(
    private Path: ActivatedRoute,
    public _router: Router,
    public _dialog: MatDialog,
    public _ActivityListService: ActivityListService,
    public _ActivityDetailService: ActivityDetailService,
    public _SubjectService: SubjectListService,
    private snackBar: MatSnackBar,
    private httpClient: HttpClient
  ) {
    super();
    this._ActivityDetailService.initService();
    this._OneActivity = _ActivityDetailService._GetOneActivity;
    let verified = localStorage.getItem('ActivityTask') || '';
    if (verified != '') {
      this._OneActivity = JSON.parse(verified);
    } else {
      this._ActivityDetailService.initService();
    }
  }
  ngOnInit(): void {
    this.getTypeTask();
    this.getAllTaskSubject();
  }

  volverAtras() {
    this._router.navigate(['/intranet-academic/list-task-activity']);
  }

  getTypeTask() {
    this._SubjectService.getTypeTask().subscribe({
      next: (res) => {
        this._SubjectService._ApiResponseInternal = res;

      }
    })
  }

  getAllTaskSubject() {
    let data = {
      activityId: this._OneActivity.id
    }
    this._ActivityListService.GetTaskSubject(data).subscribe({
      next: (res) => {
        console.log('====================================');
        console.log(res);
        console.log('====================================');
        this.dataTask = new MatTableDataSource<TaskActivityData>(res.data);
        this.dataTask.paginator = this.paginator_;

      }
    })
  }
  NewTask() {
    this._ActivityListService.init_TaskActivity();
    const dialogRef = this._dialog.open(FormsCreateTaskComponent, {
      data: {
        task: this._ActivityListService._TaskActivity,
        action: 'add',
        activity: this._OneActivity,
        TypeTask: this._SubjectService._ApiResponseInternal
      },
      width: '900px',
      disableClose: true
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
        this.getAllTaskSubject();
      } else {
        Swal.fire({
          title: "Escuela Judicial",
          text: result.Message,
          icon: "warning"
        });
      }
    });
  }

  editarTarea(row: TaskActivity) {
    const dialogRef = this._dialog.open(FormsCreateTaskComponent, {
      data: {
        task: row,
        action: 'edit',
        activity: this._OneActivity,
        TypeTask: this._SubjectService._ApiResponseInternal
      },
      width: '900px',
      disableClose: true
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
        this.getAllTaskSubject();
      } else {
        Swal.fire({
          title: "Escuela Judicial",
          text: result.Message,
          icon: "warning"
        });
      }
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataTask.filter = filterValue.trim().toLowerCase();
  }

  deleteTask(row: TaskActivity) {
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
        this._ActivityListService.DeleteTask(row.id).subscribe({
          next: (res: ResponseGenerica) => {
            Swal.fire({
              title: "Eliminado!",
              text: row.title + " fue eliminado.",
              icon: "success"
            });
            this.getAllTaskSubject();
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
}
