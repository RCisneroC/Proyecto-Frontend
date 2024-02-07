import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TaskSubject } from '../models/Teacher';
import { Router } from '@angular/router';
import { Subject } from '../models/Teacher';
import { AddTaskComponent } from '../add-task/add-task.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-detail-subject',
  templateUrl: './detail-subject.component.html',
  styleUrls: ['./detail-subject.component.scss']
})


export class DetailSubjectComponent implements OnInit {
  //this.cedula=this.activatedRoute.snapshot.params["cedula"];
  dataSou!: MatTableDataSource<TaskSubject>;

  taskSubject?: TaskSubject;
  tareas: TaskSubject[] = [
    {
      id:1,
      Titulo: "Investigación sobre el cambio climático",
      observacion: "Utilizar fuentes confiables y variadas.",
      tipoTarea: "Investigación",
      nombre: "Tarea 1",
      fechaEntrega: new Date("2024-03-08"),
    },
    {
      id:2,
      Titulo: "Análisis del poema 'Piedra negra sobre una piedra blanca' de Octavio Paz",
      observacion: "Enfatizar en las figuras literarias y el simbolismo.",
      tipoTarea: "Análisis",
      nombre: "Tarea 2",
      fechaEntrega: new Date("2024-03-15"),
    },
    {
      id:3,
      Titulo: "Diseño de un prototipo de aplicación móvil para gestión de tareas",
      observacion: "Utilizar herramientas de diseño como Figma o Adobe XD.",
      tipoTarea: "Diseño",
      nombre: "Tarea 3",
      fechaEntrega: new Date("2024-04-05"),
    },
    {
      id:4,
      Titulo: "Exposición oral sobre la historia del rock and roll",
      observacion: "Preparar una presentación multimedia atractiva e informativa.",
      tipoTarea: "Exposición",
      nombre: "Tarea 4",
      fechaEntrega: new Date("2024-04-20"),
    },
  ];

  displayedColumns :string[] = [
    'id',
    'Titulo',
    'observacion',
    'tipoTarea',
    'nombre',
    'fechaEntrega',
    'actions'
    
  ]

  constructor( private _nav:Router,
    public _dialog: MatDialog
  ) {}

  ngOnInit() {
     this.dataSou = new MatTableDataSource<TaskSubject>(this.tareas);
  //   //this.dataSou.paginator = this.paginator;
   }
  addNew(){
  
  }
  
  volverAtras(){
    this._nav.navigate(['/teaching-management/teacher-history-list/']);
  }
  
  Detail(row:TaskSubject): void {
  
    this._nav.navigate(['/teaching-management/detail-task/',1]);
  }

  editCall( row:any){
  
  }
  
  refresh(){
  }
  
  exportExcel(){
  }
  
  AddTask(){
    const dialogRef = this._dialog.open(AddTaskComponent, {
      data: {
        taskSubject: this.taskSubject,
        accion: 'add-taskSubject'
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result:TaskSubject) => {
      if (result == undefined) {
        return;
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
