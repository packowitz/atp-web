import {AtpHttp} from "./atp-http.service";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Survey} from "../domain/survey.model";

@Injectable()
export class SurveyService {
  constructor(private atpHttp: AtpHttp) {
  }

  listSecuritySurveys(): Observable<Survey[]> {
    return this.atpHttp.doGet("/web/app/survey/security/list", "loading security ATPs");
  }
}
