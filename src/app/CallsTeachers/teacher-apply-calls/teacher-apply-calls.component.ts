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
  public IsLoading: boolean = false;

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
  this.IsLoading = true;
  this.serviceCallsTeachers.getCallsAvailable().subscribe(
  {
    next : (request:Calls[])=>{
             this.lstResultados = request;
             this.lstResultados.forEach( (f)=>{
               f.url = this.encrypt(f.id.toString())
               f.statusId = this.getStatusId(f.fechaFin!)
             });
             this.IsLoading = false;
    },
    error : (err:HttpErrorResponse) =>{
      console.log(err);
      Swal.fire({
        title: "Escuela Judicial",
        text: "No se pudo cargar las convocatorias",
        icon: "warning"
      });
      this.IsLoading = false;
    }
  }
  );

  }

  getVacancy(value:any):void{
    this.IsLoading = true;
    this.serviceCallsTeachers.getCallsAvailable(value.toString()).subscribe(
      {
        next : (request:Calls[])=>{
                 this.lstResultados = request;
                 this.lstResultados.forEach( (f)=>{
                   f.url = this.encrypt(f.id.toString())
                   f.statusId = this.getStatusId(f.fechaFin!)
                 });
                 this.IsLoading = false;
        },
        error : (err:HttpErrorResponse) =>{
          console.log(err);
          Swal.fire({
            title: "Escuela Judicial",
            text: "No se pudo cargar las convocatorias",
            icon: "warning"
          });
          this.IsLoading = false;
        }
      }
      );
  }

  public getStatusId(date :string):number{

    const date_1 = new Date(date.substring(0,10));
    const date_2 = new Date();
    const day_as_milliseconds = 86400000;
    const diff_in_millisenconds = date_1.getTime() - date_2.getTime();

    const diff_in_days = diff_in_millisenconds / day_as_milliseconds;
    let resp : number = 0;
    resp = (diff_in_days > 0 && diff_in_days  < 5 ? 2 : diff_in_days < 0 ? 3 : diff_in_days  > 5 ? 1 : 2);

    return  resp;
  }


  public encrypt(value: string) : string{
    return this.serviceEncryptDescrypt.encrypt(value);
  }

  public decrypt(value: string) : string{
    return this.serviceEncryptDescrypt.decrypt(value);
  }
}
