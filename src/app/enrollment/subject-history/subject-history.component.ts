import { Component, ElementRef, ViewChild } from '@angular/core';
import { StudentModel } from "../models/StudentModel";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { ActivatedRoute, Router } from "@angular/router";
import { EnrollmentService } from "../services/enrollment.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-subject-history',
  templateUrl: './subject-history.component.html',
  styleUrls: ['./subject-history.component.scss']
})
export class SubjectHistoryComponent {

  DisplayNameInfo: string[] = [
    'asignatura',
    'descriptionSuject',
    'periodDescription',
    'mallaName',
    'nAmeDegree',
    'years'
  ];

}
