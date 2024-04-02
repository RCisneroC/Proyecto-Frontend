import { Component, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { Calls } from 'app/CallsTeachers/models/CallsModel';
import { CallsTeachersService } from '../services/calls-teachers.service';
import { HttpErrorResponse, HttpUrlEncodingCodec  } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { EncryptDescryptService } from '../services/encrypt-descrypt.service';

@Component({
  selector: 'app-teacher-apply-calls',
  templateUrl: './teacher-apply-calls.component.html',
  styleUrls: ['./teacher-apply-calls.component.scss']
})
export class TeacherApplyCallsComponent implements OnInit, OnDestroy {

  public subscriptions: Subscription[] = [];
  public lstResultados: Calls[] = [];
  public urlEncoding = new HttpUrlEncodingCodec();
  public id: string = this.encrypt("0");
  public type: string = this.encrypt("S");
 constructor(private  serviceCallsTeachers:CallsTeachersService,
  private serviceEncryptDescrypt: EncryptDescryptService
  ){}

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe())
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll():void{
  this.serviceCallsTeachers.getCallsAvailable().subscribe(
  {
    next : (request:Calls[])=>{
             this.lstResultados = request;
             this.lstResultados.forEach( (f)=>{
              return f.url = this.encrypt(f.id.toString())

             });
    },
    error : (err:HttpErrorResponse) =>{
      console.log(err);
    }
  }
  );

  }

  getVacancy(value:any):void{

  }


  public encrypt(value: string) : string{
    return this.serviceEncryptDescrypt.encrypt(value);
  }
}
