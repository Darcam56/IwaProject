import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
/*import {SignupInfoBand} from '../auth/signup-info-band';
import {SignupInfoFestGoer} from '../auth/signup-info-fest-goer';
import {SignupInfoFestAdmin} from '../auth/signup-info-festAdmin';*/

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
  form: any = {};
  /*signupInfoBand: SignupInfoBand;
  signupInfoOrg: SignupInfoFestAdmin;
  signupInfoSpec: SignupInfoFestGoer;*/
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

  /*onSubmitBand() {
    console.log(this.form);

    this.signupInfoBand = new SignupInfoBand(
      this.form.username,
      this.form.password,
      this.form.name,
      this.form.musicType,
      this.form.desc);

    this.authService.signUpBand(this.signupInfoBand).subscribe(
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
    );
  }

  onSubmitSpec() {
    console.log(this.form);

    this.signupInfoSpec = new SignupInfoFestGoer(
      this.form.username,
      this.form.password,
      this.form.firstname,
      this.form.lastname);

    this.authService.signUpSpec(this.signupInfoSpec).subscribe(
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
    );
  }

  onSubmitOrg() {
    console.log(this.form);

    this.signupInfoOrg = new SignupInfoFestAdmin(
      this.form.username,
      this.form.password);

    this.authService.signUpOrg(this.signupInfoOrg).subscribe(
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
    );
  }*/

}
