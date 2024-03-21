import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "@core";
import Swal from "sweetalert2";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  authForm!: UntypedFormGroup;
  submitted = false;
  returnUrl!: string;
  token: string = "";
  email:string = "";
  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}
  ngOnInit() {
    this.authForm = this.formBuilder.group({
      password: [
        '',
        [Validators.required,Validators.minLength(6)],
      ],
      rppassword: [
        '',
        [Validators.required,Validators.minLength(6)],
      ],
    });

    this.route.params.subscribe((params) => {
      this.token = params['token'];
      this.email = params['email'];
    })
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  get f() {
    return this.authForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if(this.authForm.getRawValue().password == this.authForm.getRawValue().rppassword){

      if (this.authForm.invalid) {
        return;
      } else {
        this.authService.ConfirmResetPassword(this.email, this.token,this.authForm.getRawValue().password,this.authForm.getRawValue().rppassword).subscribe({
          next:(res)=>{
            if(res.statusCode == 200){
              this.router.navigate(['/authentication/signin']);
            }
            else {
              Swal.fire({
                title: "Escuela Judicial",
                text: 'Intente nuevamente algo fallo',
                icon: "warning"
              });
            }
          }
        })

      }

    }
    else {
      Swal.fire({
        title: "Escuela Judicial",
        text: 'Las contraseñas deben ser iguales',
        icon: "warning"
      });
    }
  }
}
