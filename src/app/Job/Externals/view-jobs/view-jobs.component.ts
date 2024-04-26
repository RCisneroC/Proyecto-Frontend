import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import { MatSort } from '@angular/material/sort';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { Filtros } from 'app/estadisticas/PersonalDocente/model/Filtros';
import { CategoryJobs } from 'app/Job/Interfaces/CategoryJobs';
import { CompanyJobs } from 'app/Job/Interfaces/Company-jobs';
import { ProvinceJobs } from 'app/Job/Interfaces/Province-jobs';
import { TypeContractJobs } from 'app/Job/Interfaces/Type-contract-jobs';
import { CategoryJobServiceService } from 'app/Job/Services/category-job-service.service';
import { CompanyJobServiceService } from 'app/Job/Services/company-job-service.service';
import { JobServiceService } from 'app/Job/Services/job-service.service';
import { ProvinciaJobServiceService } from 'app/Job/Services/provincia-job-service.service';
import { TypeContractJobServiceService } from 'app/Job/Services/type-contract-job-service.service';
import { Jobs } from '../../Interfaces/Jobs';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-view-jobs',
  templateUrl: './view-jobs.component.html',
  styleUrls: ['./view-jobs.component.scss']
})
export class ViewJobsComponent extends UnsubscribeOnDestroyAdapter
  implements OnInit {
  public lstFiltrosSelected: string[] = [];
  public CantidadResultados: number = 0;
  public CategoryId: boolean = false;
  public CompanyId: boolean = false;
  public ContractTypeId: boolean = false;
  public ProvinceId: boolean = false;
  public ShowTables: boolean = false;
  public lstFiltros: Filtros[] = [
    {
      codigo: "CategoryId",
      texto: "Categoría"
    },
    {
      codigo: "CompanyId",
      texto: "Compañia"
    },
    {
      codigo: "ContractTypeId",
      texto: "Tipo de Contrato"
    },
    {
      codigo: "ProvinceId",
      texto: "Provincia"
    }
  ];

  ListCategoria!: CategoryJobs[];
  ListCompania!: CompanyJobs[];
  ListTypeContrat!: TypeContractJobs[];
  ListProvincia!: ProvinceJobs[];
  ListJobs: Jobs[] = [
    this._Jobs._Jobs
  ];
  ListJobsDetails: Jobs = this._Jobs._Jobs;
  FormsJobsFilter!: UntypedFormGroup;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild('filter', { static: true }) filter!: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu?: MatMenuTrigger;
  constructor(
    private fb: UntypedFormBuilder,
    private datePipe: DatePipe,
    public httpClient: HttpClient,
    public _CategoryJobServiceService: CategoryJobServiceService,
    public _CompanyJobServiceService: CompanyJobServiceService,
    public _TypeContractJobServiceService: TypeContractJobServiceService,
    public _ProvinciaJobServiceService: ProvinciaJobServiceService,
    public _Jobs: JobServiceService,
    private sanitizer: DomSanitizer
  ) {
    super();
    this.GetCategory();
    this.GetCompany();
    this.GetContractType();
    this.GetProvinces();
    // this.loadData('activityReasonId=2');
    this.FormsJobsFilter = this.createContactForm();
  }

  createContactForm(): UntypedFormGroup {

    return this.fb.group({
      CategoryId: [''],
      CompanyId: [''],
      ContractTypeId: [''],
      ProvinceId: ['']
    });
  }
  ngOnInit(): void {
    this.submit();
  }

  public limpiarTodosFiltros() {
    this.lstFiltrosSelected = [];
    this.ocultar();
  }
  public seleccionarTodos() {
    this.lstFiltrosSelected = [];
    this.lstFiltros.forEach((f) => {
      this.lstFiltrosSelected.push(f.codigo);
    });
    this.Mostrar();
  }

  ocultar() {
    this.CategoryId = false;
    this.CompanyId = false;
    this.ContractTypeId = false;
    this.ProvinceId = false;
  }
  Mostrar() {
    this.CategoryId = true;
    this.CompanyId = true;
    this.ContractTypeId = true;
    this.ProvinceId = true;
  }

  GetCategory() {
    this._CategoryJobServiceService.getAllCategoryActivity(1).subscribe({
      next: (res) => {
        this.ListCategoria = res;
      }
    })
  }

  GetCompany() {
    this._CompanyJobServiceService.getAllCompanyJobsFiltro(1).subscribe({
      next: (res) => {
        this.ListCompania = res;
      }
    })
  }

  GetContractType() {
    this._CategoryJobServiceService.getAllCategoryActivity(1).subscribe({
      next: (res) => {
        this.ListTypeContrat = res;
      }
    })
  }


  GetProvinces() {
    this._ProvinciaJobServiceService.getAllProvinciaActivity(1).subscribe({
      next: (res) => {
        this.ListProvincia = res;
      }
    })
  }


  filtrosEstadisticas(event: MatSelectChange) {

    if (event.value.indexOf("CategoryId") !== -1) {
      this.CategoryId = true;
    } else {
      this.CategoryId = false;
      this.FormsJobsFilter.controls["CategoryId"].setValue('');
    }
    if (event.value.indexOf("CompanyId") !== -1) {
      this.CompanyId = true;
    } else {
      this.CompanyId = false;
      this.FormsJobsFilter.controls["CompanyId"].setValue('');
    }
    if (event.value.indexOf("ContractTypeId") !== -1) {
      this.ContractTypeId = true;
    } else {
      this.ContractTypeId = false;
      this.FormsJobsFilter.controls["ContractTypeId"].setValue('');
    }
    if (event.value.indexOf("ProvinceId") !== -1) {
      this.ProvinceId = true;
    } else {
      this.ProvinceId = false;
      this.FormsJobsFilter.controls["ProvinceId"].setValue('');
    }
  }
  submit() {
    let params = '';

    if (this.FormsJobsFilter.controls["CategoryId"].value != '') {
      params += `CategoryId=${this.FormsJobsFilter.controls['CategoryId'].value}&`;
    }
    if (this.FormsJobsFilter.controls["CompanyId"].value != '') {
      params += `CompanyId=${this.FormsJobsFilter.controls['CompanyId'].value}&`;
    }
    if (this.FormsJobsFilter.controls["ContractTypeId"].value != '') {
      params += `ContractTypeId=${this.FormsJobsFilter.controls['ContractTypeId'].value}&`;
    }
    if (this.FormsJobsFilter.controls["ProvinceId"].value != '') {
      params += `ProvinceId=${this.FormsJobsFilter.controls['ProvinceId'].value}&`;
    }
    // if (params != '') {
    console.log(params);
    this._Jobs.Filtros(params).subscribe({
      next: (res) => {
        this.ListJobs = res;
      }
    })
    // this._activityService.getEstadisticasFiltro(this.removerUltimoCaracterSiEsAmpersand(params)).subscribe({
    //   next: (res) => {
    //     console.log(res.activitiesByAll);
    //     this.CantidadResultados = res.activitiesByAll.length;
    //   }
    // })
    // }
    // this.loadData(this.removerUltimoCaracterSiEsAmpersand(params))
  }

  safeHtml(myHtmlString: string) {
    if (myHtmlString == null) {
      return '.';
    } else {
      return this.sanitizer.bypassSecurityTrustHtml(myHtmlString);
    }
  }

  detalles(row: Jobs) {
    this.ListJobsDetails = row;
    console.log(row);

  }
}
