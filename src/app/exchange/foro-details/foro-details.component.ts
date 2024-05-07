import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { VerificarBS64Pipe } from 'app/pipes/verificar-bs64.pipe';
import { ForoService } from '../services/foro.service';
import { DomSanitizer } from '@angular/platform-browser';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-foro-details',
  templateUrl: './foro-details.component.html',
  styleUrls: ['./foro-details.component.scss']
})
export class ForoDetailsComponent {
  // foro-detalle
  public id: string = '';
  public config = {
    licenseKey: 'a004N2VuYWZNOHdLMUxGNFpDVzcrMitERUNEKzlKdWZZbmtOQ3RJZ0xKc3NwMlFMNG4yOWliTkE2bFI0LU1qQXlOREF6TVRJPQ==',
    language: 'es',
    toolbar: ['undo', 'redo', 'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', '|', 'outdent', 'indent', '|', 'imageUpload', 'blockQuote', 'insertTable', 'mediaEmbed'],
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
    private sanitizer: DomSanitizer
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
      }
    });
  }

  atras() {
    this.router.navigate(['/exchange/foro'])
  }
}
