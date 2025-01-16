import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'app/admission/FormalEducations/Models/Subject';
import { SubjectServiceService } from 'app/admission/FormalEducations/Services/subject-service.service';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import Swal from 'sweetalert2';

import * as XLSX from 'xlsx';
export interface DialogData {
   action: string;
  // degree: Degree;
}
@Component({
  selector: 'app-form-import-subject',
  templateUrl: './form-import-subject.component.html',
  styleUrls: ['./form-import-subject.component.scss']
})
export class FormImportSubjectComponent {

  public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message: ''
  }


  public action: string;
  public dialogTitle: string;
  tempFile!: File;
  valor!: any[];
  dataInJson: Subject[]=[];
  _subjectList!:Subject[];
  
  displayedColumns: string[] = ['Linea','Error','Nombre'];
  

  data2 = [ ];
  dataSource: any[]=[];
  vacio: boolean=false;
  
 
  //public _DegreeModalForms!: UntypedFormGroup;
 // public _DegreeModal!: Degree;
  constructor(
    public dialogRef: MatDialogRef<FormImportSubjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: UntypedFormBuilder,
    private _SubjectService: SubjectServiceService,
    

  ) {
    console.log(data);
    this.action = data.action;
    if (this.action === 'add') {
      this.dialogTitle = "Importar asignaturas";
      //this._DegreeModal = data.degree;
    } else {
      this.dialogTitle = "Editar asignaturas";
      //this._DegreeModal = data.degree;
    }

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
  loadSubject() {
    this._SubjectService.getAllSubject3().subscribe({
      next: (data) => {
      this._subjectList=data;
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
      this.loadSubject();
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
        
        

        const hasIntersection = this._subjectList.find(subject => subject.name === element.Nombre)
        if(hasIntersection){
        
          const newData = { Nombre: element.Nombre, Error: 'Ya existe', Linea:'linea '+ (index+1) };
          this.dataSource = [...this.dataSource,newData];
          yes=true;
        }
        
        if( typeof element["Acrónimo"] !== 'string' || !element["Acrónimo"]){
          const newData = { Nombre: element.Nombre, Error: 'La columna "abreviatura" está vacía o no es un texto.', Linea:'linea '+ (index+1) };
          this.dataSource = [...this.dataSource,newData];
         } 
         
         if( typeof element["Código"] !== 'string' || !element["Código"]){
          const newData = { Nombre: element.Nombre, Error: 'La columna "Código" está vacía o no es un texto.', Linea:'linea '+ (index+1) };
          this.dataSource = [...this.dataSource,newData];
         } 
        
        
       if( typeof element["Número de créditos"] !== 'number' || !Number.isInteger(element["Número de créditos"])){
          const newData = { Nombre: element.Nombre, Error: 'El Número de créditos debe ser un número entero', Linea:'linea '+ (index+1) };
          this.dataSource = [...this.dataSource,newData];
       }
       
       if( typeof element["Número de horas"] !== 'number' || !Number.isInteger(element["Número de horas"])){
        const newData = { Nombre: element.Nombre, Error: 'El Número de horas  debe ser un número entero', Linea:'linea '+ (index+1) };
        this.dataSource = [...this.dataSource,newData];
       }
       
       if( typeof element["Número de clases"] !== 'number' || !Number.isInteger(element["Número de clases"])){
        const newData = { Nombre: element.Nombre, Error: 'El Número de clases  debe ser un número entero', Linea:'linea '+ (index+1) };
        this.dataSource = [...this.dataSource,newData];
       }
       

       
       if( typeof element["¿Tiene laboratorio?"] !== 'string' || !element["¿Tiene laboratorio?"]){
        const newData = { Nombre: element.Nombre, Error: 'La columna "Tiene laboratorio" está vacía o no es un texto.', Linea:'linea '+ (index+1) };
        this.dataSource = [...this.dataSource,newData];
       }
       
       if( typeof element["Criterios de evaluación"] !== 'string' || !element["Criterios de evaluación"]){
        const newData = { Nombre: element.Nombre, Error: 'La columna "Criterios de evaluación" está vacía o no es un texto.', Linea:'linea '+ (index+1) };
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
        formsData.append('Subjects',this.tempFile);
        
        this._SubjectService.importSubject(formsData)
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
