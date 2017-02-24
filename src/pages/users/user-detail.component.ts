import {Component} from "@angular/core";
import {Webuser} from "../../providers/domain/webuser.model";
import {UserService} from "../../providers/services/user.service";
import {NavParams, ViewController, AlertController} from "ionic-angular";
import {UserRights} from "../../providers/domain/user-rights.model";
import {Model} from "../../providers/services/model.service";

@Component({
  templateUrl: 'user-detail.component.html'
})
export class UserDetailPage {

  user: Webuser;
  userRights: UserRights;
  thisYear: number;

  constructor(public navParams: NavParams,
              public viewCtrl: ViewController,
              public userService: UserService,
              public model: Model,
              public alertCtrl: AlertController) {
    this.user = navParams.get('user');
    this.thisYear = new Date().getFullYear();
    if(this.user.emailConfirmed) {
      this.userService.getUserRights(this.user.id).subscribe(data => this.userRights = data);
    }
  }

  close() {
    this.viewCtrl.dismiss();
  }

  toggleCallcenterRight() {
    if(this.model.userRights.userAdmin) {
      this.userRights.callcenter = !this.userRights.callcenter;
      this.userService.updateUserRights(this.user.id, this.userRights).subscribe(data => this.userRights = data);
    }
  }

  infoCallcenter(event: Event) {
    event.stopPropagation();
    this.alertCtrl.create({title: 'Callcenter right', message: 'This right allows the user to read and answer users feedback.'}).present();
  }

  toggleMarketingRight() {
    if(this.model.userRights.userAdmin) {
      this.userRights.marketing = !this.userRights.marketing;
      this.userService.updateUserRights(this.user.id, this.userRights).subscribe(data => this.userRights = data);
    }
  }

  infoMarketing(event: Event) {
    event.stopPropagation();
    this.alertCtrl.create({title: 'Marketing right', message: 'This right allows the user to write and delete announcements.'}).present();
  }

  toggleUserAdminRight() {
    if(this.model.userRights.userAdmin) {
      this.userRights.userAdmin = !this.userRights.userAdmin;
      this.userService.updateUserRights(this.user.id, this.userRights).subscribe(data => this.userRights = data);
    }
  }

  infoUserAdmin(event: Event) {
    event.stopPropagation();
    this.alertCtrl.create({title: 'User admin right', message: 'This right allows the user to administrate users. It allows to see users and to give and take away user rights.'}).present();
  }

  toggleSecurityRight() {
    if(this.model.userRights.userAdmin) {
      this.userRights.security = !this.userRights.security;
      this.userService.updateUserRights(this.user.id, this.userRights).subscribe(data => this.userRights = data);
    }
  }

  infoSecurity(event: Event) {
    event.stopPropagation();
    this.alertCtrl.create({title: 'Security right', message: 'This right allows the user to create and delete security ATPs.'}).present();
  }

  toggleCouponRight() {
    if(this.model.userRights.userAdmin) {
      this.userRights.coupons = !this.userRights.coupons;
      this.userService.updateUserRights(this.user.id, this.userRights).subscribe(data => this.userRights = data);
    }
  }

  infoCoupons(event: Event) {
    event.stopPropagation();
    this.alertCtrl.create({title: 'Coupons right', message: 'This right allows the user to see and generate coupons.'}).present();
  }

  toggleResearchRight() {
    if(this.model.userRights.userAdmin) {
      this.userRights.research = !this.userRights.research;
      this.userService.updateUserRights(this.user.id, this.userRights).subscribe(data => this.userRights = data);
    }
  }

  infoResearch(event: Event) {
    event.stopPropagation();
    this.alertCtrl.create({title: 'Research right', message: 'This right allows the user to create permanent ATPs.'}).present();
  }
}
