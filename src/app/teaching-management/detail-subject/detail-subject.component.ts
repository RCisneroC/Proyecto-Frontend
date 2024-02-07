import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TaskSubject } from '../models/Teacher';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from '../models/Teacher';
import { AddTaskComponent } from '../add-task/add-task.component';
import { MatDialog } from '@angular/material/dialog';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-detail-subject',
  templateUrl: './detail-subject.component.html',
  styleUrls: ['./detail-subject.component.scss']
})


export class DetailSubjectComponent implements OnInit {
  //this.cedula=this.activatedRoute.snapshot.params["cedula"];
  dataSou!: MatTableDataSource<TaskSubject>;

  taskSubject: TaskSubject = {
    id: 0,
    Titulo: '',
    observacion: '',
    tipoTarea: '',
    nombre: '',
    fechaEntrega: new Date(),
    idAsignatura: '',
    type: '',
  };


  displayedColumns: string[] = [
    'id',
    'Titulo',
    'observacion',
    'tipoTarea',
    'nombre',
    'fechaEntrega',
    'actions'

  ]
  public id: string = '';
  TaskSubjectArray: TaskSubject[] = [];
  TaskSubject!: TaskSubject;;
  @ViewChild('pagination')
  set paginator(value: MatPaginator) {
    setTimeout(() => {
      this.dataSou.paginator = value;
    }, 1000);
  }
  constructor(private _nav: Router,
    public _dialog: MatDialog,
    public activeRouter: ActivatedRoute
  ) {
    this.activeRouter.params.subscribe((params) => {

      this.id = params['id'];
    });
  }

  ngOnInit() {
    this.load();
    //   //this.dataSou.paginator = this.paginator;
  }

  load() {
    let local = localStorage.getItem('task') || '';
    if (local != '') {
      this.TaskSubjectArray = JSON.parse(local);
      console.log(localStorage.getItem('tipoSolicitud') || '1');
      let tipoSolicitud = localStorage.getItem('tipoSolicitud') || '1';
      this.TaskSubjectArray = this.TaskSubjectArray.filter(x => x.idAsignatura == this.id && x.type == tipoSolicitud.toString());
      this.dataSou = new MatTableDataSource<TaskSubject>(this.TaskSubjectArray);
    } else {
      this.dataSou = new MatTableDataSource<TaskSubject>([]);
    }
  }
  addNew() {

  }

  volverAtras() {
    this._nav.navigate(['/teaching-management/teacher-history-list/']);
  }

  Detail(row: TaskSubject): void {
    localStorage.setItem('details_task', JSON.stringify(row));
    this._nav.navigate(['/teaching-management/detail-task/', row.id]);
  }

  editCall(row: TaskSubject) {
    const dialogRef = this._dialog.open(AddTaskComponent, {
      data: {
        taskSubject: row,
        accion: 'edit-taskSubject',
        id: this.id
      },
      disableClose: true,
      width: '900px'
    });
    dialogRef.afterClosed().subscribe((result: ResponseMessageMaestra) => {
      if (result == undefined) {
        return;
      }
      if (result.CodError == 200) {
        this.load();
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
      // this.DataTraining=[];

      // if(this.DataTeacher.listTraining.length>0){
      //   const IdMayor = this.DataTeacher.listTraining.reduce((previous, current) => {
      //     return current.trainingId > previous.trainingId ? current : previous;
      //   });
      //   result.trainingId=IdMayor.trainingId+1;
      // }else{
      //   result.trainingId=1;
      // }

      // this.DataTraining.push(result);

      // this.DataTeacher.listTraining=[...this.DataTeacher.listTraining, ...this.DataTraining]

    });
  }

  refresh() {
  }

  exportExcel() {
  }

  EliminarTarea(row: TaskSubject) {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "Eliminar",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar"
    }).then((result) => {
      if (result.isConfirmed) {

        let dataL = localStorage.getItem('task') || '';
        if (dataL != '') {
          this.TaskSubjectArray = JSON.parse(dataL);
          let indice = this.TaskSubjectArray.findIndex(x => x.id === row.id);
          console.log(indice);

          if (indice !== -1) {
            this.TaskSubjectArray.splice(indice, 1);
          }
          localStorage.setItem('task', JSON.stringify(this.TaskSubjectArray));
          this.load();
        }

        //   this._RequestServicesService.DeleteRequestVarious(row.id).subscribe({
        //     next: (res: ResponseGenerica) => {
        //       Swal.fire({
        //         title: "Eliminado!",
        //         text: row.name + " fue eliminado.",
        //         icon: "success"
        //       });
        //       this.loadData();
        //     },
        //     error: (err: any) => {
        //       console.log(err);
        //       Swal.fire({
        //         title: "Intente nuevamente!",
        //         text: row.name + " no se pudo eliminar.",
        //         icon: "warning"
        //       });
        //     }
        //   })
        // } else {
      }
    });
  }

  AddTask() {
    const dialogRef = this._dialog.open(AddTaskComponent, {
      data: {
        taskSubject: this.taskSubject,
        accion: 'add-taskSubject',
        id: this.id
      },
      disableClose: true,
      width: '900px'
    });
    dialogRef.afterClosed().subscribe((result: ResponseMessageMaestra) => {
      if (result == undefined) {
        return;
      }
      if (result.CodError == 200) {
        this.load();
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
      // this.DataTraining=[];

      // if(this.DataTeacher.listTraining.length>0){
      //   const IdMayor = this.DataTeacher.listTraining.reduce((previous, current) => {
      //     return current.trainingId > previous.trainingId ? current : previous;
      //   });
      //   result.trainingId=IdMayor.trainingId+1;
      // }else{
      //   result.trainingId=1;
      // }

      // this.DataTraining.push(result);

      // this.DataTeacher.listTraining=[...this.DataTeacher.listTraining, ...this.DataTraining]

    });
  }
}
