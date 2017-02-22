import {Component} from "@angular/core";
import {Webuser} from "../../providers/domain/webuser.model";
import {UserService} from "../../providers/services/user.service";

@Component({
  templateUrl: 'users.component.html'
})
export class UsersPage {

  users: Webuser[];

  constructor(public userService: UserService) {
    this.userService.listUsers().subscribe(data => this.users = data);
  }
}
