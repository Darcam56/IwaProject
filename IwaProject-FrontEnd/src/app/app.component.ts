import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from './auth/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'IwaProject-FrontEnd';

  roles: string[];
  authority: string;

  constructor(private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.roles = this.tokenStorage.getAuthorities();
      this.roles.every(role => {
        if (role === 'ROLE_ORG') {
          this.authority = 'org';
          return false;
        }
        if (role === 'ROLE_BOND') {
          this.authority = 'band';
          return false;
        }
        if (role === 'ROLE_SPEC') {
          this.authority = 'spec';
          return false;
        }
        this.authority = 'admin';
        return true;
      });
    }
  }
}
