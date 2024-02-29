import { Component,  OnDestroy } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-creditos-no-oficiales',
  templateUrl: './creditos-no-oficiales.component.html',
  styleUrls: ['./creditos-no-oficiales.component.scss']
})
export class CreditosNoOficialesComponent implements OnDestroy {
  creditosNoOficialesForm: UntypedFormGroup;
  subscriptions: Subscription[] = [];

  constructor( private fb: UntypedFormBuilder){
    this.creditosNoOficialesForm = this.createTimeSlots();
  }

  createTimeSlots(): UntypedFormGroup {
    return this.fb.group({
      formacionEspecializada: ['', Validators.required]
    });
  }

  guardar():void{

  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe())
  }

}
