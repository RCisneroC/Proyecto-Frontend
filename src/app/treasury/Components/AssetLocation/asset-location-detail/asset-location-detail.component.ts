import { Direction } from '@angular/cdk/bidi';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@core';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { AssetLocationDetail } from 'app/treasury/Models/AssetLocation';
import { AssetLocationService } from 'app/treasury/Services/asset-location.service';
import Swal from 'sweetalert2';
import { AddAssetLocationDetailComponent } from '../add-asset-location-detail/add-asset-location-detail.component';

@Component({
  selector: 'app-asset-location-detail',
  templateUrl: './asset-location-detail.component.html',
  styleUrls: ['./asset-location-detail.component.scss']
})
export class AssetLocationDetailComponent extends UnsubscribeOnDestroyAdapter
implements OnInit {
  id: number=0;

  displayedColumns: string[] = [
    'id',
    'asignacionBienActivosFijosId',
    'numero',
    'placa',
    'descripcion',
     'marca',
     //'modelo',
     'serie',
     'estadoFisico',
     'observaciones',
    'actions',
  ];
  

  Data: any;
  assetLocationDetail: any;
  constructor(private activatedRoute: ActivatedRoute,
    public _assetLocationService: AssetLocationService,
    public _dialog: MatDialog,
    private _nav: Router,
    private fb: UntypedFormBuilder,
    public authenticationService: AuthService,

  ) {
    super();

  }
  ngOnInit(): void {
  
      this.id = this.activatedRoute.snapshot.params["id"];
      this.getDetailAsignacion();
  }
  addNew() {
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this._dialog.open(AddAssetLocationDetailComponent, {
      data: {
        assetLocationDetail: this.assetLocationDetail,
        action: 'add',
      },
      direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result:ResponseMessageMaestra) => {
       if (result == undefined) {
        return;
        }
        if (result.CodError == 200) {
            Swal.fire({
                title: "Escuela Judicial",
                text: result.Message,
                icon: "success"
            });
            this.getDetailAsignacion2();
          } else {
            Swal.fire({
              title: "Escuela Judicial",
              text: result.Message,
              icon: "warning"
            });
          }
        }); 
  }
  async getDetailAsignacion() {
    this._assetLocationService.getDetailAsignacion(this.id).subscribe({
      next: (res) => {

        this.Data = res["getDEtailsAsignacionBiens"];

      }
    })
  }
  
  async getDetailAsignacion2() {
    this._assetLocationService.getAllAssetLocation2().subscribe({
      next: (res) => {

        this.Data = res["getDEtailsAsignacionBiens"];

      }
    })
  }
  
  Regresar() {
    this._nav.navigate(['/treasury/asset-location-list/']);
  }
  
  editCall(row: AssetLocationDetail) {
    this.id = row.id;
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this._dialog.open(AddAssetLocationDetailComponent, {
      data: {
        assetLocationDetail: row,
        action: 'edit',
      },
      direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result:ResponseMessageMaestra) => {
       if (result == undefined) {
        return;
        }
        if (result.CodError == 200) {
            Swal.fire({
                title: "Escuela Judicial",
                text: result.Message,
                icon: "success"
            });
            this.getDetailAsignacion2();
          } else {
            Swal.fire({
              title: "Escuela Judicial",
              text: result.Message,
              icon: "warning"
            });
          }
        });
  }
  
  delete(row:AssetLocationDetail) {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "Eliminara "+row.descripcion,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
        this._assetLocationService.DeleteAssetLocationDetailMode(row.id).subscribe({
        next:()=>{
             Swal.fire({
              title: "Eliminado!",
              text: row.descripcion+" fue eliminado.",
              icon: "success"
            });
            this.getDetailAsignacion2();
          },
          error: () => {
        
             Swal.fire({
              title: "Intente nuevamente!",
              text: row.descripcion+" no se pudo eliminar.",
              icon: "warning"
            });
          }
      })
      } 
    });
  }

}
