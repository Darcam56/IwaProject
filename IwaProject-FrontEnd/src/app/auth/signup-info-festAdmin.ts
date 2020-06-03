export class SignupInfoFestAdmin {

  username: string;
  role: string[];
  password: string;

  constructor(username: string, password: string) {
    this.username = username;
    this.role = ['org'];
    this.password = password;
  }
}
