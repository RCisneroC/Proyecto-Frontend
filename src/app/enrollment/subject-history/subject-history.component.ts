import { Component, ElementRef, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { ActivatedRoute, Router } from "@angular/router";
import { EnrollmentService } from "../services/enrollment.service";
import Swal from "sweetalert2";
import { SubjectEnrollmentResult, subjectHistory } from '../models/subjectHistory';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-subject-history',
  templateUrl: './subject-history.component.html',
  styleUrls: ['./subject-history.component.scss']
})
export class SubjectHistoryComponent implements OnInit, AfterViewInit {

  DisplayNameInfo: string[] = [
    'descriptionSuject',
    'subjectStatusId',
    'mallaName',
    'nAmeDegree',
    'periodDescription',
    'years'
  ];

  public lstResult : SubjectEnrollmentResult[] = [];
  public loading : boolean = false;

  dataInfo = new MatTableDataSource<SubjectEnrollmentResult>(this.lstResult);

  @ViewChild('paginador', { static: true })
  paginatorInfo!: MatPaginator;

  constructor(
    private Path: ActivatedRoute,
    public _router: Router,
    public elm: ElementRef,
    private _enrollservice: EnrollmentService,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog
  ) {
  }

  ngAfterViewInit(): void {
    setTimeout( ()=>
      {this.dataInfo.paginator = this.paginatorInfo;
      this.loading = false;
      },1000);
  }


  ngOnInit(): void {
    this.getDetails();
    this.dataInfo.paginator = this.paginatorInfo;
  }


  getDetails(){
  const id : number =  parseInt(this.Path.snapshot.params["id"]);
  const cedula : string = this.Path.snapshot.params["cedula"];
  this.loading = true;
  this._enrollservice.getSubjectsHitory(id,cedula).subscribe(
    {
        next : (request:subjectHistory) =>{
          this.lstResult = request.subjectEnrollmentResult;
          this.dataInfo = new MatTableDataSource<SubjectEnrollmentResult>(this.lstResult);
        },
        error : (err:HttpErrorResponse) =>{
          console.log(err);
          Swal.fire({
            title: "Escuela Judicial",
            text: "No se pudo mostrar las asignaturas",
            icon: "warning"
          });
        }
    }
  );

}

}
