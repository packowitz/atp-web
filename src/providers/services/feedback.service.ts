import {AtpHttp} from "./atpHttp.service";
import {Injectable} from "@angular/core";
import {Model} from "./model.service";
import {Observable} from "rxjs";
import {Feedback} from "../domain/feedback";

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
    return this.atpHttp.doGet("/web/app/cc/list/feedback/" + type + "/" + status, "Loading Feedback");
  }

}
