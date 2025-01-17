import { Component, Inject } from '@angular/core';
import { ResponseMessageMaestra } from 'app/admission/models/ResponseMessage';
import { Teacher } from '../models/Teacher';
import { TeacherService } from '../services/teacher.service';
import { UntypedFormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';

import * as XLSX from 'xlsx';
export interface DialogData {
   action: string;
   teacher: Teacher;
}

interface TableElement {
  Cedula: string;
  Nombre: string;
  Apellido: string;
  LugarNacimiento: string;
  FechaNacimiento: string;
  LugarResidencia: string;
  CorreoElectronico: string;
  Telefono: string;
  Sexo: string;
}

const fakeData: TableElement[] = [{
  Cedula: '21-324-359',
  Nombre: 'Prueba Presentacion 4',
  Apellido: 'prueba 4 excel',
  LugarNacimiento: 'panama',
  FechaNacimiento: '10/01/1993',
  LugarResidencia: 'panama',
  CorreoElectronico: 'Prueba359@yopmail.com',
  Telefono: '4248772488',
  Sexo: 'Masculino'
}];

@Component({
  selector: 'app-form-import-teacher',
  templateUrl: './form-import-teacher.component.html',
  styleUrls: ['./form-import-teacher.component.scss']
})
export class FormImportTeacherComponent {

  public ResponseMessage: ResponseMessageMaestra = {
    CodError: 0,
    Message: ''
  }


  public action: string;
  public dialogTitle: string;
  tempFile!: File;
  valor!: any[];
  dataInJson: Teacher[]=[];
  _teacherList!:Teacher[];
  
  displayedColumns: string[] = ['Linea','Error','Nombre'];
  

  data2 = [ ];
  dataSource: any[]=[];
  vacio: boolean=false;
  load: boolean=false;
  
 
  //public _DegreeModalForms!: UntypedFormGroup;
 // public _DegreeModal!: Degree;
  constructor(
    public dialogRef: MatDialogRef<FormImportTeacherComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: UntypedFormBuilder,
    private _teacherService: TeacherService,
    

  ) {
    console.log(data);
    this.action = data.action;
    if (this.action === 'add') {
      this.dialogTitle = "Importar docentes";
      //this._DegreeModal = data.degree;
    } else {
      this.dialogTitle = "Editar docentes";
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
  loadTeacher() {
    this._teacherService.getAllTeacher3().subscribe({
      next: (data) => {
      this._teacherList=data;
      this.load=true;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
      },
    });
  }
  

 
   FormatoExcel() {
    const exportData: Partial<TableElement>[] = 
    fakeData.map((x) => ({
      'Cedula': x.Cedula,
      'Nombre': x.Nombre,
      'Apellido': x.Apellido,
      'Lugar de nacimiento': x.LugarNacimiento,
      'Fecha de nacimiento': x.FechaNacimiento,
      'Lugar de residencia': x.LugarResidencia,
      'Correo electrónico': x.CorreoElectronico,
      'Teléfono': x.Telefono,
      'Sexo': x.Sexo,
    }));
  
    const ws = XLSX.utils.json_to_sheet(exportData);
  
    // Obtener cabeceras
    const headers = Object.keys(exportData[0]) as (keyof TableElement)[];
  
    // Calcular el ancho de las columnas incluyendo las cabeceras
    const colWidths = headers.map((header) => (
      Math.max(
        header.length,
        ...exportData.map(row => row[header]?.toString().length ?? 0)
      )
    ));
  
    ws['!cols'] = colWidths.map(width => ({ width: width + 2 }));
  
    // Aplicar estilos a las cabeceras
    headers.forEach((header, i) => {
      const address = XLSX.utils.encode_col(i) + '1'; // Primera fila para cada columna
      if (ws[address]) {
        ws[address].s = {
          fill: {
            patternType: 'solid',
            fgColor: { rgb: 'CCFFCC' } // Color de fondo verde claro
          },
          font: {
            bold: true,
            color: { rgb: '000000' }, // Color de fuente negro
            sz: 12,
            name: 'Arial'
          },
          alignment: {
            vertical: 'center',
            horizontal: 'center'
          }
        };
      }
    });
  
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, `Docentes.xlsx`);
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
      this.loadTeacher();
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
        
        if(!element.Cedula || typeof element.Cedula !== 'string'){
          const newData = { Cedula: element.Cedula, Error: 'La columna "Cédula" está vacía o no es un texto.', Linea:'linea '+ (index+1) };
          this.dataSource = [...this.dataSource,newData];
        }
        
        

        const hasIntersection = this._teacherList.find(teacher => teacher.cedula === element.Cedula)
        if(hasIntersection){
        
          const newData = { Cedula: element.Cedula, Error: 'Ya existe', Linea:'linea '+ (index+1) };
          this.dataSource = [...this.dataSource,newData];
          yes=true;
        }
        
        if( typeof element["Nombre"] !== 'string' || !element["Nombre"]){
          const newData = { Nombre: element.Nombre, Error: 'La columna "Nombre" está vacía o no es un texto.', Linea:'linea '+ (index+1) };
          this.dataSource = [...this.dataSource,newData];
         } 
         
         if( typeof element["Apellido"] !== 'string' || !element["Apellido"]){
          const newData = { Nombre: element.Cedula, Error: 'La columna "Apellido" está vacía o no es un texto.', Linea:'linea '+ (index+1) };
          this.dataSource = [...this.dataSource,newData];
         } 
         
         if( typeof element["Lugar de nacimiento"] !== 'string' || !element["Lugar de nacimiento"]){
          const newData = { Nombre: element.Cedula, Error: 'La columna "Lugar de nacimiento" está vacía o no es un texto.', Linea:'linea '+ (index+1) };
          this.dataSource = [...this.dataSource,newData];
         } 
        
        
         if( !element["Fecha de nacimiento"]){
          //element["Fecha de nacimiento"]=new Date(element["Fecha de nacimiento"] * 86400000);
          const newData = { Nombre: element.Cedula, Error: 'La columna "Fecha de nacimiento" está vacía o no es un formato valido(Ej. dd/mm/aa).', Linea:'linea '+ (index+1) };
          this.dataSource = [...this.dataSource,newData];
         } 
         
         if( typeof element["Lugar de residencia"] !== 'string' || !element["Lugar de residencia"]){
          const newData = { Nombre: element.Cedula, Error: 'La columna "Lugar de residencia" está vacía o no es un texto.', Linea:'linea '+ (index+1) };
          this.dataSource = [...this.dataSource,newData];
         } 
         
         if( typeof element["Correo electrónico"] !== 'string' || !element["Correo electrónico"]){
          const newData = { Nombre: element.Cedula, Error: 'La columna "Correo electrónico" está vacía o no es un texto.', Linea:'linea '+ (index+1) };
          this.dataSource = [...this.dataSource,newData];
         } 
         
         if( typeof element["Teléfono"].toString() !== 'string' || !element["Teléfono"]){
          const newData = { Nombre: element.Cedula, Error: 'La columna "Teléfono" está vacía o no es un texto.', Linea:'linea '+ (index+1) };
          this.dataSource = [...this.dataSource,newData];
         } 
         
         if( typeof element["Sexo"] !== 'string' || !element["Sexo"] ){
          const newData = { Nombre: element.Cedula, Error: 'La columna "Sexo" está vacía o no es un texto.', Linea:'linea '+ (index+1) };
          this.dataSource = [...this.dataSource,newData];
         } 
         
        //  if((!element["Sexo"].includes("masculino") !element["Sexo"].includes("masculino")) ){
        //   const newData = { Nombre: element.Cedula, Error: 'La columna "Teléfono" está vacía o no es un texto.', Linea:'linea '+ (index+1) };
        //   this.dataSource = [...this.dataSource,newData];
        //  } 
        
        
        
        
      
      });

    } else {
      console.log("No JSON data found in localStorage");
      const newData = { Nombre: '', Error: 'El archivo Excel que intentas importar está vacío o no tiene el formato correcto. Por favor, asegúrate de que el archivo contenga los datos en el formato esperado y vuelva a intentarlo.', Linea:'' };
          this.dataSource = [...this.dataSource,newData];
          yes=true;
     
    }
    if(yes==false && this.dataSource.length==0){
      const formsData = new FormData();
        formsData.append('Teachers',this.tempFile);
        
        this._teacherService.importTeacher(formsData)
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

