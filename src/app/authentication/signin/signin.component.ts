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
      this.authService
        .login(this.f['email'].value, this.f['password'].value)
        .subscribe({
          next: (res) => {
            if (res) {
              if (res) {
                const token = this.authService.currentUserValue.token

                if (token) {
                  let type = this._RequestServicesService.getRoleFromToken(token);

                  if (type == 'Estudiante') {
                    this.router.navigate(['/dashboard/dashboard-student']);
                  } else {
                    this.router.navigate(['/dashboard/dashboard1']);
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
