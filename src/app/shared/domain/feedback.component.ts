import {Webuser} from "./webuser.component";
import {FeedbackConversation} from "./feedbackConversation.component";
import {FeedbackAnswer} from "./feedbackAnswer.component";

export class Feedback {
    id: number;
    type: string;
    status: string;
    sendDate: string;
    lastActionDate: string;
    title: string;
    message: string;
    answers: number;
    showDetails: boolean = false;
    user: Webuser;
    feedbackAnswers: FeedbackAnswer[];
    newMessage: string;

    static update(original: Feedback, conversation: FeedbackConversation) {
        original.status = conversation.feedback.status;
        original.lastActionDate = conversation.feedback.lastActionDate;
        original.answers = conversation.feedback.answers;
        original.user = conversation.user;
        original.feedbackAnswers = conversation.answers;
    }
}