import { Component, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewPosterPDFComponent } from 'app/admission/activitydetail/forms/view-poster-pdf/view-poster-pdf.component';
import { ViewPosterComponent } from 'app/admission/activitydetail/forms/view-poster/view-poster.component';
import { GetOneActivity, PosterRequest } from 'app/admission/models/GetOneActivity';
import { ActivityDetailService } from 'app/admission/services/activity-detail.service';
import { VerificarBS64Pipe } from 'app/pipes/verificar-bs64.pipe';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-activity-external',
  templateUrl: './view-activity-external.component.html',
  styleUrls: ['./view-activity-external.component.scss']
})
export class ViewActivityExternalComponent {
public paramsId: any;
  public converId: any;
  PrincipalPoster!: PosterRequest;
  ArrayPrincipalPoster: PosterRequest[] = [
    this._ActivityService._PosterRequest
  ];
  public IsImage: boolean = false;
  public ext: any;
  public blobUrl: string="";
 constructor(
    private Path: ActivatedRoute,
    public _router: Router,
    public _ActivityService: ActivityDetailService,
   public _dialog: MatDialog,
   public elm: ElementRef,
    public _verificarBS64:VerificarBS64Pipe
  ) {
    this.paramsId = Path.snapshot.params['id'];
    if (this.paramsId != null) {
      this.converId = _ActivityService.decryptData(this.paramsId, 'Panama2019$');
      this.PrincipalPoster = _ActivityService._PosterRequest;

      this.getOneActivity();
      // this.dataTeacher = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
      // this.dataOrganismos = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

    } else {
      this._router.navigate(['/']);
    }
 }


  getOneActivity() {
    this.ArrayPrincipalPoster = [];
    this._ActivityService.loading = true;
    this._ActivityService.VerificarDisponibilidadActividad(this.converId).subscribe({
      next: (res: boolean) => {
        if (res) {
          this._ActivityService.GetOneActivity(this.converId).
            subscribe({
              next: (res: GetOneActivity) => {

                console.log(res);

                this._ActivityService._GetOneActivity = res;
                this._ActivityService.loading = false;
                res.posterRequests.forEach((element: PosterRequest) => {
                  if (element.posterType == 1 && element.statusId == 5) {
                    this.PrincipalPoster = element;
                    this.ext = element.poster.contentType.split('/');
                    if (this.ext.length > 1) {
                      if (this.ext[0] == 'image') {
                        this.IsImage = true;
                        this.RenderImage();
                      } else {
                        this.IsImage = false;
                        this.renderPDF(element.poster.fileContents);
                      }
                    }
                  } else {
                    if (element.statusId == 5) {
                      console.log('====================================');
                      console.log(element);
                      console.log('====================================');
                      this.ArrayPrincipalPoster.push(element);
                    }
                  }
                });
                console.log(this.ArrayPrincipalPoster);

              }, error: (err) => {
                console.log(err);
                this._router.navigate(['/']);
              },
              complete: () => {
                this._ActivityService.loading = false;
              }
            });

        } else {
            Swal.fire({
            title: "<strong>Escuela Judicial</strong>",
            html: '<p>URL no está disponible.</p>',
            icon: "warning"
          });
           this._router.navigate(['/']);
        }
      }
    });
  }

  RenderImage() {
    setTimeout(() => {
      const elementImg = this.elm.nativeElement.querySelector('#image');
      this.elm.nativeElement.querySelector('#image').src = 'data:image/png;base64,'+this.PrincipalPoster.poster.fileContents;
    }, 1000);
  }

  renderPDF(base64PDF: string) {
    setTimeout(() => {
      const element = this.elm.nativeElement.querySelector('#pdf');
      const blob = this.base64toBlob(base64PDF, 'application/pdf');
      this.blobUrl = URL.createObjectURL(blob);
      console.log(this.blobUrl);
      element.src = this.blobUrl;
    }, 1000);
  }

  base64toBlob(base64: string, type: string): Blob {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: type });
  }

  viewDocumento(row:PosterRequest) {
   if (this._verificarBS64.transform(row.poster.fileContents) != "pdf") {
      const dialogRef = this._dialog.open(ViewPosterComponent, {
       data: {
         type: this._verificarBS64.transform(row.poster.fileContents),
         accion: 'view-poster',
         posterFile: row.poster.fileContents,
         comment: row.posterComments,
         poster: row,
       },
       disableClose: true,
     });
    } else {
      const dialogRef = this._dialog.open(ViewPosterPDFComponent, {
       data: {
         type: this._verificarBS64.transform(row.poster.fileContents),
         accion: 'view-poster',
         posterFile: row.poster.fileContents,
         comment: row.posterComments,
         poster: row,
        },
        width:'1000px',
       disableClose: true,
     });
    }

  }

  inscribir() {
    localStorage.setItem("ruta_local_external",'/student/details-inscription/'+ this.paramsId)
    this._router.navigate(['/student/external-inscription/' + this.paramsId]);
  }
}
