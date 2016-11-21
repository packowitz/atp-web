import {Injectable} from "@angular/core";
import {Webuser} from "./domain/webuser.component";
import {UserRights} from "./domain/userRights.component";
import {SurveyType} from "./domain/surveyType.component";

@Injectable()
export class Model {
  public webuser: Webuser;
  public userRights: UserRights;
  public surveyTypes: SurveyType[] = [];


  constructor() {
    this.surveyTypes = [
      {key: 'NUMBER100', name: 'Quick Check', answers: 100, costs: 1000},
      {key: 'NUMBER300', name: 'Reliable Check', answers: 300, costs: 2900},
      {key: 'NUMBER1000', name: 'Research Check', answers: 1000, costs: 9000}
    ];
  }
}
