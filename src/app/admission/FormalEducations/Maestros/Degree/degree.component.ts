import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivityDetailService } from 'app/admission/services/activity-detail.service';
import { MatDialog } from '@angular/material/dialog';
import { VerificarBS64Pipe } from 'app/pipes/verificar-bs64.pipe'; 
import { FormsDegreeComponent } from '../Forms/forms-degree/forms-degree.component';

@Component({ 
  selector: 'app-degree',
  templateUrl: './degree.component.html',
  styleUrls: ['./degree.component.scss']
})
export class DegreeComponent {

  constructor(
    private Path: ActivatedRoute,
    public _router: Router,
    public _ActivityService: ActivityDetailService,
    public _dialog: MatDialog,
    public _verificarBS64: VerificarBS64Pipe
  ) {
    
  }

  addNew(){
    console.log("..............");

     const dialogRef = this._dialog.open(FormsDegreeComponent, {
       data: {
         accion: 'add-carrera',
         
       },
       disableClose: true,
     });
  }
  refresh(){
    console.log("..............");
  }
  exportExcel(){
    console.log("..............");
  }
}
