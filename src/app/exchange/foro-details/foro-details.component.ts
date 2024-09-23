import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { VerificarBS64Pipe } from 'app/pipes/verificar-bs64.pipe';
import { ForoService } from '../services/foro.service';
import { DomSanitizer } from '@angular/platform-browser';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { AuthService } from '@core';
import Swal from 'sweetalert2';
import { CommetForo, GetComment } from '../models/Foro';
import { ForoRulesUseComponent } from '../foro-rules-use/foro-rules-use.component';

@Component({
  selector: 'app-foro-details',
  templateUrl: './foro-details.component.html',
  styleUrls: ['./foro-details.component.scss']
})
export class ForoDetailsComponent {
  // foro-detalle
  public id: string = '';
  public comentado: string = '';
  public config = {
    licenseKey: 'a004N2VuYWZNOHdLMUxGNFpDVzcrMitERUNEKzlKdWZZbmtOQ3RJZ0xKc3NwMlFMNG4yOWliTkE2bFI0LU1qQXlOREF6TVRJPQ==',
    language: 'es',
    toolbar: ['undo', 'redo', 'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', '|', 'outdent', 'indent', '|', 'imageUpload', 'blockQuote', 'insertTable', 'mediaEmbed'],
  }
  public _comment: CommetForo = {
    getComment: [
      {
        hidden:false,
        foroId: 0,
        commentId: 0,
        firstName: '',
        lastName: '',
        tituloForo: '',
        descripcionForo: '',
        categories: '',
        comment: '',
        fechaInicioForo: new Date(),
        fechaFinForo: new Date(),
        fechaComent: new Date(),
      }
    ],
    message: '',
    isError: false,
    statusCode: 0,
  }
  public Editor: any = ClassicEditor;
  hidden: boolean=false;
  rolId!: string;
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public _dialog: MatDialog,
    public _Foro: ForoService,
    private sanitizer: DomSanitizer,
    private authservice: AuthService
  ) {
  }

  ngOnInit() {
    this.openDialog();
    this.rolId=this.authservice.currentUserValue.roleId
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
      console.log(this.id);
      this.getForo();
    })
  }
  refresh() {
  }
  
  
  openDialog() {
    const dialogRef = this.dialog.open(ForoRulesUseComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  safeHtml(myHtmlString: string) {
    if (myHtmlString == null) {
      return '.';
    } else {
      return this.sanitizer.bypassSecurityTrustHtml(myHtmlString);
    }
  }
  
  Hidden(id:number,hidden1:boolean){
  
   // this.hidden = !this.hidden;
    const data={
      commentId:id,
      hidden:hidden1
    }
    
    Swal.fire({
      title: "¿Estas seguro?",
      text: "¿Está seguro de que desea ocultar este comentario? Revise bien la información antes de confirmar.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Enviar"
    }).then((result) => {
      if (result.isConfirmed) {
        this._Foro.HiddenComment(data).subscribe({
          next: (res) => {
            this._Foro._ForoResponse = res;
            
            
          },
          complete: () => {
            this.getComment();
           
            Swal.fire({
              title: "Escuela Judicial!",
              text: "Guardado con exito.",
              icon: "success"
            });
            //this.router.navigate(['/exchange/foro-detalle/',this.id])
          }
        });
      } else {
        Swal.fire({
          title: "Escuela Judicial!",
          text: "No fue enviado.",
          icon: "warning"
        });
      }
    });

  //crear api
  // logica para actualizar statusid de comentario
  }
  getForo() {
    this._Foro.GetForosParams(this.id).subscribe({
      next: (res) => {
        this._Foro._ForoResponse = res;
      },
      complete: () => {
        this.getComment();
      }
    });
  }

  submit() {
    let data = {
      content: this.comentado,
      createdBy: this.authservice.currentUserValue.id,
      forosId: this.id
    }
    this._Foro.CreateComment(data).subscribe({
      next: (res) => {
        if (res.statusCode == 200) {
          Swal.fire({
            title: "Escuela Judicial",
            text: res.message,
            icon: "success"
          });
          this.comentado ='';
        }
        this.getComment();
      }
    })

  }
  atras() {
    this.router.navigate(['/exchange/foro'])
  }

  getComment() {
    this._Foro.GetCommetForo(this.id).subscribe({
      next: (res:CommetForo) => {
       if(this.rolId=='d2674562-193a-41e6-9a92-7f7cb04caf90' || this.rolId== '2b34afce-38b7-47cd-b0c4-fb589a97b138'){
        this._comment = res;
       }else{
        res.getComment= res.getComment.filter(come => come.hidden==false);
        this._comment = res;
       }
       
      
        console.log(res);
      }
    })
  }
}
