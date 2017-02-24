import {Component} from "@angular/core";
import {Webuser} from "../../providers/domain/webuser.model";
import {UserService} from "../../providers/services/user.service";
import {ModalController} from "ionic-angular";
import {UserDetailPage} from "./user-detail.component";

@Component({
  templateUrl: 'users.component.html'
})
export class UsersPage {

  users: Webuser[];

  constructor(public userService: UserService,
              public modalCtrl: ModalController) {
    this.userService.listUsers().subscribe(data => this.users = data);
  }

  showUserDetail(user: Webuser) {
    this.modalCtrl.create(UserDetailPage, {user: user}).present();
  }
}
