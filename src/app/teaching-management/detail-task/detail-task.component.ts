import { Component, OnInit } from '@angular/core';
import { TaskSubject } from '../models/Teacher';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AddCalifComponent } from '../add-calif/add-calif.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-detail-task',
  templateUrl: './detail-task.component.html',
  styleUrls: ['./detail-task.component.scss']
})
export class DetailTaskComponent implements OnInit {
  //this.cedula=this.activatedRoute.snapshot.params["cedula"];
  dataSou!: MatTableDataSource<any>;
  //displayedColumns: string[] = ['nombre', 'descripcion', 'fechaEntrega', 'materia'];



  users = [
    {
      id: "user1",
      img: "https://placeholder.com/150", // Replace with placeholder image URL
      cedula: "123456789", // Replace with placeholder ID
      userName: "usuario1",
      firstName: "Juan",
      lastName: "Pérez",
      emailConfirm: true,
      email: "juan.perez@ejemplo.com",
      statusId: 1, // Assuming 1 represents active status
      gender: "Masculino",
      phoneNumber: null,
      createdDate: "2024-02-06",
      token: "YOUR_APP_TOKEN", // Replace with placeholder token
      roles: ["Estudiante"],
      calif: 18
    },
    {
      id: "user2",
      img: "https://placeholder.com/150", // Replace with placeholder image URL
      cedula: "987654321", // Replace with placeholder ID
      userName: "profesora2",
      firstName: "María",
      lastName: "García",
      emailConfirm: false,
      email: "maria.garcia@ejemplo.com",
      statusId: 2, // Assuming 2 represents another status
      gender: "Femenino",
      phoneNumber: null,
      createdDate: "2024-01-20",
      token: "YOUR_APP_TOKEN", // Replace with placeholder token
      roles: ["Profesor"],
      calif: 15
    },
    // Add more users with different data if needed
  ];
  displayedColumns: string[] = [
    'cedula',
    'firstName',
    'lastName',
    'email',
    'gender',
    'calif',
    'actions'

  ]
  constructor(private _nav: Router,
    public _dialog: MatDialog
  ) { }

  ngOnInit() {
    this.dataSou = new MatTableDataSource<any>(this.users);
    //   //this.dataSou.paginator = this.paginator;
  }
  addNew() {

  }
  AddCalif(row: any) {
    const dialogRef = this._dialog.open(AddCalifComponent, {
      data: {
        user: row,
        accion: 'add-taskSubject'
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result: any) => {
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
  volverAtras() {
    this._nav.navigate(['/teaching-management/detail-subject/', 1]);

  }
  editCall(row: any) {

  }

  refresh() {
  }

  exportExcel() {
  }
}

