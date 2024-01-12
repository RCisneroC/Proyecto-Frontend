import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivityDetailService } from '../services/activity-detail.service';
import { GetOneActivity } from '../models/GetOneActivity';

@Component({
  selector: 'app-activitydetail',
  templateUrl: './activitydetail.component.html',
  styleUrls: ['./activitydetail.component.scss']
})
export class ActivitydetailComponent {
  public paramsId: any;
  public paramsIdRevisado: any;
  constructor(
              private Path: ActivatedRoute,
              public _router: Router,
              public _ActivityService:ActivityDetailService
  ) {
    this.paramsId = Path.snapshot.params['id'];
    if (this.paramsId != null) {
      this.getOneActivity();
    } else {
      this._router.navigate(['/admission/schedule-activities-list']);
    }
  }

  getOneActivity() {
    this._ActivityService.loading = true;
    this._ActivityService.GetOneActivity(this.paramsId).
      subscribe({
        next: (res: GetOneActivity) => {
          console.log('====================================');
          console.log(res);
          console.log('====================================');
          this._ActivityService._GetOneActivity = res;
        }, error: (err) => {
          console.log(err);
          this._router.navigate(['/admission/schedule-activities-list']);
        },
        complete: () => {
           this._ActivityService.loading = false;
        }
      })
  }
}
