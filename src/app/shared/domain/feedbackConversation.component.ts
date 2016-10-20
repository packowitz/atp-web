import {Webuser} from "./webuser.component";
import {FeedbackAnswer} from "./feedbackAnswer.component";
import {Feedback} from "./feedback.component";

export class FeedbackConversation {
    user: Webuser;
    feedback: Feedback;
    answers: FeedbackAnswer[];
}