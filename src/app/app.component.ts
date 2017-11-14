import {Component, ViewChild} from '@angular/core';
import {Platform, NavController} from 'ionic-angular';
import {LoadingPage} from "../pages/loading/loading.component";
import {Model} from "../providers/services/model.service";
import {ProfilePage} from "../pages/profile/profile.component";
import {FeedbackPage} from "../pages/feedback/feedback.component";
import {AnnouncementsPage} from "../pages/announcements/announcements.component";
import {CouponsPage} from "../pages/coupons/coupons.component";
import {SecuritySurveyPage} from "../pages/securitySurveys/security-surveys.component";
import {MySurveysPage} from "../pages/mySurveys/my-surveys.component";
import {UsersPage} from "../pages/users/users.component";
import {ClosedBetaUserPage} from "../pages/closedBeta/closed-beta-user.component";
import {LocalStorage} from "../providers/services/local-storage.service";


@Component({
  templateUrl: 'app.component.html'
})
export class AtpWebApp {
  @ViewChild('content') nav: NavController;
  rootPage = LoadingPage;

  constructor(platform: Platform, public model: Model, public localStorage: LocalStorage) {
    platform.ready().then(() => {
    });
  }

  logout() {
    this.localStorage.clearStorage();
    location.reload();
  }

  showProfilePage() {
    this.nav.push(ProfilePage);
  }

  showImprovements() {
    this.nav.push(FeedbackPage, {type: 'IMPROVEMENT', status: 'OPEN'});
  }

  showBugs() {
    this.nav.push(FeedbackPage, {type: 'BUG_REPORT', status: 'OPEN'});
  }

  showMessageSuggestions() {
    this.nav.push(FeedbackPage, {type: 'MESSAGE_SUGGESTION', status: 'OPEN'});
  }

  showOtherFeedback() {
    this.nav.push(FeedbackPage, {type: 'OTHER', status: 'OPEN'});
  }

  showAnnouncements() {
    this.nav.push(AnnouncementsPage);
  }

  showCoupons() {
    this.nav.push(CouponsPage);
  }

  showSecurityAtps() {
    this.nav.push(SecuritySurveyPage);
  }

  showMyAtps() {
    this.nav.push(MySurveysPage);
  }

  showUsers() {
    this.nav.push(UsersPage);
  }

  showBetaUsers() {
    this.nav.push(ClosedBetaUserPage);
  }
}
