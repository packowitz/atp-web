import {Component} from '@angular/core';
import {Survey} from "../shared/domain/survey.component";
import {SurveyService} from "../services/survey.service";

@Component({
    templateUrl: './myAtpList.html'
})
export class MyATPsListPage {
    surveys: Survey[];

    constructor(private surveyService: SurveyService) {
        surveyService.listMySurveys().subscribe(data => this.surveys = data);
    }
}
