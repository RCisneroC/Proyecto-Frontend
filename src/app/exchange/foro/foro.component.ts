import {Component, ElementRef} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "@core";
import {MatDialog} from "@angular/material/dialog";
import {ForoService} from "../services/foro.service";
import {Foro} from "../models/Foro";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

@Component({
  selector: 'app-foro',
  templateUrl: './foro.component.html',
  styleUrls: ['./foro.component.scss']
})
export class ForoComponent {

  public Editor: any = ClassicEditor;
  constructor(
    private Path: ActivatedRoute,
    public _router: Router,
    public elm: ElementRef,
    private authService: AuthService,
    public foroService: ForoService,
    public dialog: MatDialog
  ) {

    this.loadInit();
  }

  public Foros: Foro[] = [{
    foroId: 0,
    title: '',
    description: '',
    createdDate: new Date,
    createdBy: '',
    statusId: 0,
    categoriesId: 0
  }]

  loadInit(){
    this.foroService.GetCategory("1003").subscribe({
      next:(res)=>{
        console.log("Categorias",res.getCategoriesResponse);
        if(res.statusCode == 200){
          this.foroService.GetForos(0).subscribe({
            next:(resp)=>{
              console.log("Foros",resp.getForos);
              this.Foros = resp.getForos;
            }
          })
        }
      }
    })
  }
}
