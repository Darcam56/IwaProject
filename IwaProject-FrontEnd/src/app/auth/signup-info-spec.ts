export class SignupInfoSpec {
  username: string;
  role: string[];
  password: string;
  firstname: string;
  lastname: string;

  constructor(username: string, password: string, firstname: string, lastname: string) {
    this.username = username;
    this.role = ['spec'];
    this.password = password;
    this.firstname = firstname;
    this.lastname = lastname;
  }
}
