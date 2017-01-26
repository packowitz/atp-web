import {Component, ViewChild} from '@angular/core';
import {Platform, NavController} from 'ionic-angular';
import {LoadingPage} from "../pages/loading/loading";
import {Model} from "../providers/services/model.service";
import {ProfilePage} from "../pages/profile/profile";
import {FeedbackPage} from "../pages/feedback/feedback";
import {AnnouncementPage} from "../pages/announcement/announcement";


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
    this.nav.push(AnnouncementPage);
  }
}
