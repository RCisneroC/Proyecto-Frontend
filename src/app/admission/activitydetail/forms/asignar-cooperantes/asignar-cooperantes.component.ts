import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivityDetailService } from 'app/admission/services/activity-detail.service';
import { CooperationgOrganizationService } from '../../../maestros/services/cooperationg-organization.service';
import { ViewLogoComponent } from '../view-logo/view-logo.component';
import { VerificarBS64Pipe } from 'app/pipes/verificar-bs64.pipe';
import { Cooperating } from 'app/admission/models/Cooperating';
import Swal from 'sweetalert2';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { MatPaginator } from '@angular/material/paginator';
export interface DialogData {
  id_actividad: string;
  accion: string;
}
@Component({
  selector: 'app-asignar-cooperantes',
  templateUrl: './asignar-cooperantes.component.html',
  styleUrls: ['./asignar-cooperantes.component.scss']
})
export class AsignarCooperantesComponent implements OnInit {
  public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message:''
  }
displayedColumns: string[] = [
    'id',
    'name',
    'descipcion',
    'logo',
];

  action: string;
  dialogTitle: string='';
  AsignarCooperantesForm: UntypedFormGroup;
  id_actividad: string = ''; 

 
  dataSourceCooperating: Cooperating[] = [
    this._ActivityDetailService._Cooperating
  ];
  ListadoCooperantes = new MatTableDataSource<Cooperating>(this.dataSourceCooperating);
  public IsLoading: boolean = true;

  @ViewChild('paginatorPoster') set paginator(value: MatPaginator) {
      console.log(value);
     setTimeout(() => {
       this.ListadoCooperantes.paginator = value;
       this.IsLoading = false;
     }, 3000);
  }

  constructor(
    public dialogRef: MatDialogRef<AsignarCooperantesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: UntypedFormBuilder,
    public _dialog: MatDialog,
    private _CooperationgOrganizationService: CooperationgOrganizationService,
     public _ActivityDetailService:ActivityDetailService,
    public _verificarBS64:VerificarBS64Pipe
  ) {
    // Set the defaults
    this.action = data.accion;
    console.log(data);
    
    if (this.action === 'add-cooperantes') {
      this.dialogTitle ="Agregar Organizaciones Cooperantes";
      this.id_actividad = data.id_actividad;
    }
    this.LoadCooperantes();
    this.AsignarCooperantesForm =this.fb.group({
      cooperatingOrganizationsIds: this.fb.array([]),
      activityId:[data.id_actividad,[Validators.required]]
    });
  }

   ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
     this.ListadoCooperantes.paginator = this.paginator;
  } 

     applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.ListadoCooperantes.filter = filterValue.trim().toLowerCase();
  }

  LoadCooperantes() {
  
    console.log(this.ListadoCooperantes);
    this._CooperationgOrganizationService.getAllCooperatingFiltro(1).subscribe({
      next: (res) => {
         this.ListadoCooperantes =new MatTableDataSource<Cooperating>(res);
      }
    });
  }
    viewLogo(row:Cooperating) {
    this._CooperationgOrganizationService.getByIdLogo(row.id).subscribe({
      next: (logo) => {
        if (logo.logo == null) {
         Swal.fire({
              title: "Escuela Judicial!",
              text: "No mantiene logo cargado.",
              icon: "warning"
            });
          return;
       }

        if (this._verificarBS64.transform(logo.logo.fileContents) != "pdf") {
              const dialogRef = this._dialog.open(ViewLogoComponent, {
              data: {
                type: this._verificarBS64.transform(logo.logo.fileContents),
                accion: 'view-logo',
                logofile: logo.logo.fileContents,
                logo: logo,
              },
              disableClose: true,
            });
            }
      }, error: () => {
        
      }
    })
  }
  submit() {
    this._ActivityDetailService.AddCooperating(this.AsignarCooperantesForm.getRawValue()).subscribe({
      next: (res: any) => {
        this.ResponseMessage.CodError = 200;
        this.ResponseMessage.Message = 'Cargado correctamente.';
        this.dialogRef.close(this.ResponseMessage);
      },
      error: (err: any) => {
        this.ResponseMessage.CodError = 500;
        this.ResponseMessage.Message = err;
        this.dialogRef.close(this.ResponseMessage);
      }
    });

  }
  get checkboxesFormArray(): UntypedFormArray {
    console.log("hola");
    
    return this.AsignarCooperantesForm.get('cooperatingOrganizationsIds') as UntypedFormArray;
  }

    checkboxChange(event: any, checkboxId: any): void {
    if (event.checked) {
      this.checkboxesFormArray.push(this.fb.control(checkboxId));
    } else {
      const index = this.checkboxesFormArray.controls.findIndex(x => x.value === checkboxId);
      if (index !== -1) {
        this.checkboxesFormArray.removeAt(index);
      }
    }
    }
  
}
