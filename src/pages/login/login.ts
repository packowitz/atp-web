import {Component} from '@angular/core';
import {UserService} from "../../providers/services/user.service";
import {LocalStorage} from "../../providers/services/localStorage.service";
import {Model} from "../../providers/services/model.service";
import {NavController} from "ionic-angular";
import {LoadingPage} from "../loading/loading";

@Component({
  templateUrl: './login.html'
})
export class LoginPage {
  email: string;
  password: string;

  constructor(public userService: UserService,
              public localStorage: LocalStorage,
              public model: Model,
              public nav: NavController) {}

  doLogin() {
    if(this.email && this.email.length > 4 && this.password && this.password.length > 0) {
      this.userService.login(this.email, this.password).subscribe(
        data => {
          this.localStorage.setToken(data.token);
          this.model.webuser = data.webuser;
          this.model.userRights = data.userRights;
          this.nav.setRoot(LoadingPage);
        }
      );
    }
  }
}
