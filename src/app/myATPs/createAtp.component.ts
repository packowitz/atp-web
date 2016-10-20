import {Component, Input} from "@angular/core";
import {Survey} from "../shared/domain/survey.component";
import {Country} from "../shared/domain/country.component";
import {Util} from "../services/util.service";
import {CountryService} from "../services/country.service";
import {SurveyService} from "../services/survey.service";
import {NotificationService} from "../services/notification.service";

declare var Croppie: any;

@Component({
    selector: 'create-atp',
    templateUrl: './createAtp.html'
})
export class CreateAtp {
    @Input()
    security: boolean;
    survey: Survey;
    croppie: any;
    allCountries: Country[];
    selectedCountries: Country[] = [];
    addedCountry = "default";

    constructor(private util: Util,
                private countryService: CountryService,
                private surveyService: SurveyService,
                private notificationService: NotificationService) {
        this.clearSurvey();
        countryService.getCountries().subscribe(
            countries => {
                this.allCountries = countries;
                let rememberedSurvey = surveyService.getRememberedSurvey();
                if(rememberedSurvey) {
                    this.survey.pic1 = rememberedSurvey.pic1;
                    this.survey.pic2 = rememberedSurvey.pic2;
                    this.survey.expectedAnswer = rememberedSurvey.expectedAnswer;
                    this.survey.title = rememberedSurvey.title;
                    this.survey.male = rememberedSurvey.male;
                    this.survey.female = rememberedSurvey.female;
                    this.survey.minAge = rememberedSurvey.minAge;
                    this.survey.maxAge = rememberedSurvey.maxAge;
                    this.selectedCountries = util.countriesFromString(rememberedSurvey.countries, this.allCountries);
                }
            }
        );
    }

    clearSurvey() {
        this.survey = new Survey();
        this.survey.male = true;
        this.survey.female = true;
        this.survey.minAge = 1;
        this.survey.maxAge = 99;
        this.selectedCountries = [];
        this.addedCountry = "default";
    }

    openFileDialog() {
        document.getElementById('security-new-file-selection').click();
    }

    setPicture(first: boolean) {
        if(this.croppie) {
            this.croppie.result({
                type: 'canvas',
                size: 'viewport',
                format: 'jpeg',
                quality: 0.5
            }).then(data => {
                if(first) {
                    this.survey.pic1 = data.substring(data.indexOf(",") + 1);
                } else {
                    this.survey.pic2 = data.substring(data.indexOf(",") + 1);
                }
                this.destroyCroppie();
            });
        }
    }

    fileChangeEvent(event: any) {
        if (event.target.files && event.target.files[0]) {
            let that = this;

            let img = new Image();
            img.onload = function () {
                that.showCroppie(this.width, this.height, this.src);
            };
            var reader = new FileReader();
            reader.onload = function (e: any) {
                img.src = e.target.result;
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    }

    showCroppie(width: number, height: number, src: string) {
        let w = width, h = height, maxWidth = window.innerWidth * 0.75, maxHeight = window.innerHeight * 0.75;
        if(w > maxWidth || h > maxHeight) {
            let ratio = w / h;
            if(w > maxWidth) {
                w = maxWidth;
                h = w  / ratio;
            }
            if(h > maxHeight) {
                h = maxHeight;
                w = h * ratio;
            }
        }
        this.destroyCroppie();
        this.croppie = new Croppie(document.getElementById('security-new-croppie'), {
            viewport: {width: 300, height: 300},
            boundary: {width: w, height: h}
        });
        this.croppie.bind({url: src});
    }

    destroyCroppie() {
        if(this.croppie) {
            this.croppie.destroy();
            this.croppie = null;
            let fileInput: any = document.getElementById('security-new-file-selection');
            fileInput.value = '';
        }
    }

    addCountry(country) {
        if(this.selectedCountries.indexOf(country) == -1) {
            this.selectedCountries.push(country);
        }
    }

    removeCountry(country) {
        let index = this.selectedCountries.indexOf(country);
        if(index != -1) {
            this.selectedCountries.splice(index, 1);
        }
    }

    createSecurityAtp() {
        this.survey.countries = this.util.countriesToString(this.selectedCountries);
        this.surveyService.postSecuritySurvey(this.survey).subscribe(
            data => {
                this.notificationService.showSuccess("Security ATP successful created");
                this.clearSurvey();
            }
        );
    }

    createAtp() {
        this.survey.countries = this.util.countriesToString(this.selectedCountries);
        this.surveyService.postSecuritySurvey(this.survey).subscribe(
            data => {
                this.notificationService.showSuccess("ATP successful created");
                this.clearSurvey();
            }
        );
    }
}
