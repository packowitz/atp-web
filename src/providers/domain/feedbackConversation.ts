import {Webuser} from "./webuser";
import {Feedback} from "./feedback";
import {FeedbackAnswer} from "./feedbackAnswer";

export class FeedbackConversation {
    user: Webuser;
    feedback: Feedback;
    answers: FeedbackAnswer[];
}
