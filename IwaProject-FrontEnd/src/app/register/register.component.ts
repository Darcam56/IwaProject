import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {SignupInfoBand} from 'src/app/auth/signup-info-band';
import {SignupInfoSpec} from 'src/app/auth/signup-info-spec';
import {SignupInfoOrg} from 'src/app/auth/signup-info-org';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  signupInfoBand: SignupInfoBand;
  signupInfoOrg: SignupInfoOrg;
  signupInfoSpec: SignupInfoSpec;
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';

  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6)
  ]);

  usernameFormControl = new FormControl('', [
    Validators.required
  ]);

  matcher = new MyErrorStateMatcher();

  constructor(/*private authService: AuthService*/) {}

  ngOnInit(): void {
  }

  onSubmitBand(usr: string, pwd: string, name: string, mt: string, desc: string) {

    this.signupInfoBand = new SignupInfoBand(usr, pwd, name, mt, desc);

    /*this.authService.signUpBand(this.signupInfoBand).subscribe(
      data => {
        console.log(data);
        this.isSignedUp = true;
        this.isSignUpFailed = false;
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isSignUpFailed = true;
      }
    );*/
  }

  onSubmitSpec(usr: string, pwd: string, firstname: string, lastname: string) {

    this.signupInfoSpec = new SignupInfoSpec(usr, pwd, firstname, lastname);

    /*this.authService.signUpSpec(this.signupInfoSpec).subscribe(
      data => {
        console.log(data);
        this.isSignedUp = true;
        this.isSignUpFailed = false;
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isSignUpFailed = true;
      }
    );*/
  }

  onSubmitOrg(usr: string, pwd: string) {

    this.signupInfoOrg = new SignupInfoOrg(usr, pwd);

    /*this.authService.signUpOrg(this.signupInfoOrg).subscribe(
      data => {
        console.log(data);
        this.isSignedUp = true;
        this.isSignUpFailed = false;
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isSignUpFailed = true;
      }
    );*/
  }
}
