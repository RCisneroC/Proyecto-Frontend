import { Component, OnInit,OnDestroy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Calls } from '../models/CallsModel';
import { ActivatedRoute,Router } from '@angular/router';
import { EncryptDescryptService } from '../services/encrypt-descrypt.service';
import { CallsTeachersService } from '../services/calls-teachers.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-view-call-for-apply',
  templateUrl: './view-call-for-apply.component.html',
  styleUrls: ['./view-call-for-apply.component.scss']
})
export class ViewCallForApplyComponent implements OnInit, OnDestroy {
  public id: string = "";
  public calls: Calls = {
  id : 1,
  titulo:"Convocatoria de Prueba",
  descripcion: "Se solicita un docente tiempo parcial para dictar la cátedra de matemáticas",
  funciones:"<ul><li>Dictar clases</li></ul>",
  requisitos:"<ul><li>Especialización en Docencia</li></ul>"
  };

public subscriptions: Subscription[] = [];

constructor(public activatedRoute: ActivatedRoute,
  private sanitizer: DomSanitizer, private router: Router,
  private  serviceCallsTeachers:CallsTeachersService,
  private serviceEncryptDescrypt: EncryptDescryptService){
  this.activatedRoute.params.subscribe((params) => {
    this.id = this.decrypt(params['id']);
  });

 }


  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe())
  }

  ngOnInit(): void {
    console.log("Init")
  }

 public SafeHtml(myHtmlString: string) {
  if (myHtmlString == null) {
    return '.';
  } else {
    return this.sanitizer.bypassSecurityTrustHtml(myHtmlString);
  }
}

volverAtras() {
  let url =  "calls/teacher-apply-calls";
  this.router.navigate([url]);
}

Postularse() {
  const url: string =  "teacher/teacher-admission-external/" + this.encrypt(this.calls.id.toString()) + "/" + this.encrypt("C");
  this.router.navigate([url]);
}


public encrypt(value: string) : string{
  return this.serviceEncryptDescrypt.encrypt(value);
}

public decrypt(value: string) : string{
  return this.serviceEncryptDescrypt.decrypt(value);
}

}
