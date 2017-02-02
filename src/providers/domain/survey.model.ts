import {Answer} from "./survey-answer.model";

export class Survey {
  id: number;
  type: string;
  status: string;
  title: string;
  groupId: number;
  multiPicture: boolean;
  pic1: string;
  pic1_id: number;
  pic2: string;
  pic2_id: number;
  minAge: number;
  maxAge: number;
  countries: string;
  male: boolean;
  female: boolean;
  answered: number;
  noOpinionCount: number;
  pic1Count: number;
  pic2Count: number;
  abuseCount: number;
  startedDate: string;
  expectedAnswer: number;

  answers: Answer[];
}
