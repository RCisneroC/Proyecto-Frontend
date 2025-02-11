import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "@core";
import { PasswordValidator } from 'app/CallsTeachers/models/PasswordValidator';
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
  passwordValidations: any = {};
  showPasswordCriteria=false;
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
        [Validators.required,PasswordValidator.strongPasswordValidator()],
      ],
      rppassword: [
        '',
        [Validators.required,Validators.minLength(8)],
      ],
    });

    this.route.params.subscribe((params) => {
      this.token = params['token'];
      this.email = params['email'];
    })
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    
     
    
        const newPasswordControl = this.authForm.get('password');
        newPasswordControl?.valueChanges.subscribe((value: string) => {
          const validationResult = PasswordValidator.strongPasswordValidator()(newPasswordControl);
          this.passwordValidations = validationResult ? validationResult['passwordStrength'] : {
            hasUpperCase: /[A-Z]/.test(value),
            hasLowerCase: /[a-z]/.test(value),
            hasNumeric: /[0-9]/.test(value),
            hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(value),
            isValidLength: value.length >= 8
          };
        });
  }
  get f() {
    return this.authForm.controls;
  }
  
  hasInvalidCriteria(): boolean {
    return !this.passwordValidations.hasUpperCase || !this.passwordValidations.hasLowerCase || !this.passwordValidations.hasNumeric || !this.passwordValidations.hasSpecial || !this.passwordValidations.isValidLength;
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
