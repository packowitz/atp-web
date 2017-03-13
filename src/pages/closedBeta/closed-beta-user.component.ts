import {Component} from "@angular/core";
import {ClosedBetaUser} from "../../providers/domain/closed-beta-user.model";
import {NotificationService} from "../../providers/services/notification.service";
import {UserService} from "../../providers/services/user.service";
import {Util} from "../../providers/services/util.service";

@Component({
  templateUrl: 'closed-beta-user.component.html'
})
export class ClosedBetaUserPage {
  betaUsers: ClosedBetaUser[];

  constructor(public userService: UserService,
              public util: Util,
              public notificationService: NotificationService) {
    this.userService.listBetaUsers().subscribe(data => this.betaUsers = data);
  }

  sendAndroidInvite(id: number) {
    this.userService.sendAndroidInvite(id).subscribe(data => {
      let existingUser = this.betaUsers.find(betaUser => betaUser.id == data.id);
      if(existingUser) {
        existingUser.gmailSendDate = data.gmailSendDate;
      }
      this.notificationService.showDefaultToast("Android invite sent");
    });
  }

}
