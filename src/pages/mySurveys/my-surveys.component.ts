import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {SurveyService} from "../../providers/services/survey.service";
import {CreateSurveyPage} from "../createSurvey/create-survey.component";
import {LocalStorage} from "../../providers/services/local-storage.service";
import {Util} from "../../providers/services/util.service";
import {Model} from "../../providers/services/model.service";
import {Survey} from "../../providers/domain/survey.model";

@Component({
  templateUrl: 'my-surveys.component.html'
})
export class MySurveysPage {

  constructor(public surveyService: SurveyService,
              public nav: NavController,
              public localStorage: LocalStorage,
              public util: Util,
              public model: Model) {
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

  getAgeRangeDescription(survey: Survey): string {
    let ageRanges = [];
    this.model.ageRanges.forEach(r => {
      if(survey['age_' + r.id]) ageRanges.push(r);
    });
    if(ageRanges.length == this.model.ageRanges.length) return 'no restriction';
    if(ageRanges.length == 1) return ageRanges[0].description;
    return ageRanges.length + " age groups";
  }

  createSurvey() {
    this.nav.push(CreateSurveyPage);
  }

  openMultiPictureSurveyDetails() {

  }

}
