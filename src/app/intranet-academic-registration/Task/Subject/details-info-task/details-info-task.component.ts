import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivityListService } from 'app/intranet-academic-registration/Services/activity-list.service';
import { SubjectListService } from 'app/intranet-academic-registration/Services/subject-list.service';
import { ResponseGenerica, ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import Swal from 'sweetalert2';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { Subject } from 'app/admission/FormalEducations/Models/Subject';
import { CreateTaskSubjectComponent } from '../Forms/create-task-subject/create-task-subject.component';
import { DataTaskSubject } from 'app/intranet-academic-registration/Models/ResponseListTaskSubject';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { TaskSubject } from '../../../Models/TaskSubject';

@Component({
  selector: 'app-details-info-task',
  templateUrl: './details-info-task.component.html',
  styleUrls: ['./details-info-task.component.scss']
})
export class DetailsInfoTaskComponent extends UnsubscribeOnDestroyAdapter
  implements OnInit {

  public _Subject!: Subject;
  DisplayNameDocument = [
    'name',
    'tipo',
    'subject',
    'observacion',
    'finalDate',
    'accion',
  ]
  dataSourceEvent: DataTaskSubject[] = [
    {
      id: 0,
      createdDate: new Date(),
      createdBy: '',
      lastModifiedDate: '',
      lastModifiedBy: '',
      totalRecords: 0,
      taskFiles: [
        {
          name: '',
          fileType: '',
          content: '',
          subjectTaskId: 0,
          activityTaskId: 0,
        }
      ],
      taskType: {
        name: '',
        id: 0,
      },
      subject: {
        id: 0,
        name: '',
      },
      title: '',
      description: '',
      finalDate: new Date(),
      taskTypeId: 0,
      subjectId: 0,
      observation: '',
    }
  ]
  dataTask = new MatTableDataSource<DataTaskSubject>(this.dataSourceEvent);
  // @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatPaginator)
  set paginator(value: MatPaginator) {
    this.dataTask.paginator = value;
  }

  constructor(
    private Path: ActivatedRoute,
    public _router: Router,
    public _dialog: MatDialog,
    public _SubjectService: SubjectListService,
    private snackBar: MatSnackBar,
    private httpClient: HttpClient
  ) {
    super();
    this._SubjectService.init_Subject();
    this._Subject = _SubjectService._Subject;
    let verified = localStorage.getItem('asignaturaTask') || '';
    if (verified != '') {
      this._Subject = JSON.parse(verified);
    } else {
      this._SubjectService.init_Subject()
    }
  }
  ngOnInit(): void {
    this.getTypeTask();
    this.getAllTaskSubject();
  }

  volverAtras() {
    this._router.navigate(['/intranet-academic/list-task-subject']);
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
      subjectId: this._Subject.id
    }
    this._SubjectService.GetTaskSubject(data).subscribe({
      next: (res) => {
        this.dataTask = new MatTableDataSource<DataTaskSubject>(res.data);
        this.dataTask.paginator = this.paginator;

      }
    })
  }
  NewTask() {
    const dialogRef = this._dialog.open(CreateTaskSubjectComponent, {
      data: {
        task: this._SubjectService._TaskSubject,
        action: 'add',
        subject: this._Subject,
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

  editarTarea(row: TaskSubject) {
    const dialogRef = this._dialog.open(CreateTaskSubjectComponent, {
      data: {
        task: row,
        action: 'edit',
        subject: this._Subject,
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

  deleteTask(row: TaskSubject) {
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
        this._SubjectService.DeleteTask(row.id).subscribe({
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
