import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { TeacherService } from 'app/teaching-management/services/teacher.service';
import { RequestServicesService } from 'app/intranet-academic-registration/Services/request-services.service';
import { AuthService } from '@core';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  authForm!: UntypedFormGroup;
  submitted = false;
  returnUrl!: string;
  hide = true;
  chide = true;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private _RequestServicesService: RequestServicesService,
    public _user: AuthService
  ) { }
  ngOnInit() {
    this.authForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      password: ['', Validators.required],
      cpassword: ['', Validators.required],
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  get f() {
    return this.authForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.authForm.invalid) {
      return;
    } else {
      // /dashboard/dashboard - student
      let type = this._RequestServicesService.getRoleFromToken(this._user.currentUserValue.token);
      console.log(type);
      console.log("......................");
      alert();

      if (type == 'Profesor') {
        this.router.navigate(['/dashboard/dashboard-student']);
      } else {
        this.router.navigate(['/admin/dashboard/main']);
      }
    }
  }
}
