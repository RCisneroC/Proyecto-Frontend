import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { CooperationgOrganizationService } from 'app/admission/maestros/services/cooperationg-organization.service';
import { ActivityRequirement, GetOneActivity, RoomRequest, RoomRequestRoom } from 'app/admission/models/GetOneActivity';
import { ActivityDetailService } from 'app/admission/services/activity-detail.service';
import { VerificarBS64Pipe } from 'app/pipes/verificar-bs64.pipe';

@Component({
  selector: 'app-room-requests',
  templateUrl: './room-requests.component.html',
  styleUrls: ['./room-requests.component.scss']
})
export class RoomRequestsComponent {

  public paramsId: string = '';
  dataSoruceRoomList: ActivityRequirement[] = [
    {
      description: '',
      id: 0,
      name: '',
      statusId: 0
    }
  ];
  dataRooms = new MatTableDataSource<ActivityRequirement>(this.dataSoruceRoomList);
     @ViewChild(MatPaginator) 
  set paginator(value: MatPaginator) {
      this.dataRooms.paginator = value;
  }
  constructor(
    private Path: ActivatedRoute,
    public _ActivityService: ActivityDetailService,
    public _dialog: MatDialog,
    public _verificarBS64: VerificarBS64Pipe,
    public _CooperatingOrganizationService:CooperationgOrganizationService,
    public _router:Router

  ) {
     this.paramsId = Path.snapshot.params['id'];
    if (this.paramsId != null) {
      this.getOneActivity();
      // this.dataTeacher = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
      // this.dataOrganismos = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
    } else {
      this._router.navigate(['/admission/schedule-activities-list']);
    }
  }


   volverAtras() {
     let url = localStorage.getItem('url') || '';
     console.log(url);
     
    this._router.navigate([url]);
   }
  nuevaSolicitud() {
    
  }
  
    getOneActivity() {
    this._ActivityService.loading = true;
    this._ActivityService.GetOneActivity(this.paramsId).
      subscribe({
        next: (res: GetOneActivity) => {
          this._ActivityService._GetOneActivity = res;
          console.log('====================================');
          console.log(this._ActivityService._GetOneActivity);
          console.log('====================================');
          // this.getRomsSolicitud(this._ActivityService._GetOneActivity.roomRequests)
          // this.getDocumentos(res.activityActivityRequirements);
          // this.dataPoster = new MatTableDataSource<PosterRequest>(res.posterRequests);
          // this.dataTeacher = new MatTableDataSource<ActivityTeachers>(res.activityTeachers);
          // this.dataOrganismos = new MatTableDataSource<ActivityCooperatingOrganization>(res.activityCooperatingOrganizations);
        }, error: (err) => {
          console.log(err);
          this._router.navigate(['/admission/schedule-activities-list']);
        },
        complete: () => {
           this._ActivityService.loading = false;
        }
      })
    }
  
  irDetalle(id:any) {
    //abrir modals.
  }

  
}
