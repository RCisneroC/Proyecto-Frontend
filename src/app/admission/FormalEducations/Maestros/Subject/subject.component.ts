import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { VerificarBS64Pipe } from 'app/pipes/verificar-bs64.pipe';
import { FormsSubjectComponent } from '../Forms/forms-subject/forms-subject.component';
import { SubjectServiceService } from '../../Services/subject-service.service';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent {
  constructor(
    private Path: ActivatedRoute,
    public _router: Router,
    public _dialog: MatDialog,
    public _verificarBS64: VerificarBS64Pipe,
    public _SubjectService:SubjectServiceService
  ) {
    
  }

  addNew() {
    console.log(this._SubjectService.init_Subject());
    const dialogRef = this._dialog.open(FormsSubjectComponent, {
       data: {
        accion: 'add-asignaturas',
         subject:this._SubjectService._Subject
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
