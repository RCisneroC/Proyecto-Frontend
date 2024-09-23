import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ViewPosterPDFComponent } from 'app/admission/activitydetail/forms/view-poster-pdf/view-poster-pdf.component';
import { ReportsService } from 'app/treasury/Services/reports.service';
import { TemplateService } from 'app/treasury/Services/template.service';

@Component({
  selector: 'app-pdf-income-report',
  templateUrl: './pdf-income-report.component.html',
  styleUrls: ['./pdf-income-report.component.scss']
})
export class PdfIncomeReportComponent {
  public filtros = new FormControl();
  public IsLoading: boolean = false;
  form!: UntypedFormGroup;
  periodoId: any;
  plantilla: any;

  constructor(
    private fb: UntypedFormBuilder,
    private datePipe: DatePipe,
    public reportsService: ReportsService,
    public templateService: TemplateService,
    public _dialog: MatDialog,
    private cb: ChangeDetectorRef
  ) {
  this.loadtemaplate();
    this.loadPeriodoContable();
    this.form = this.createForm();
  }




  loadtemaplate() {
    this.templateService.getAllTemplate2(0).subscribe({
      next: (data) => {
        this.plantilla = data["getTemplates"];
       
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
      },
    });
  }

  loadPeriodoContable() {
    this.reportsService.getPeriodo().subscribe({
      next: (data) => {
        this.periodoId = data["getPeriodContables"][0].periodoId;
        this.form = this.createForm();
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
      },
    });
  }
  
  createForm(): UntypedFormGroup {
    return this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      templateId: ['', Validators.required],
      filtros: [[
        {
          "indicadorId": 0,
          "searchBy": 0
        }
      ]]
    });
  }

 
  consultar(): void {
    this.IsLoading = true;
    console.log('====================================');
    console.log(this.form.getRawValue());
    console.log('====================================');
     this.reportsService.getPDFInformeIngreso(this.form.getRawValue()).subscribe({
       next: (res:any) => {
      const pdf=res["datapdf"].docFile;
   
        this._dialog.open(ViewPosterPDFComponent, {
          data: {
            type: 'pdf',
            accion: 'view-poster',
            posterFile: pdf,
            comment: [],
            poster: pdf,
          },
          width: '1200px',
          disableClose: true,
        });
            this.IsLoading = false;
         this.cb.detectChanges();
      },
      error: () => {
        this.IsLoading = false;
      },
      complete: () => {
      }
    })
  }



}

