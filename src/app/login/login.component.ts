import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {LocalStorage} from "../shared/localStorage.component";
import {Model} from "../shared/model.component";

@Component({
  templateUrl: './login.html'
})
export class LoginComponent {
  email: string;
  password: string;
  resolvingToken: boolean = false;

  constructor(private router: Router,
              private authService: AuthService,
              private localStorage: LocalStorage,
              private model: Model) {}

  ngAfterViewInit() {
    if(this.localStorage.getToken()) {
      this.resolvingToken = true;
      this.authService.resolveWebuser().subscribe(
        data => {
          this.model.webuser = data.webuser;
          this.model.userRights = data.userRights;
          this.resolvingToken = false;
          this.router.navigateByUrl(this.authService.redirectUrl);
        },
        error => {
          console.error(error);
          this.resolvingToken = false;
        }
      );
    }
  }

  doLogin() {
    if(this.email && this.email.length > 4 && this.password && this.password.length > 0) {
      this.authService.login(this.email, this.password).subscribe(
        data => {
          this.localStorage.setToken(data.token);
          this.model.webuser = data.webuser;
          this.model.userRights = data.userRights;
          this.router.navigateByUrl(this.authService.redirectUrl);
        },
        error => {
          console.log("Error while login:");
          console.log(error);
        }
      );
    }
  }
}
