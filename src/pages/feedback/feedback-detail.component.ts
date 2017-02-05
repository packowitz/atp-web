import {Component} from "@angular/core";
import {NavParams, ViewController} from "ionic-angular";
import {FeedbackConversation} from "../../providers/domain/feedback-conversation.model";
import {FeedbackService} from "../../providers/services/feedback.service";
import {Feedback} from "../../providers/domain/feedback.model";

@Component({
  templateUrl: 'feedback-detail.component.html'
})
export class FeedbackDetailPage {

  feedback: Feedback;
  conversation: FeedbackConversation;
  newAnswer: string;

  constructor(public navParams: NavParams,
              public viewCtrl: ViewController,
              public feedbackService: FeedbackService) {
    this.feedback = navParams.get('feedback');
    this.feedbackService.getConversation(this.feedback.id).subscribe(data => this.conversation = data);
  }

  close() {
    this.viewCtrl.dismiss();
  }

  sendAnswer(close: boolean) {
    this.feedbackService.sendFeedbackAnswer(this.conversation.feedback.id, this.newAnswer, close).subscribe(
      data => {
        Feedback.update(this.conversation.feedback, data);
        Feedback.update(this.feedback, data);
        this.close();
      }
    );
  }

}
