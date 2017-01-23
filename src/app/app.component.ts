import {Component, ViewChild} from '@angular/core';
import {Platform, NavController} from 'ionic-angular';
import {LoadingPage} from "../pages/loading/loading";
import {Model} from "../providers/services/model.service";
import {ProfilePage} from "../pages/profile/profile";


@Component({
  templateUrl: 'app.html'
})
export class AtpWebApp {
  @ViewChild('content') nav: NavController;
  rootPage = LoadingPage;

  constructor(platform: Platform, public model: Model) {
    platform.ready().then(() => {
    });
  }

  showProfilePage() {
    this.nav.push(ProfilePage);
  }
}
