import {Component} from "@angular/core";
import {Survey} from "../../providers/domain/survey.model";
import {SurveyService} from "../../providers/services/survey.service";
import {NavController} from "ionic-angular";
import {CreateSurveyPage} from "../createSurvey/create-survey.component";

@Component({
  templateUrl: 'security-surveys.component.html'
})
export class SecuritySurveyPage {
  surveys: Survey[];

  constructor(private surveyService: SurveyService,
              public nav: NavController) {
  }

  ionViewDidEnter() {
    this.surveyService.listSecuritySurveys().subscribe(data => this.surveys = data);
  }

  createSecuritySurvey() {
    this.nav.push(CreateSurveyPage, {security: true});
  }
}
