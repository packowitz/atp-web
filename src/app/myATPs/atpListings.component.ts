import {Component, Input} from "@angular/core";
import {Router} from "@angular/router";
import {Survey} from "../shared/domain/survey.component";
import {SurveyService} from "../services/survey.service";
import {NotificationService} from "../services/notification.service";
import {Util} from "../services/util.service";

@Component({
    selector: 'atp-listings',
    templateUrl: './atpListings.html'
})
export class AtpListings {
    @Input()
    surveys: Survey[];
    markedSurveyId: number = 0;

    constructor(private surveyService: SurveyService,
                private notificationService: NotificationService,
                private router: Router,
                private util: Util) {}

    markSurvey(survey: Survey) {
        if(this.markedSurveyId == survey.id) {
            this.markedSurveyId = null;
        } else {
            this.markedSurveyId = survey.id;
        }
    }

    finishSurvey(survey: Survey) {
        this.surveyService.deactivateSurvey(survey).subscribe(
            data => {
                survey.status = data.status;
                survey.answered = data.answered;
                survey.pic1Count = data.pic1Count;
                survey.pic2Count = data.pic2Count;
                survey.noOpinionCount = data.noOpinionCount;
            }
        );
    }

    activateSurvey(survey: Survey) {
        this.surveyService.activateSurvey(survey).subscribe(
            data => {
                survey.status = data.status;
                survey.answered = data.answered;
                survey.pic1Count = data.pic1Count;
                survey.pic2Count = data.pic2Count;
                survey.noOpinionCount = data.noOpinionCount;
            }
        );
    }

    deleteSurvey(survey: Survey) {
        if(window.confirm("Are you sure to delete this security ATP?")) {
            this.surveyService.deleteSurvey(survey).subscribe(
                () => {
                    let idx = this.surveys.indexOf(survey);
                    if(idx >= 0) {
                        this.surveys.splice(idx, 1);
                    }
                    this.notificationService.showSuccess("Security ATP deleted")
                }
            );
        }
    }

    tweakSurvey(survey: Survey) {
        this.surveyService.remeberSurvey(survey);
        this.router.navigateByUrl('/atps/securityNew');
    }
}
