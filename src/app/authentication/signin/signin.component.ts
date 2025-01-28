import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '@core';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { RequestServicesService } from 'app/intranet-academic-registration/Services/request-services.service';
import * as CryptoJS from 'crypto-js';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit {
  authForm!: UntypedFormGroup;
  submitted = false;
  loading = false;
  error = '';
  hide = true;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    public _RequestServicesService: RequestServicesService
  ) {
    super();
  }

  ngOnInit() {
    this.authForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  
  encryptPassword(password: string): string {
    const secretKey = CryptoJS.enc.Utf8.parse('1234567890123456'); // Clave de 16 bytes
    const iv = CryptoJS.enc.Utf8.parse('1234567890123456'); // IV de 16 bytes
  
    const encrypted = CryptoJS.AES.encrypt(password, secretKey, {
      iv: iv,
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC
    });
  
    return encrypted.toString();
  }
  get f() {
    return this.authForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    this.loading = true;
    this.error = '';
    if (this.authForm.invalid) {
      this.error = 'Username and Password not valid !';
      return;
    } else {
  


  const email = this.encryptPassword(this.authForm.get('email')?.value);
  const password = this.encryptPassword(this.authForm.get('password')?.value);
      this.authService
        .login(email, password)
        .subscribe({
          next: (res) => {
            if (res) {
              if (res) {
                const token = this.authService.currentUserValue.token
                localStorage.setItem('menu', JSON.stringify(res.menus));
                if (token) {
                  const type = this._RequestServicesService.getRoleFromToken(token);
                  console.log(type);

                  switch (type) {
                    case 'Estudiante':
                      this.router.navigate(['/dashboard/dashboard-student']);
                      break;
                    case 'Tutor':
                      this.router.navigate(['/dashboard/dashboard-tutor']);
                      break;
                    case 'Tecnologia':
                      this.router.navigate(['/dashboard/dashboard1']);
                      break;
                    case 'Profesor':
                      this.router.navigate(['/dashboard/dashboard1']);
                      break;
                    case 'Graduados':
                      this.router.navigate(['/dashboard/dashboard1']);
                      break;
                    case 'Docente':
                      this.router.navigate(['/dashboard/dashboard1']);
                      break;
                    case 'Director':
                      this.router.navigate(['/dashboard/dashboard1']);
                      break;
                    case 'Curriculistas':
                      this.router.navigate(['/dashboard/dashboard1']);
                      break;
                    case 'Coordinador':
                      this.router.navigate(['/dashboard/dashboard1']);
                      break;
                    case 'Administrador':
                      this.router.navigate(['/dashboard/dashboard1']);
                      break;
                    default:
                      this.router.navigate(['/dashboard/dashboard1']);
                      break;
                  }
                } else {
                  this.error = 'Login invalido';
                  this.submitted = false;
                  this.loading = false;
                }
              } else {
                this.error = 'Login invalido';
                this.submitted = false;
                this.loading = false;
              }
            } else {
              this.error = 'Invalid Login';
              this.submitted = false;
              this.loading = false;
            }
          },
          error: (error) => {
            this.error = error;
            this.submitted = false;
            this.loading = false;
          },
        });
    }
  }
}
