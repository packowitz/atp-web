import {Component, Input, ViewChild} from "@angular/core";
import {NavController, ItemSliding} from "ionic-angular";
import {Util} from "../services/util.service";
import {Survey} from "../domain/survey.model";
import {SurveyService} from "../services/survey.service";
import {NotificationService} from "../services/notification.service";
import {LocalStorage} from "../services/local-storage.service";
import {AgeRange} from "../domain/age-range.model";
import {Model} from "../services/model.service";

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

  ageRanges: AgeRange[];
  deleted: boolean = false;

  constructor(public nav: NavController,
              public surveyService: SurveyService,
              public notificationService: NotificationService,
              public localStorage: LocalStorage,
              public util: Util,
              public model: Model) {
  }

  loadAgeRanges() {
    this.ageRanges = [];
    this.model.ageRanges.forEach(r => {
      if(this.survey['age_' + r.id]) this.ageRanges.push(r);
    });
  }

  getAgeRangeDescription(): string {
    if(!this.ageRanges) {
      this.loadAgeRanges();
    }
    if(this.ageRanges.length == this.model.ageRanges.length) return 'no restriction';
    if(this.ageRanges.length == 1) return this.ageRanges[0].description;
    return this.ageRanges.length + " age groups";
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
          this.localStorage.deleteSurvey(this.survey);
          this.deleted = true;
          this.notificationService.showDefaultToast("ATP deleted")
        }
      );
    }
  }

  copy(survey: Survey) {}
}
