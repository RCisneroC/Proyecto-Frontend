import { Component, Inject, OnDestroy, OnInit, signal } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '@core';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { BudgetDetailBudgetTermMonthDtClass, BudgetDetailBudgetTermMonthDto, BudgetTermDto, GetBudgetDetail } from 'app/treasury/Models/BudgetDetails';
import { GetBudgetTerm } from 'app/treasury/Models/BudgetTerm';
import { BudgetTermMonthRequest, GetBudgetTermMonth } from 'app/treasury/Models/BudgetTermMonth';
import { BudgetTermMonthServicesService } from 'app/treasury/Services/budget-term-month-services.service';
import { BudgetTermServicesService } from 'app/treasury/Services/budget-term-services.service';
export interface DialogData {
  detail: GetBudgetDetail;
}

export interface Producto {

 amount:number;
  
}
@Component({
  selector: 'app-budget-details-month-forms',
  templateUrl: './budget-details-month-forms.component.html',
  styleUrls: ['./budget-details-month-forms.component.scss']
})
export class BudgetDetailsMonthFormsComponent implements OnInit,OnDestroy {
 
  public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message: ''
  }
  //readonly panelOpenState = signal(false);
  panelOpenState = new Map<BudgetTermDto, boolean>();
  public _BudgetTermDtoArray:BudgetTermDto[]=[]
  public category: any;
  public action?: string;
  public dialogTitle: string = "";
  public Trimestres: GetBudgetTerm[] = [];
  public Meses: GetBudgetTermMonth[] = []; 
  
    // Definir datos de la tabla
    productos: Producto[] = [
      { amount: 0.00 },
   
    ];
  
    dataSource = new MatTableDataSource<Producto>(this.productos);
  
    // Columnas de la tabla
    displayedColumns = ['mes1', 'mes2', 'mes3'];
  public _BudgetTermDto:BudgetTermDto = {
    id:0,
    description:'',
    name:'',
    subTotal:0,
    budgetDetailBudgetTermMonthDtos:[]
  }
  public _BudgetDetailBudgetTermMonthDto:BudgetDetailBudgetTermMonthDto={
    amount:0,
    budgetTermMonthId:0,
    budgetTermMonthName:''
  }
  IsLoading: boolean = false;
  _GetBudgetDetails : GetBudgetDetail = {}; 

  constructor(
    public dialogRef: MatDialogRef<BudgetDetailsMonthFormsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _BudgetTermServicesService: BudgetTermServicesService,
    private _BudgetTermMonthServicesService: BudgetTermMonthServicesService,
    private authService: AuthService
  ) {
    this.action = data.detail.actions;
    this._GetBudgetDetails = data.detail;
    console.log(this._GetBudgetDetails);
 
      this.dialogTitle = 'Detalle de Presupuesto';
      this.getTrimestres();
      this.getMeses();
  }
  initArray(){
    this._BudgetTermDto ={
      id:0,
      description:'',
      name:'',
      subTotal:0,
      budgetDetailBudgetTermMonthDtos:[]
    };
  }
  ngOnDestroy(): void {
  } 

  ngOnInit(): void {
    if(this.action == "new"){ 
    }
    
   
  }

confirmAdd() {
 
  this.IsLoading = true;
  if (this.action == "new") {
       
  }
  else if (this.action == "edit") {
   

  }
}

getTrimestres(){
  this._BudgetTermServicesService.getAll().subscribe({
    next:(res)=>{
      this.Trimestres = res.getBudgetTerms;
    }
  })
}

getMeses(){
  this._BudgetTermMonthServicesService.getAll().subscribe({
    next:(res)=>{
      this.Meses = res.getBudgetTermMonths;
    },
    complete:()=>{
      this.render();
    }
  })
}

onNoClick() {
  this.dialogRef.close();
}

onPanelOpen(budgetTerm: BudgetTermDto) {
  this.panelOpenState.set(budgetTerm, !this.panelOpenState.get(budgetTerm) || false);
}

onAmountChange(index: number,index2: number) {

const id=this.data.detail.id;
const budgetTermMonthId=this._BudgetTermDtoArray[index].budgetDetailBudgetTermMonthDtos[index2].budgetTermMonthId
const amount = this._BudgetTermDtoArray[index].budgetDetailBudgetTermMonthDtos[index2].amount;

console.log('Amount changed for index', index, 'to:', amount);

 if(amount!=undefined && budgetTermMonthId !=undefined && id !=undefined)
 this._BudgetTermMonthServicesService.updateBudgetAmount(id, budgetTermMonthId, amount)
 .subscribe(response => {
   // Handle successful update (optional)
   console.log('Amount updated successfully:', response);
 }, error => {
   // Handle errors during update (optional)
   console.error('Error updating amount:', error);
   
 });
  
  
}
render(){
  let render_var:GetBudgetTermMonth[]=[];
  let resp_var:BudgetDetailBudgetTermMonthDto[]=[];

  this._GetBudgetDetails.budgetTermDtos?.forEach((res)=>{
    this._BudgetTermDto.budgetDetailBudgetTermMonthDtos=[];
    // this.Trimestres.forEach((tri)=>{

      this._BudgetTermDto.id = res.id,
      this._BudgetTermDto.name = res.name,
      this._BudgetTermDto.description = res.description,
      this._BudgetTermDto.subTotal = res.subTotal

      render_var = this.Meses.filter(x=>x.budgetTermId ==res.id );
      render_var.forEach((month)=>{

       resp_var = res.budgetDetailBudgetTermMonthDtos?.filter(x=>x.budgetTermMonthId == month.id);
        console.log(resp_var);
        let newBudgetDetailBudgetTermMonthDto = new BudgetDetailBudgetTermMonthDtClass(); // Crear nueva instancia

       if (resp_var.length ==0) {
          newBudgetDetailBudgetTermMonthDto.amount= 0;
          newBudgetDetailBudgetTermMonthDto.budgetTermMonthId =month.id;
          newBudgetDetailBudgetTermMonthDto.budgetTermMonthName =month.name;
        } else {
          resp_var.forEach(element => {
            newBudgetDetailBudgetTermMonthDto.amount =element.amount;
            newBudgetDetailBudgetTermMonthDto.budgetTermMonthId =element.budgetTermMonthId;
            newBudgetDetailBudgetTermMonthDto.budgetTermMonthName =element.budgetTermMonthName;
            // this._BudgetTermDto.budgetDetailBudgetTermMonthDtos.push(newBudgetDetailBudgetTermMonthDto);
          });
        }
        this._BudgetTermDto.budgetDetailBudgetTermMonthDtos.push(newBudgetDetailBudgetTermMonthDto);
      });
      this._BudgetTermDtoArray.push(this._BudgetTermDto);
      // Función de comparación para ordenar por id
const sortByID = (a: BudgetTermDto, b: BudgetTermDto): number => {
  if (a.id < b.id) {
    return -1;
  } else if (a.id === b.id) {
    return 0;
  } else {
    return 1;
  }
};

// Ordenar la matriz por id
this._BudgetTermDtoArray.sort(sortByID);
      this.initArray();
    // })
  })
  // ================================================ //
  console.log('====================================');
  console.log(this._BudgetTermDtoArray);
  console.log('====================================');
}

}
