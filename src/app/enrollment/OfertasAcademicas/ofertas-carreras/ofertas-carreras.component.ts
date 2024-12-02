import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { DegreeCurriculumDesignEnrollment } from 'app/enrollment/models/DegreeCurriculumDesignEnrollment';
import { EnrollmentService } from 'app/enrollment/services/enrollment.service';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-ofertas-carreras',
  templateUrl: './ofertas-carreras.component.html',
  styleUrls: ['./ofertas-carreras.component.scss']
})
export class OfertasCarrerasComponent implements OnInit, OnDestroy, AfterViewInit {
  public lstCarreras: DegreeCurriculumDesignEnrollment[] = [];
  public subscriptions: Subscription[] = [];
  public IsLoading: boolean = true;

  dataSource = new MatTableDataSource<DegreeCurriculumDesignEnrollment>(this.lstCarreras);
  @ViewChild('paginator', { static: true })
  paginator!: MatPaginator;



  displayedColumns = [
    'description',
    'startDate',
    'endDate',
    'statusId',
    'action'
  ];


  constructor(private enrollmentService: EnrollmentService, private router: Router) { }

  public ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.loadData();
  }


  loadData(){

    this.subscriptions.push(
      this.enrollmentService.getDegreeCurriculumDesign().subscribe(
        {
          next: (request) => {
            const today = new Date().toISOString().split('T')[0];
            console.log(today);
            
            this.lstCarreras = request as DegreeCurriculumDesignEnrollment[];
            this.dataSource = new MatTableDataSource<DegreeCurriculumDesignEnrollment>(this.lstCarreras.filter(x => x.startDate <= today && x.endDate >= today));
            console.log('====================================');
            console.log(this.dataSource);
            console.log('====================================');
            this.IsLoading = false;
          },
          error: (err: HttpErrorResponse) => {
            console.log(err)
            this.IsLoading = false;
          }
        }
      )
    );

  }

  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.IsLoading = false;
    }, 2000
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe())
  }

  public inscribirse(id: number): void {
    this.router.navigate(['enrollment/ofertasacademicas/inscripcion/' + id]);
  }

}
