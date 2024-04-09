import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TypeContractJobServiceService } from 'app/Job/Services/type-contract-job-service.service';
import { VerificarBS64Pipe } from 'app/pipes/verificar-bs64.pipe';
import { ContractTypeFormsComponent } from '../Forms/contract-type-forms/contract-type-forms.component';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contract-type',
  templateUrl: './contract-type.component.html',
  styleUrls: ['./contract-type.component.scss']
})
export class ContractTypeComponent {
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public _dialog: MatDialog,
    public _verificarBS64: VerificarBS64Pipe,
    public _TypeContractJobServiceService: TypeContractJobServiceService,
  ) {
  }

  addNew() {
    const dialogRef = this.dialog.open(ContractTypeFormsComponent, {
      data: {
        categoria: '',
        accion: 'add-contract',
      },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((result: ResponseMessageMaestra) => {
      if (result == undefined) {
        return;
      }
      if (result.CodError == 200) {
        Swal.fire({
          title: "Escuela Judicial",
          text: result.Message,
          icon: "success"
        });
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
