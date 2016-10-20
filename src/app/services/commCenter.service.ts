import {Http, Headers} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {Injectable} from "@angular/core";
import {LocalStorage} from "../shared/localStorage.component";
import {CcModel} from "../commCenter/ccModel.component";
import {Feedback} from "../shared/domain/feedback.component";
import {FeedbackConversation} from "../shared/domain/feedbackConversation.component";
import {Announcement} from "../shared/domain/announcement.component";
import {environment} from "../../environments/environment";

@Injectable()
export class CommCenterService {
    constructor(private http: Http, private localStorage: LocalStorage, private ccModel: CcModel) {}

    refreshOpenFeedbackcount() {
        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + this.localStorage.getToken());
        this.http.get(environment.server + "/web/app/cc/open-count", {headers: headers}).map(res => res.json()).subscribe(
          (data: any) => {
                this.ccModel.openImprovements = data.IMPROVEMENT;
                this.ccModel.openBugs = data.BUG_REPORT;
                this.ccModel.openMessages = data.MESSAGE_SUGGESTION;
                this.ccModel.openKudos = data.KUDOS;
                this.ccModel.openOthers = data.OTHER;
            }
        );
    }

    listFeedback(type: string, status: string): Observable<Feedback[]> {
        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + this.localStorage.getToken());
        return this.http.get(environment.server + "/web/app/cc/list/feedback/" + type + "/" + status, {headers: headers}).map(res => res.json());
    }

    getConversation(id: number): Observable<FeedbackConversation> {
        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + this.localStorage.getToken());
        return this.http.get(environment.server + "/web/app/cc/conversation/" + id, {headers: headers}).map(res => res.json());
    }

    sendFeedbackAnswer(id: number, message: string, close: boolean): Observable<Feedback> {
        let answer = {
            feedbackId: id,
            message: message,
            close: close
        };
        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + this.localStorage.getToken());
        headers.append('Content-Type', 'application/json');
        return this.http.post(environment.server + "/web/app/cc/feedback/answer", JSON.stringify(answer), {headers: headers}).map(res => res.json());
    }

    listAnnouncements(): Observable<Announcement[]> {
        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + this.localStorage.getToken());
        return this.http.get(environment.server + "/web/app/cc/announcement/list" + status, {headers: headers}).map(res => res.json());
    }

    postAnnouncement(announce: Announcement): Observable<Announcement> {
        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + this.localStorage.getToken());
        headers.append('Content-Type', 'application/json');
        return this.http.post(environment.server + "/web/app/cc/announcement", JSON.stringify(announce), {headers: headers}).map(res => res.json());

    }
}
