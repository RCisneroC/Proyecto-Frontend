import { Component } from '@angular/core';
import { CategoryFormsComponent } from '../Forms/category-forms/category-forms.component';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { VerificarBS64Pipe } from 'app/pipes/verificar-bs64.pipe';
import { CategoryJobServiceService } from 'app/Job/Services/category-job-service.service';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {


  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public _dialog: MatDialog,
    public _verificarBS64: VerificarBS64Pipe,
    public _CategoryJobServiceService: CategoryJobServiceService,
  ) {
  }

  addNew() {
    this._CategoryJobServiceService.init_CategoryJobs();
    const dialogRef = this.dialog.open(CategoryFormsComponent, {
      data: {
        categoria: this._CategoryJobServiceService._CategoryJobs,
        accion: 'add-category',
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

  refresh() {

  }
  exportExcel() {

  }
}
