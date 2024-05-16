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
import { CommetForo } from '../models/Foro';

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

    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
      console.log(this.id);
      this.getForo();
    })
  }
  refresh() {
  }
  safeHtml(myHtmlString: string) {
    if (myHtmlString == null) {
      return '.';
    } else {
      return this.sanitizer.bypassSecurityTrustHtml(myHtmlString);
    }
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
      next: (res) => {
        this._comment = res;
        console.log(res);
      }
    })
  }
}
