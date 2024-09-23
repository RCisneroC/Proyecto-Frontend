import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ViewPosterPDFComponent } from 'app/admission/activitydetail/forms/view-poster-pdf/view-poster-pdf.component';
import { ResultadoConsultaConfirmar } from 'app/treasury/Models/ListadoCheckConfirmar';
import { MinorPurchaseService } from 'app/treasury/Services/minor-purchase.service';
import { ReportsService } from 'app/treasury/Services/reports.service';
import { TemplateService } from 'app/treasury/Services/template.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pdf-refund',
  templateUrl: './pdf-refund.component.html',
  styleUrls: ['./pdf-refund.component.scss']
})
export class PdfRefundComponent {
  public filtros = new FormControl();
  public IsLoading: boolean = false;
  form!: UntypedFormGroup;
  periodoId: any;
  public lstResultados: ResultadoConsultaConfirmar[] = [];
  displayedColumnsCustodios = [
    'Codificacion_Presupuestaria',
    'Codigo_Financiero',
    'Valor',
    'createdDate',
    'estado',
    'actions'
  ];
  dataSource = new MatTableDataSource<ResultadoConsultaConfirmar>(this.lstResultados);

  @ViewChild('paginator', { static: true })
  paginator!: MatPaginator;
  plantilla: any;
  constructor(
    private fb: UntypedFormBuilder,
    private datePipe: DatePipe,
    public reportsService: ReportsService,
    public templateService:TemplateService,
    public _dialog: MatDialog,
    private cb: ChangeDetectorRef,
    private router:Router,
    public servicioMinorPurchase:MinorPurchaseService
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
      periodoContableId: [this.periodoId, Validators.required],
      tipoConsulta: [0, Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      templateId:['', Validators.required],
      unidad: ['', Validators.required],
      rembolsar:[''],
      SolicitudCompraId:[0]
    });
  }

  consultar(): void {
    this.IsLoading = true;
    this.form.controls['rembolsar'].setValue(0);
    console.log('====================================');
    console.log(this.form.getRawValue());
    console.log('====================================');
    this.reportsService.getPDFReenbolso(this.form.getRawValue()).subscribe({
      next: (res: any) => {

        const pdf = res["dataPDFReembolsos"].docFile;


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

  consultar1(): void {
    this.IsLoading = true;
    console.log('====================================');
    console.log(this.form.getRawValue());
    console.log('====================================');
    this.reportsService.getPDFRecapitulacionCaja(this.form.getRawValue()).subscribe({
      next: (res: any) => {
        const pdf = res["dataRecapitulacionCajas"].docFile;

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

  PagarRembolso(){
      this.form.controls['rembolsar'].setValue(1);
      console.log('====================================');
      console.log(this.form.getRawValue());
      console.log('====================================');
      this.reportsService.getPDFReenbolsoListadoCheck(this.form.getRawValue()).subscribe({
        next: (res) => {
          console.log(res);
          this.dataSource  = new MatTableDataSource<ResultadoConsultaConfirmar>( res._ResultadoConsulta);
          this.dataSource.paginator = this.paginator;
          console.log('====================================');
          console.log(this.dataSource);
          console.log('====================================');
        },
        error: () => {
          this.IsLoading = false;
          Swal.fire({
            title: "Escuela Judicial",
            text: 'Intento Nuevamente',
            icon: "warning"
          });
          this.router.navigate(['/treasury/pdf-refund'])
        },
        complete: () => {
        }
      });
  }

  filtrarCustodio(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  }

  refreshCustodio(): void {
    this.PagarRembolso();
  }

  checvalidacion(row:ResultadoConsultaConfirmar){
 
        this.servicioMinorPurchase.ConfirmCompraValid(row.solicitudCompraMenorId,1).subscribe({
          next: (res) => {
            Swal.fire({
              title: "Confirmado Correctamente!",
              text: res.message,
              icon: "success"
            });
            this.PagarRembolso();
          },
          error: (err: HttpErrorResponse) => {
            console.log(err);
            Swal.fire({
              title: "Intente nuevamente!",
              text: "Intente nuevamente!.",
              icon: "warning"
            });
          }
        })

  }
}

