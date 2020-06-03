export class SignupInfoFestGoer {
  username: string;
  role: string[];
  password: string;
  firstname: string;
  lastname: string;

  constructor(username: string, password: string, firstname: string, lastname: string) {
    this.username = username;
    this.role = ['org'];
    this.password = password;
    this.firstname = firstname;
    this.lastname = lastname;
  }
}
