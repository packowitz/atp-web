import {Http, Headers} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {Injectable} from "@angular/core";
import {Survey} from "../shared/domain/survey.component";
import {LocalStorage} from "../shared/localStorage.component";
import {environment} from "../../environments/environment";

@Injectable()
export class SurveyService {

    surveyCache: Survey = null;

    constructor(public http:Http, private localStorage: LocalStorage) {}

    remeberSurvey(survey: Survey) {
        this.surveyCache = survey;
    }

    getRememberedSurvey(): Survey {
        let remember = this.surveyCache;
        this.surveyCache = null;
        return remember;
    }

    postSecuritySurvey(survey: Survey): Observable<Survey> {
        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + this.localStorage.getToken());
        headers.append('Content-Type', 'application/json');
        return this.http.post(environment.server + "/web/app/survey/security", JSON.stringify(survey), {headers: headers}).map(res => res.json());
    }

    listSecuritySurveys(): Observable<Survey[]> {
        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + this.localStorage.getToken());
        return this.http.get(environment.server + "/web/app/survey/security/list", {headers: headers}).map(res => res.json());
    }

    activateSurvey(survey: Survey): Observable<Survey> {
        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + this.localStorage.getToken());
        headers.append('Content-Type', 'application/json');
        return this.http.put(environment.server + "/web/app/survey/security/activate/" + survey.id, JSON.stringify({}), {headers: headers}).map(res => res.json());
    }

    deactivateSurvey(survey: Survey): Observable<Survey> {
        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + this.localStorage.getToken());
        headers.append('Content-Type', 'application/json');
        return this.http.put(environment.server + "/web/app/survey/security/deactivate/" + survey.id, JSON.stringify({}), {headers: headers}).map(res => res.json());
    }

    deleteSurvey(survey: Survey): Observable<Boolean> {
        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + this.localStorage.getToken());
        return this.http.delete(environment.server + "/web/app/survey/security/" + survey.id, {headers: headers}).map(() => true);
    }

    listMySurveys(): Observable<Survey[]> {
        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + this.localStorage.getToken());
        return this.http.get(environment.server + "/web/app/survey/list", {headers: headers}).map(res => res.json());
    }

    createSurvey(survey: Survey): Observable<Survey> {
        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + this.localStorage.getToken());
        headers.append('Content-Type', 'application/json');
        return this.http.post(environment.server + "/web/app/survey", JSON.stringify(survey), {headers: headers}).map(res => res.json());
    }
}
