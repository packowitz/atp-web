import {Component} from '@angular/core';
import {Survey} from "../shared/domain/survey.component";
import {SurveyService} from "../services/survey.service";

@Component({
    templateUrl: './myAtpList.html'
})
export class MyATPsSecurityListPage {

    surveys: Survey[];

    constructor(private surveyService: SurveyService) {
        surveyService.listSecuritySurveys().subscribe(data => this.surveys = data);
    }
}
