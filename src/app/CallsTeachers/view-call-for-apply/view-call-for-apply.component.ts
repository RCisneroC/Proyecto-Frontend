import { Component, OnInit,OnDestroy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Calls } from '../models/CallsModel';
import { ActivatedRoute,Router } from '@angular/router';
import { EncryptDescryptService } from '../services/encrypt-descrypt.service';
import { CallsTeachersService } from '../services/calls-teachers.service';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-call-for-apply',
  templateUrl: './view-call-for-apply.component.html',
  styleUrls: ['./view-call-for-apply.component.scss']
})
export class ViewCallForApplyComponent implements OnInit, OnDestroy {
  public id: number = 0;
  public calls?: Calls;

public subscriptions: Subscription[] = [];

constructor(public activatedRoute: ActivatedRoute,
  private sanitizer: DomSanitizer, private router: Router,
  private  serviceCallsTeachers:CallsTeachersService,
  private serviceEncryptDescrypt: EncryptDescryptService){
  this.activatedRoute.params.subscribe((params) => {
    this.id = parseInt(this.decrypt(params['id']));
  });
 }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe())
  }

  ngOnInit(): void {
    this.getCalls();
  }

  getCalls():void{
    this.serviceCallsTeachers.getCallsAvailableById(this.id).subscribe(
      {
        next : (request:Calls)=>{
                 this.calls = request;
        },
        error : (err:HttpErrorResponse) =>{
          console.log(err);
          Swal.fire({
            title: "Escuela Judicial",
            text: "La convocatoria no existe",
            icon: "warning"
          });
        }
      }
    )
  }

 public SafeHtml(myHtmlString: string) {
  if (myHtmlString == null) {
    return '.';
  } else {
    return this.sanitizer.bypassSecurityTrustHtml(myHtmlString);
  }
}

volverAtras() {
  const url =  "calls/teacher-apply-calls";
  this.router.navigate([url]);
}

Postularse() {
  let pId: string = "";
  if(this.calls != undefined)
   pId = this.calls?.id!.toString();

  const url: string =  "teacher/teacher-admission-external/" + this.encrypt(pId) + "/" + this.encrypt("C");
  this.router.navigate([url]);
}


public encrypt(value: string) : string{
  return this.serviceEncryptDescrypt.encrypt(value);
}

public decrypt(value: string) : string{
  return this.serviceEncryptDescrypt.decrypt(value);
}

}
