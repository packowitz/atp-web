import {AtpHttp} from "./atp-http.service";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Survey} from "../domain/survey.model";
import {SurveyType} from "../domain/survey-type.model";
import {LocalStorage} from "./local-storage.service";

export class SurveyListWithTimestamp {
  data: Survey[];
  timestamp: number;
}

@Injectable()
export class SurveyService {
  constructor(public atpHttp: AtpHttp, public localStorage: LocalStorage) {
  }

  getMySurveys(): Observable<SurveyListWithTimestamp> {
    return this.atpHttp.doGet("/web/app/survey/own/list", "loading ATPs");
  }

  getUpdatesForMySurveysSince(timestamp: number): Observable<SurveyListWithTimestamp> {
    return this.atpHttp.doGet("/web/app/survey/own/updates/since/" + timestamp, "updating ATPs");
  }

  updateMySurveys() {
    this.getUpdatesForMySurveysSince(this.localStorage.updateTimestamp).subscribe(
      data => {
        let unknownSurveys: number[] = this.localStorage.updateMySurveys(data);
        console.log("Updated " + data.data.length + " surveys");
        if(unknownSurveys.length > 0) {
          this.getMySurveysByIds(unknownSurveys).subscribe(
            data => {
              this.localStorage.addSurveys(data);
              console.log("Loaded " + data.length + " new surveys");
            }
          );
        }
      }
    );
  }

  getMySurveysByIds(ids: number[]): Observable<Survey[]> {
    let idString = ids.join(',');
    return this.atpHttp.doGetBackground("/web/app/survey/own/list/byids/" + idString);
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
    return this.atpHttp.doDelete("/web/app/survey/" + survey.id, "deleting ATP");
  }

  createSurvey(survey: Survey, type: SurveyType, pictures: string[], eachCountrySeparate: boolean): Observable<Survey[]> {
    return this.atpHttp.doPost("/web/app/survey", {survey: survey, type: type.key, pictures: pictures, eachCountrySeparate: eachCountrySeparate}, "creating ATP");
  }
}
