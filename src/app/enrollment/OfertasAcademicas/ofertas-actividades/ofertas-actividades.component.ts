import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit,OnDestroy  } from '@angular/core';
import { CurriculumDesign } from 'app/enrollment/models/CurriculumDesign';
import { EnrollmentService } from 'app/enrollment/services/enrollment.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ofertas-actividades',
  templateUrl: './ofertas-actividades.component.html',
  styleUrls: ['./ofertas-actividades.component.scss']
})
export class OfertasActividadesComponent implements OnInit,OnDestroy {
  public lstActividades : CurriculumDesign[] = [];
  public subscriptions : Subscription[] = [];
  public IsLoading:boolean = true;

   constructor(private  enrollmentService:EnrollmentService, private router: Router){}

   public ngOnInit(): void {
    this.subscriptions.push(
      this.enrollmentService.getCurriculumDesign().subscribe(
        {
          next : (request) =>{
                  this.lstActividades = request as CurriculumDesign[];
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
      this.router.navigate(['enrollment/ofertasacademicas/inscripcion-actividades/' + id]);
    }
}
