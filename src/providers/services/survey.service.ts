import {AtpHttp} from "./atp-http.service";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Survey} from "../domain/survey.model";
import {SurveyType} from "../domain/survey-type.model";

@Injectable()
export class SurveyService {
  constructor(private atpHttp: AtpHttp) {
  }

  listSecuritySurveys(): Observable<Survey[]> {
    return this.atpHttp.doGet("/web/app/survey/security/list", "loading security ATPs");
  }

  activateSurvey(survey: Survey): Observable<Survey> {
    return this.atpHttp.doPut("/web/app/survey/security/activate/" + survey.id, {}, "activating ATP");
  }

  deactivateSurvey(survey: Survey): Observable<Survey> {
    return this.atpHttp.doPut("/web/app/survey/security/deactivate/" + survey.id, {}, "deactivating ATP");
  }

  deleteSurvey(survey: Survey): Observable<any> {
    return this.atpHttp.doDelete("/web/app/survey/security/" + survey.id, "deleting ATP");
  }

  createSurvey(survey: Survey, type: SurveyType, pictures: string[], eachCountrySeparate: boolean): Observable<Survey[]> {
    return this.atpHttp.doPost("/web/app/survey", {survey: survey, type: type.key, pictures: pictures, eachCountrySeparate: eachCountrySeparate}, "creating ATP");
  }
}
