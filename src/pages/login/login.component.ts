import {Component} from '@angular/core';
import {UserService} from "../../providers/services/user.service";
import {LocalStorage} from "../../providers/services/local-storage.service";
import {Model} from "../../providers/services/model.service";
import {NavController, ModalController} from "ionic-angular";
import {LoadingPage} from "../loading/loading.component";
import {RegisterClosedBetaPage} from "./register-closed-beta.component";

@Component({
  templateUrl: 'login.component.html'
})
export class LoginPage {
  email: string;
  password: string;

  constructor(public userService: UserService,
              public localStorage: LocalStorage,
              public model: Model,
              public nav: NavController,
              public modalCtrl: ModalController) {}

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

  showRegisterClosedBeta() {
    this.modalCtrl.create(RegisterClosedBetaPage).present();
  }
}
