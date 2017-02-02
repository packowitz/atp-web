import {Component} from "@angular/core";
import {Survey} from "../../providers/domain/survey.model";
import {SurveyService} from "../../providers/services/survey.service";

@Component({
  templateUrl: 'security-surveys.component.html'
})
export class SecuritySurveyPage {
  surveys: Survey[];

  constructor(private surveyService: SurveyService) {
    surveyService.listSecuritySurveys().subscribe(data => this.surveys = data);
  }
}
