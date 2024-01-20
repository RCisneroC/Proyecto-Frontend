import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DetailsParticipante, GetDataResultResponse } from 'app/admission/models/participant';
import { ActivityDetailService } from 'app/admission/services/activity-detail.service';
import { VerificarBS64Pipe } from 'app/pipes/verificar-bs64.pipe';
import { ApproveParticipantComponent } from '../approve-participant/approve-participant.component';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle-participante',
  templateUrl: './detalle-participante.component.html',
  styleUrls: ['./detalle-participante.component.scss']
})
export class DetalleParticipanteComponent {
  public paramsId: any;
  public _GetDataResultResponse: GetDataResultResponse = {
    inscriptionId: 0,
    activityName: '',
    firstName:     '',
    lastName:      '',
    cedula:        '',
    statusName:    '',
    fechaInscrito: new Date()
  }
  constructor(
    private Path: ActivatedRoute,
    public _router: Router,
    public _ActivityService: ActivityDetailService,
    public _dialog: MatDialog,
    public _verificarBS64: VerificarBS64Pipe
  ) {
    this.paramsId = Path.snapshot.params['id'];
    if (this.paramsId != null) {
      this.getDetails();
    } else {
      this._router.navigate([localStorage.getItem('url')]);
    }
  }

  volverAtras() {
  this._router.navigate([localStorage.getItem('url')]);
  }
  getDetails() {
    this._ActivityService.loading = true;
    this._ActivityService.GetDetailsCedula(this.paramsId).subscribe({
      next: (res:DetailsParticipante) => {
        this._ActivityService._DetailsParticipante = res;
        if (res.detailsResponse.length > 0) {
          this._ActivityService._DetailsResponse = this._ActivityService._DetailsParticipante.detailsResponse[0];
        }
        this._ActivityService.loading = false;
      },
      error: (err) => {
      }
    })
  }

  aprobar() {
    // this._GetDataResultResponse.cedula = this._ActivityService._DetailsResponse.ce; //cedula
    // this._GetDataResultResponse.cedula = this._ActivityService._DetailsResponse.
    const dialogRef = this._dialog.open(ApproveParticipantComponent, {
          data: {
            participant : this._GetDataResultResponse,
            accion: 'approved',
          },
          disableClose:true
        });

        dialogRef.afterClosed().subscribe((result:ResponseMessageMaestra) => {
          if (result == undefined) {
            return;
            }
            if (result.CodError == 200) {
                Swal.fire({
                    title: "Escuela Judicial",
                    text: result.Message,
                    icon: "success"
                });
              this.getDetails();
              } else {
                Swal.fire({
                  title: "Escuela Judicial",
                  text: result.Message,
                  icon: "warning"
                });
              }
        });
  }
}
