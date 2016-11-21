import {Component, Input} from "@angular/core";
import {Survey} from "../shared/domain/survey.component";
import {Country} from "../shared/domain/country.component";
import {Util} from "../services/util.service";
import {CountryService} from "../services/country.service";
import {SurveyService} from "../services/survey.service";
import {NotificationService} from "../services/notification.service";
import {Model} from "../shared/model.component";
import {SurveyType} from "../shared/domain/surveyType.component";

declare var Croppie: any;

@Component({
  selector: 'create-atp',
  templateUrl: './createAtp.html'
})
export class CreateAtp {
  @Input()
  security: boolean;
  @Input()
  multiPicture: boolean;

  survey: Survey;
  croppie: any;
  croppiePicNumber: number;
  allCountries: Country[];
  selectedCountries: Country[] = [];
  addedCountry = "default";
  surveyType: SurveyType;
  multiPictures: string[] = [];
  numberOfATPsToCreate: number = 1;
  eachCountrySeparate: boolean = false;

  constructor(private util: Util,
              private model: Model,
              private countryService: CountryService,
              private surveyService: SurveyService,
              private notificationService: NotificationService) {
    if(this.security) {
      this.multiPicture = false;
    }
    this.clearSurvey();
    countryService.getCountries().subscribe(
      countries => {
        this.allCountries = countries;
        let rememberedSurvey = surveyService.getRememberedSurvey();
        if (rememberedSurvey) {
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
    this.multiPictures = [];
    this.surveyType = this.model.surveyTypes[0];
  }

  recalculateNumberOfATPsToCreate() {
    if(this.multiPicture) {
      let multiplier = 1;
      console.log("recalculate");
      console.log("number of pictures: " + this.multiPictures.length);
      if(this.multiPictures.length >= 3) {
        multiplier = (this.multiPictures.length * (this.multiPictures.length - 1)) / 2;
      }
      console.log("each country: " + this.eachCountrySeparate);
      if(this.eachCountrySeparate) {
        if(this.selectedCountries.length == 0) {
          multiplier = multiplier * this.allCountries.length;
        } else {
          multiplier = multiplier * this.selectedCountries.length;
        }
      }
      console.log("new multiplier = " + multiplier);
      this.numberOfATPsToCreate = multiplier;
    } else {
      this.numberOfATPsToCreate = 1;
    }
  }

  openFileDialog(picNumber?: number) {
    if(picNumber) {
      this.croppiePicNumber = picNumber;
    }
    document.getElementById('security-new-file-selection').click();
  }

  setPicture() {
    if (this.croppie) {
      this.croppie.result({
        type: 'canvas',
        size: 'viewport',
        format: 'jpeg',
        quality: 0.5
      }).then(data => {
        let picBase64 = data.substring(data.indexOf(",") + 1);
        if(this.multiPicture) {
          this.multiPictures.push(picBase64);
          this.recalculateNumberOfATPsToCreate();
        } else {
          if (this.croppiePicNumber == 1) {
            this.survey.pic1 = picBase64;
          } else {
            this.survey.pic2 = picBase64;
          }
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
    if (w > maxWidth || h > maxHeight) {
      let ratio = w / h;
      if (w > maxWidth) {
        w = maxWidth;
        h = w / ratio;
      }
      if (h > maxHeight) {
        h = maxHeight;
        w = h * ratio;
      }
    }
    this.destroyCroppie();
    this.croppie = new Croppie(document.getElementById('security-new-croppie'), {
      viewport: {width: 300, height: 300},
      boundary: {width: w, height: h},
      enableOrientation: true
    });
    this.croppie.bind({url: src});
  }

  rotateLeft() {
    if(this.croppie) {
      this.croppie.rotate(-90);
    }
  }

  rotateRight() {
    if(this.croppie) {
      this.croppie.rotate(90);
    }
  }

  destroyCroppie() {
    if (this.croppie) {
      this.croppie.destroy();
      this.croppie = null;
      let fileInput: any = document.getElementById('security-new-file-selection');
      fileInput.value = '';
    }
  }

  addCountry(country) {
    if (this.selectedCountries.indexOf(country) == -1) {
      this.selectedCountries.push(country);
      this.recalculateNumberOfATPsToCreate();
    }
  }

  removeCountry(country) {
    let index = this.selectedCountries.indexOf(country);
    if (index != -1) {
      this.selectedCountries.splice(index, 1);
      this.recalculateNumberOfATPsToCreate();
    }
  }

  toggleEachCountrySeparate() {
    this.eachCountrySeparate = !this.eachCountrySeparate;
    this.recalculateNumberOfATPsToCreate();
  }

  surveyValid(): boolean {
    if(this.multiPicture) {
      return this.multiPictures.length >= 3 && this.model.webuser.credits >= (this.surveyType.costs * this.numberOfATPsToCreate);
    } else {
      if(this.security) {
        return !!this.survey.pic1 && !!this.survey.pic2 && !!this.survey.expectedAnswer;
      } else {
        return !!this.survey.pic1 && !!this.survey.pic2 && this.model.webuser.credits >= this.surveyType.costs;
      }
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
    if(this.multiPicture) {
      this.surveyService.createMultiPictureSurvey(this.survey, this.surveyType, this.multiPictures, this.eachCountrySeparate).subscribe(
        () => {
          this.notificationService.showSuccess("Multi Picture ATP successful created");
          this.clearSurvey();
        }
      );
    } else {
      this.surveyService.createSurvey(this.survey).subscribe(
        data => {
          this.notificationService.showSuccess("ATP successful created");
          this.clearSurvey();
        }
      );
    }

  }
}
