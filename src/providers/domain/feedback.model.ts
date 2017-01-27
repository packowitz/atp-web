import {Webuser} from "./webuser.model";
import {FeedbackAnswer} from "./feedback-answer.model";
import {FeedbackConversation} from "./feedback-conversation.model";

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
