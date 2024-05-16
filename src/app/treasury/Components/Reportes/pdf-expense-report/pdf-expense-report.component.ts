import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ViewPosterPDFComponent } from 'app/admission/activitydetail/forms/view-poster-pdf/view-poster-pdf.component';
import { ReportsService } from 'app/treasury/Services/reports.service';

@Component({
  selector: 'app-pdf-expense-report',
  templateUrl: './pdf-expense-report.component.html',
  styleUrls: ['./pdf-expense-report.component.scss']
})
export class PdfExpenseReportComponent {
  public filtros = new FormControl();
  public IsLoading: boolean = false;
  form!: UntypedFormGroup;
  periodoId: any;

  constructor(
    private fb: UntypedFormBuilder,
    private datePipe: DatePipe,
    public reportsService: ReportsService,
    public _dialog: MatDialog,
    private cb: ChangeDetectorRef
  ) {
    this.loadPeriodoContable();
    this.form = this.createForm();
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
     
    });
  }

 
  consultar(): void {
    this.IsLoading = true;
    console.log('====================================');
    console.log(this.form.getRawValue());
    console.log('====================================');
     this.reportsService.getPDFInformeGastos(this.form.getRawValue()).subscribe({
       next: (res:any) => {
      const pdf=res["dataInformeMensual"].docFile;
   
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
