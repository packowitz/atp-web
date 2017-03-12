import {Component} from "@angular/core";
import {ViewController} from "ionic-angular";
import {UserService} from "../../providers/services/user.service";
import {NotificationService} from "../../providers/services/notification.service";

@Component({
  templateUrl: 'register-closed-beta.component.html'
})
export class RegisterClosedBetaPage {

  gmail: string;
  appleId: string;
  finding: string;

  constructor(public viewCtrl: ViewController,
              public userService: UserService,
              public notificationService: NotificationService) {
  }

  close() {
    this.viewCtrl.dismiss();
  }

  register() {
    this.userService.registerForBeta(this.gmail, this.appleId, this.finding).subscribe(
      data => {
        this.notificationService.showDefaultToast("Thank you for registering for closed BETA");
        this.close();
      }
    );
  }

}
