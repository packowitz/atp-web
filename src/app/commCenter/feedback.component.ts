import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Feedback} from "../shared/domain/feedback.component";
import {Model} from "../shared/model.component";
import {CommCenterService} from "../services/commCenter.service";
import {Util} from "../services/util.service";
import {NotificationService} from "../services/notification.service";

@Component({
    templateUrl: './feedbackList.html'
})
export class FeedbackPage {
    type: string;
    name: string;
    status: string;
    feedbackList: Feedback[] = [];

    constructor(private model: Model,
                private ccService: CommCenterService,
                private util: Util,
                private route: ActivatedRoute,
                private notificationservice: NotificationService) {
    }

    ngOnInit() {
        this.route.data.subscribe(
            (data: any) => {
                this.type = data.type;
                this.name = data.name;
                this.status = data.status;
                this.ccService.listFeedback(this.type, this.status).subscribe(list => this.feedbackList = list);
            }
        );
    }

    clickOnFeedback(feedback: Feedback) {
        if(feedback.showDetails) {
            feedback.showDetails = false;
            feedback.user = undefined;
            feedback.feedbackAnswers = undefined;
        } else {
            feedback.showDetails = true;
            this.ccService.getConversation(feedback.id).subscribe(
                conversation => {
                    Feedback.update(feedback, conversation);
                }
            );
        }
    }

    sendAnswer(feedback: Feedback, close: boolean) {
        this.ccService.sendFeedbackAnswer(feedback.id, feedback.newMessage, close).subscribe(
            data => {
                this.notificationservice.showSuccess("Answer successful send");
                if(feedback.status == data.status) {
                    feedback.newMessage = '';
                    feedback.showDetails = false;
                    Feedback.update(feedback, {feedback: data, user: undefined, answers: undefined});
                } else {
                    let index = this.feedbackList.indexOf(feedback);
                    this.feedbackList.splice(index, 1);
                }
            }
        );
    }
}
