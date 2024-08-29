import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { UntypedFormBuilder, } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Degree } from 'app/admission/FormalEducations/Models/Degree';
import { DegreeService } from 'app/admission/FormalEducations/Services/degree.service';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import Swal from 'sweetalert2';

import * as XLSX from 'xlsx';
export interface DialogData {
   action: string;
  // degree: Degree;
}
@Component({
  selector: 'app-form-import',
  templateUrl: './form-import.component.html',
  styleUrls: ['./form-import.component.scss']
})
export class FormImportComponent {

  public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message: ''
  }


  public action: string;
  public dialogTitle: string;
  tempFile!: File;
  valor!: any[];
  dataInJson: Degree[]=[];
  _degreeList!:Degree[];
  
  displayedColumns: string[] = ['Linea','Error','Nombre'];
  

  data2 = [ ];
  dataSource: any[]=[];
  vacio: boolean=false;
  
 
  //public _DegreeModalForms!: UntypedFormGroup;
 // public _DegreeModal!: Degree;
  constructor(
    public dialogRef: MatDialogRef<FormImportComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: UntypedFormBuilder,
    private _DegreeService: DegreeService,
    //private _studyMode: StudyModeService,
    //private _user: UserService

  ) {
    console.log(data);
    this.action = data.action;
    if (this.action === 'add') {
      this.dialogTitle = "Importar carreras";
      //this._DegreeModal = data.degree;
    } else {
      this.dialogTitle = "Editar Carrera";
      //this._DegreeModal = data.degree;
    }
   // this._DegreeModalForms = this.createContactForm();
  }


  onFileChange(event: any) {
    const target: DataTransfer = <DataTransfer>(event.target);
    const file: File = target.files[0];
    
    const fileExtension = file.name.split('.').pop()?.toLowerCase();

// Validar si la extensión es Excel
  const isExcelFile = fileExtension === 'xlsx' || fileExtension === 'xls';


    if (!isExcelFile) {
      Swal.fire({
        title: "Escuela Judicial",
        text: 'Solo se permite tipo de archivo Excel/xlsx/xlsx.',
        icon: "warning"
      });
 
      return;
    }
   this.tempFile=file;
   this.readExcel(this.tempFile);
    
    
    //this.excelService.readExcel(file);
  }
  loadegree() {
    this._DegreeService.getAllDegree2().subscribe({
      next: (data) => {
      this._degreeList=data;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
      },
    });
  }
  
  FormatoExcel(){
    
      // // key name with space add in brackets
      // const exportData: Partial<TableElement>[] =
      //   this.dataSource.filteredData.map((x) => ({
      //     'First Name': x.name,
         
      //   }));
  
      // TableExportUtil.exportToExcel(exportData, 'excel');
   
  }
  readExcel(file: any) {
       const reader = new FileReader();
       
       
       reader.onload = function(e: any) {
         const data = e.target.result;
         const workbook = XLSX.read(data, { type: 'binary' });
         const worksheetName = workbook.SheetNames[0];
         const worksheet = workbook.Sheets[worksheetName];
         const dataInJson = XLSX.utils.sheet_to_json(worksheet);
         console.log('data', dataInJson);
         localStorage.setItem('jsonExcel',JSON.stringify(dataInJson) );

         // Aquí puedes hacer algo con los datos, como almacenarlos en un servicio o emitir un evento
       };

       reader.readAsBinaryString(file);
   
     }

  ngOnInit(): void{
      this.loadegree();
    }
  submit() {

  }

  confirmAdd() {

    this.dataSource=[]
    let yes=false;
    this.vacio=false;
    let jsonExcel: any[];
     // Read JSON data from localStorage asynchronously
  Promise.resolve(localStorage.getItem("jsonExcel"))
  .then(jsonExcelString => {
    if (jsonExcelString!="[]") {
    if(jsonExcelString!=undefined){
       jsonExcel = JSON.parse(jsonExcelString); // Parse JSON
    }
      // Find intersection using find
      
      jsonExcel.forEach((element, index) => {
        // Acceder a los elementos del array
        
        if(!element.Nombre || typeof element.Nombre !== 'string'){
          const newData = { Nombre: element.Nombre, Error: 'La columna "Nombre" está vacía o no es un texto.', Linea:'linea '+ (index+1) };
          this.dataSource = [...this.dataSource,newData];
        }
        
        

        const hasIntersection = this._degreeList.find(degree => degree.name === element.Nombre)
        if(hasIntersection){
        
          const newData = { Nombre: element.Nombre, Error: 'Ya existe', Linea:'linea '+ (index+1) };
          this.dataSource = [...this.dataSource,newData];
          yes=true;
        }
        
        
       if( typeof element["Duración en años"] !== 'number' || !Number.isInteger(element["Duración en años"])){
          const newData = { Nombre: element.Nombre, Error: 'La duración en años debe ser un número entero', Linea:'linea '+ (index+1) };
          this.dataSource = [...this.dataSource,newData];
       }
       
       if( typeof element["Número de créditos"] !== 'number' || !Number.isInteger(element["Número de créditos"])){
        const newData = { Nombre: element.Nombre, Error: 'El Número de créditos  debe ser un número entero', Linea:'linea '+ (index+1) };
        this.dataSource = [...this.dataSource,newData];
       }
       
       if( typeof element["Modo de estudio"] !== 'string' || !element["Modo de estudio"]){
        const newData = { Nombre: element.Nombre, Error: 'El Modo de estudio está vacío o no es un texto.', Linea:'linea '+ (index+1) };
        this.dataSource = [...this.dataSource,newData];
       }
       
       if( typeof element["Perfil de graduación"] !== 'string' || !element["Perfil de graduación"]){
        const newData = { Nombre: element.Nombre, Error: 'La columna "Perfil de graduación" está vacía o no es un texto.', Linea:'linea '+ (index+1) };
        this.dataSource = [...this.dataSource,newData];
       }
       
       if( typeof element["Perfil de admisión"] !== 'string' || !element["Perfil de admisión"]){
        const newData = { Nombre: element.Nombre, Error: 'La columna "Perfil de admisión" está vacía o no es un texto.', Linea:'linea '+ (index+1) };
        this.dataSource = [...this.dataSource,newData];
       }
       
       if( typeof element["Objetivos generales"] !== 'string' || !element["Objetivos generales"]){
        const newData = { Nombre: element.Nombre, Error: 'La columna "Objetivos generales" está vacía o no es un texto.', Linea:'linea '+ (index+1) };
        this.dataSource = [...this.dataSource,newData];
       }



      });

    } else {
      console.log("No JSON data found in localStorage");
      const newData = { Nombre: '', Error: 'El archivo Excel que intentas importar está vacío o no tiene el formato correcto. Por favor, asegúrate de que el archivo contenga los datos en el formato esperado y vuelva a intentarlo.', Linea:'' };
          this.dataSource = [...this.dataSource,newData];
          yes=true;
     
    }
    if(yes==false && this.dataSource.length==0){
      const formsData = new FormData();
        formsData.append('Degrees',this.tempFile);
        
        this._DegreeService.importDegree(formsData)
          .subscribe({
            next: () => {
              this.ResponseMessage.CodError = 200;
              this.ResponseMessage.Message = 'Guardado correctamente.';
              this.dialogRef.close(this.ResponseMessage);
            },
            error: () => {
              this.ResponseMessage.CodError = 400;
              this.ResponseMessage.Message = "Intento Nuevamente.";
              this.dialogRef.close(this.ResponseMessage);
            }
          });
    }
    
  })
  .catch(error => {
    console.error("Error reading from localStorage:", error);
  });

  
    
   
    
  }
  onNoClick() {
    this.dialogRef.close();
  }
}

