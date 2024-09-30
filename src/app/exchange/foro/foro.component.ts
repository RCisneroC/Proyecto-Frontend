import { Component, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "@core";
import { MatDialog } from "@angular/material/dialog";
import { ForoService } from "../services/foro.service";
import { Foro } from "../models/Foro";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { CategoryServiceForoService } from '../services/category-service-foro.service';
import { FormsForoCreateComponent } from '../Forms/forms-foro-create/forms-foro-create.component';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import Swal from 'sweetalert2';
import { DomSanitizer } from '@angular/platform-browser';
import { Jobs } from 'app/Job/Interfaces/Jobs';

@Component({
  selector: 'app-foro',
  templateUrl: './foro.component.html',
  styleUrls: ['./foro.component.scss']
})
export class ForoComponent {

  public Editor: any = ClassicEditor;
  FormsForoFilter!: UntypedFormGroup;
  public IdCategory: number = 0;
  public rolIdModerador ="2b34afce-38b7-47cd-b0c4-fb589a97b138";
  public rolId ="";
  constructor(
    private Path: ActivatedRoute,
    public _router: Router,
    public elm: ElementRef,
    private authService: AuthService,
    public foroService: ForoService,
    public dialog: MatDialog,
    private fb: UntypedFormBuilder,
    public _CategortForos: CategoryServiceForoService,
    private sanitizer: DomSanitizer
  ) {

    this.loadInit();
    this.GetCategorias();
    this.FormsForoFilter = this.createContactForm();
    console.log(authService.currentUserValue.roleId);
    this.rolId=authService.currentUserValue.roleId;
  }

  createContactForm(): UntypedFormGroup {

    return this.fb.group({
      categoriesId: ['']
    });
  }

  public Foros: Foro[] = [{
    foroId: 0,
    title: '',
    description: '',
    createdDate: new Date,
    createdBy: '',
    statusId: 0,
    categoriesId: 0,
    categoriesName: ''
  }]

  loadInit() {
    this.foroService.GetForos(this.IdCategory).subscribe({
      next: (resp) => {
        console.log("Foros", resp.getForos);
        this.Foros = resp.getForos;
      }
    });
  }

  GetCategorias() {
    this._CategortForos.getAllCategoryForo(0).subscribe({
      next: (res) => {
        this._CategortForos._Response = res;
      }
    })
  }
  submit() {
    this.loadInit();
  }

  new() {
    const dialogRef = this.dialog.open(FormsForoCreateComponent, {
      data: {
        categoria: this._CategortForos._Response.getCategoriesResponse,
        accion: 'add-foro',
        foro: this.foroService.GetCategory
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
        this.loadInit();
      } else {
        Swal.fire({
          title: "Escuela Judicial",
          text: result.Message,
          icon: "warning"
        });
      }
    });
  }

  safeHtml(myHtmlString: string) {
    if (myHtmlString == null) {
      return '.';
    } else {
      return this.sanitizer.bypassSecurityTrustHtml(myHtmlString);
    }
  }
  ir(_Foro: Foro) {
    console.log('====================================');
    console.log(_Foro);
    console.log('====================================');
    this._router.navigate(['/exchange/foro-detalle/' + _Foro.foroId]);
  }
}
