import {Component} from "@angular/core";
import {FeedbackService} from "../../providers/services/feedback.service";
import {NavParams, NavController, ModalController} from "ionic-angular";
import {Feedback} from "../../providers/domain/feedback.model";
import {Util} from "../../providers/services/util.service";
import {FeedbackDetailPage} from "./feedback-detail.component";

@Component({
  templateUrl: 'feedback.component.html'
})
export class FeedbackPage {

  type: string;
  status: string;
  name: string;

  feedbackList: Feedback[];

  constructor(public navParams: NavParams,
              public feedbackService: FeedbackService,
              public util: Util,
              public nav: NavController,
              public modalCtrl: ModalController) {
    this.type = navParams.get('type');
    this.status = navParams.get('status');
    if(this.type == 'IMPROVEMENT') {
      this.name = "Improvements";
    } else if(this.type == 'BUG_REPORT') {
      this.name = "Bugs";
    } else if(this.type == 'MESSAGE_SUGGESTION') {
      this.name = "Message suggestions";
    } else if(this.type == 'OTHER') {
      this.name = "Other feedback";
    }
    this.feedbackService.listFeedback(this.type, this.status).subscribe(list => {
      this.feedbackList = list;
    });
  }

  showOpen() {
    this.nav.push(FeedbackPage, {type: this.type, status: 'OPEN'});
  }

  showAnswered() {
    this.nav.push(FeedbackPage, {type: this.type, status: 'ANSWERED'});
  }

  showClosed() {
    this.nav.push(FeedbackPage, {type: this.type, status: 'CLOSED'});
  }

  showFeedbackDetail(feedback: Feedback) {
    this.modalCtrl.create(FeedbackDetailPage, {feedback: feedback}).present();
  }
}
