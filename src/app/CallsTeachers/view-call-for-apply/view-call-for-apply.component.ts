import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Calls } from '../models/CallsModel';
import { ActivatedRoute,Router } from '@angular/router';


@Component({
  selector: 'app-view-call-for-apply',
  templateUrl: './view-call-for-apply.component.html',
  styleUrls: ['./view-call-for-apply.component.scss']
})
export class ViewCallForApplyComponent implements OnInit {
  public id: string = "";
  public calls: Calls = {
  id : 1,
  titulo:"Convocatoria de Prueba",
  descripcion: "Se solicita un docente tiempo parcial para dictar la cátedra de matemáticas",
  funciones:"<ul><li>Dictar clases</li></ul>",
  requisitos:"<ul><li>Especialización en Docencia</li></ul>"
  };

constructor(public activatedRoute: ActivatedRoute,
  private sanitizer: DomSanitizer, private router: Router){
  this.activatedRoute.params.subscribe((params) => {
    this.id = params['id'];
  });

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
  let url =  "teacher/teacher-admission-external/" + this.calls.id + "/C";
  this.router.navigate([url]);
}

}
