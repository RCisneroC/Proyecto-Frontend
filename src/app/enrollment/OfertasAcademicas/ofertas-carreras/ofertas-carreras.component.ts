import { Component, OnInit,OnDestroy  } from '@angular/core';
import { DegreeCurriculumDesignEnrollment } from 'app/enrollment/models/DegreeCurriculumDesignEnrollment';
import { EnrollmentService } from 'app/enrollment/services/enrollment.service';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-ofertas-carreras',
  templateUrl: './ofertas-carreras.component.html',
  styleUrls: ['./ofertas-carreras.component.scss']
})
export class OfertasCarrerasComponent implements OnInit,OnDestroy  {
 public lstCarreras : DegreeCurriculumDesignEnrollment[] = [];
 public subscriptions : Subscription[] = [];
 public IsLoading:boolean = true;

  constructor(private  enrollmentService:EnrollmentService,private router: Router){}

  public ngOnInit(): void {
  this.subscriptions.push(
    this.enrollmentService.getDegreeCurriculumDesign().subscribe(
      {
        next : (request) =>{
                this.lstCarreras = request as DegreeCurriculumDesignEnrollment[];
                this.IsLoading = false;
        },
        error : (err:HttpErrorResponse) =>
          {
            this.IsLoading = false;
          }
      }
    )
  );

  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe())
  }

  public inscribirse(id:number):void{
    this.router.navigate(['enrollment/ofertasacademicas/inscripcion/' + id]);
  }

}
