export class SignupInfoBand {
  username: string;
  role: string[];
  password: string;
  name: string;
  musicType: string;
  desc: string;

  constructor(username: string, password: string, name: string, musicType: string, desc: string) {
    this.username = username;
    this.role = ['band'];
    this.password = password;
    this.name = name;
    this.musicType = musicType;
    this.desc = desc;
  }
}
