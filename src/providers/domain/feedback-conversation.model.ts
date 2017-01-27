import {Webuser} from "./webuser.model";
import {Feedback} from "./feedback.model";
import {FeedbackAnswer} from "./feedback-answer.model";

export class FeedbackConversation {
    user: Webuser;
    feedback: Feedback;
    answers: FeedbackAnswer[];
}
