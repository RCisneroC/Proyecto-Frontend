import { Component, OnInit,OnDestroy  } from '@angular/core';
import { DegreeCurriculumDesignEnrollment } from 'app/enrollment/models/DegreeCurriculumDesignEnrollment';
import { EnrollmentService } from 'app/enrollment/services/enrollment.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ofertas-carreras',
  templateUrl: './ofertas-carreras.component.html',
  styleUrls: ['./ofertas-carreras.component.scss']
})
export class OfertasCarrerasComponent implements OnInit,OnDestroy  {
 public lstCarreras : DegreeCurriculumDesignEnrollment[] = [];
 public subscriptions : Subscription[] = [];

  constructor(private  enrollmentService:EnrollmentService){}

  public ngOnInit(): void {
  this.subscriptions.push(
    this.enrollmentService.getDegreeCurriculumDesign().subscribe(
      {
        next : (request) =>{
                this.lstCarreras = request as DegreeCurriculumDesignEnrollment[];
        }
      }
    )
  );

  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe())
  }


}
