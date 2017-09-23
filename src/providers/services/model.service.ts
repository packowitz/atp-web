import {Injectable} from "@angular/core";
import {Webuser} from "../domain/webuser.model";
import {UserRights} from "../domain/user-rights.model";
import {SurveyType} from "../domain/survey-type.model";
import {AgeRange} from "../domain/age-range.model";

@Injectable()
export class Model {
  //public static server: string = "http://localhost:8080";
  public static server: string = "https://api.askthepeople.io";
  public webuser: Webuser;
  public userRights: UserRights;
  public surveyTypes: SurveyType[] = [];
  public ageRanges: AgeRange[] = [];

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
    this.ageRanges = [
      {id: 1, name: 'Child', name_plural: 'Children', description: 'Children under 10'},
      {id: 2, name: 'Pre teen', name_plural: 'Pre teens', description: 'Pre teens (10-12)'},
      {id: 3, name: 'Young teen', name_plural: 'Young teens', description: 'Young teens (13-15)'},
      {id: 4, name: 'Teenager', name_plural: 'Teenager', description: 'Teenager (16-17)'},
      {id: 5, name: 'Senior teen', name_plural: 'Senior teens', description: 'Senior teens (18-21)'},
      {id: 6, name: 'Young adult', name_plural: 'Young adults', description: 'Young adults (22-29)'},
      {id: 7, name: 'Adult', name_plural: 'Adults', description: 'Adults (30-39)'},
      {id: 8, name: 'Senior adult', name_plural: 'Senior adults', description: 'Senior adults (40-55)'},
      {id: 9, name: 'Elderly', name_plural: 'Elderly', description: 'Elderly 56+'}
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
