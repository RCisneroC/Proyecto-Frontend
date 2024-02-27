import { Component, OnInit,OnDestroy  } from '@angular/core';
import { CurriculumDesign } from 'app/enrollment/models/CurriculumDesign';
import { EnrollmentService } from 'app/enrollment/services/enrollment.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ofertas-actividades',
  templateUrl: './ofertas-actividades.component.html',
  styleUrls: ['./ofertas-actividades.component.scss']
})
export class OfertasActividadesComponent implements OnInit,OnDestroy {
  public lstActividades : CurriculumDesign[] = [];
  public subscriptions : Subscription[] = [];

   constructor(private  enrollmentService:EnrollmentService){}

   public ngOnInit(): void {
    this.subscriptions.push(
      this.enrollmentService.getCurriculumDesign().subscribe(
        {
          next : (request) =>{
                  this.lstActividades = request as CurriculumDesign[];
          }
        }
      )
    );

    }

    ngOnDestroy() {
      this.subscriptions.forEach(s => s.unsubscribe())
    }
}
