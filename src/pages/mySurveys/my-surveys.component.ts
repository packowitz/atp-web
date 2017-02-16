import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {SurveyService} from "../../providers/services/survey.service";
import {CreateSurveyPage} from "../createSurvey/create-survey.component";
import {LocalStorage} from "../../providers/services/local-storage.service";
import {Util} from "../../providers/services/util.service";

@Component({
  templateUrl: 'my-surveys.component.html'
})
export class MySurveysPage {

  constructor(public surveyService: SurveyService,
              public nav: NavController,
              public localStorage: LocalStorage,
              public util: Util) {
  }

  ionViewDidEnter() {
    if(this.localStorage.updateTimestamp) {
      this.surveyService.updateMySurveys();
    } else {
      this.surveyService.getMySurveys().subscribe(
        data => {
          this.localStorage.setMySurveys(data);
        }
      );
    }
  }

  createSurvey() {
    this.nav.push(CreateSurveyPage);
  }

  openMultiPictureSurveyDetails() {

  }

}
