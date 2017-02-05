import {Injectable} from "@angular/core";
import {Webuser} from "../domain/webuser.model";
import {UserRights} from "../domain/user-rights.model";
import {SurveyType} from "../domain/survey-type.model";

@Injectable()
export class Model {
  public static server: string = "http://localhost:8080";
  //public static server: string = "http://api.askthepeople.io";
  public webuser: Webuser;
  public userRights: UserRights;
  public surveyTypes: SurveyType[] = [];

  public openImprovements: number = 0;
  public openBugs: number = 0;
  public openMessages: number = 0;
  public openKudos: number = 0;
  public openOthers: number = 0;


  constructor() {
    this.surveyTypes = [
      {key: 'NUMBER100', name: 'Quick Check', answers: 100, costs: 1000},
      {key: 'NUMBER300', name: 'Reliable Check', answers: 300, costs: 2900},
      {key: 'NUMBER1000', name: 'Research Check', answers: 1000, costs: 9000}
    ];
  }

  public isAdmin(): boolean {
    return this.userRights.callcenter ||
      this.userRights.marketing ||
      this.userRights.userAdmin ||
      this.userRights.security ||
      this.userRights.coupons;
  }
}
