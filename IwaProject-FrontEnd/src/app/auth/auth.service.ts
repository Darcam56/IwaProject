import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LoginInfo} from './login-info';
import {Observable} from 'rxjs';
import {JwtResponse} from './jwt-response';
import {SignupInfoFestAdmin} from './signup-info-festAdmin';
import {SignupInfoBand} from './signup-info-band';
import {SignupInfoFestGoer} from './signup-info-fest-goer';

const httpOptions = {
  headers: new HttpHeaders({'COntent-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl = 'http://localhost:8080/auth/signin';
  private signupUrl = 'http://localhost:8080/auth/signup';

  constructor(private http: HttpClient) { }

  attemptAuth(credentials: LoginInfo): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.loginUrl, credentials, httpOptions);
  }

  signUpBand(info: SignupInfoBand): Observable<string> {
    return this.http.post<string>(this.signupUrl += '/band', info, httpOptions);
  }

  signUpSpec(info: SignupInfoFestGoer): Observable<string> {
    return this.http.post<string>(this.signupUrl += '/spec', info, httpOptions);
  }

  signUpOrg(info: SignupInfoFestAdmin): Observable<string> {
    return this.http.post<string>(this.signupUrl += '/org', info, httpOptions);
  }
}
