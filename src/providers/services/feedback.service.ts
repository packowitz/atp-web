import {AtpHttp} from "./atp-http.service";
import {Injectable} from "@angular/core";
import {Model} from "./model.service";
import {Observable} from "rxjs/Observable";
import {Feedback} from "../domain/feedback.model";
import {FeedbackConversation} from "../domain/feedback-conversation.model";

@Injectable()
export class FeedbackService {
  constructor(public atpHttp: AtpHttp,
              public model: Model) {
  }

  enableUpdateOpenFeedbackInterval() {
    this.updateOpenFeedback();
    setInterval(() => this.updateOpenFeedback(), 120000);
  }

  updateOpenFeedback() {
    this.atpHttp.doGetBackground("/web/app/cc/open-count").subscribe(
      data => {
        this.model.openImprovements = data.IMPROVEMENT;
        this.model.openBugs = data.BUG_REPORT;
        this.model.openMessages = data.MESSAGE_SUGGESTION;
        this.model.openKudos = data.KUDOS;
        this.model.openOthers = data.OTHER;
      }
    );
  }

  listFeedback(type: string, status: string): Observable<Feedback[]> {
    return this.atpHttp.doGet("/web/app/cc/list/feedback/" + type + "/" + status, "loading feedback");
  }

  getConversation(id: number): Observable<FeedbackConversation> {
    return this.atpHttp.doGet("/web/app/cc/conversation/" + id, "loading details");
  }

  sendFeedbackAnswer(id: number, message: string, close: boolean): Observable<Feedback> {
    let answer = {
      feedbackId: id,
      message: message,
      close: close
    };
    return this.atpHttp.doPost("/web/app/cc/feedback/answer", answer, "sending answer");
  }

}
