import {Component, Input, ViewChild} from "@angular/core";
import {NavController, ItemSliding} from "ionic-angular";
import {Util} from "../services/util.service";
import {Survey} from "../domain/survey.model";
import {SurveyService} from "../services/survey.service";
import {NotificationService} from "../services/notification.service";

@Component({
  selector: 'single-survey-bar',
  templateUrl: 'single-survey-bar.component.html'
})
export class SingleSurveyBar {
  @ViewChild('slidingItem')
  slidingItem: ItemSliding
  @Input()
  survey: Survey;
  @Input()
  showAttributes: boolean;

  deleted: boolean = false;

  constructor(public nav: NavController,
              public surveyService: SurveyService,
              public notificationService: NotificationService,
              public util: Util) {
  }

  openSurveyDetails() {
    if(this.survey.id) {
      //this.nav.push(SurveyDetailsComponent, {surveyId: this.surveyId});
    }
  }

  deactivate() {
    this.surveyService.deactivateSurvey(this.survey).subscribe(
      data => {
        this.survey.status = data.status;
        this.survey.answered = data.answered;
        this.survey.pic1Count = data.pic1Count;
        this.survey.pic2Count = data.pic2Count;
        this.survey.noOpinionCount = data.noOpinionCount;
        this.slidingItem.close();
      }
    );
  }

  activate() {
    this.surveyService.activateSurvey(this.survey).subscribe(
      data => {
        this.survey.status = data.status;
        this.survey.answered = data.answered;
        this.survey.pic1Count = data.pic1Count;
        this.survey.pic2Count = data.pic2Count;
        this.survey.noOpinionCount = data.noOpinionCount;
        this.slidingItem.close();
      }
    );
  }

  delete() {
    if(window.confirm("Are you sure to delete this security ATP?")) {
      this.surveyService.deleteSurvey(this.survey).subscribe(
        () => {
          this.deleted = true;
          this.notificationService.showDefaultToast("ATP deleted")
        }
      );
    }
  }

  copy(survey: Survey) {}
}
