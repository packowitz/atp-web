import {Component} from "@angular/core";
import {NavParams, PopoverController, AlertController, NavController} from "ionic-angular";
import {Survey} from "../../providers/domain/survey.model";
import {Model} from "../../providers/services/model.service";
import {SurveyType} from "../../providers/domain/survey-type.model";
import {CountrySelectionPopover} from "../countrySelection/countrySelection.component";
import {NotificationService} from "../../providers/services/notification.service";
import {SurveyService} from "../../providers/services/survey.service";
import {CountryService} from "../../providers/services/country.service";
import {LocalStorage} from "../../providers/services/local-storage.service";

declare var Croppie: any;

@Component({
  templateUrl: 'create-survey.component.html'
})
export class CreateSurveyPage {
  security: boolean;

  survey: Survey;
  surveyType: SurveyType;
  countries: string[];
  eachCountrySeparate: boolean;
  numberOfAllCountries: number;
  ageRange = {lower: 1, upper: 99};
  exampleText: string;
  pictures: string[];
  croppie: any;
  numberOfSurveys: number;
  permanentAtp: boolean;

  constructor(public model: Model,
              public surveyService: SurveyService,
              public navParams: NavParams,
              public nav: NavController,
              public notificationService: NotificationService,
              public popoverController: PopoverController,
              public alertController: AlertController,
              public countryService: CountryService,
              public localStorage: LocalStorage) {
    this.security = navParams.get('security') === true;
    this.countryService.getCountries().subscribe(countries => this.numberOfAllCountries = countries.length);
    this.createEmptySurvey();
  }

  createEmptySurvey() {
    this.surveyType = this.security ? {key: 'SECURITY', name: 'security', answers: 0, costs: 0} : this.model.surveyTypes[0];
    this.exampleText = this.getStartAtpExampleMsg();
    this.pictures = [];
    this.numberOfSurveys = 1;
    this.survey = new Survey();
    this.survey.daysBetween = 7;
    this.countries = [];
    this.survey.male = true;
    this.survey.female = true;
    this.ageRange.lower = 5;
    this.ageRange.upper = 99;
    this.eachCountrySeparate = false;
    this.permanentAtp = false;
  }

  openFileDialog() {
    document.getElementById('create-survey-file-selection').click();
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
    this.croppie = new Croppie(document.getElementById('create-survey-croppie'), {
      viewport: {width: 300, height: 300},
      boundary: {width: w, height: h},
      enableOrientation: true
    });
    this.croppie.bind({url: src});
  }

  destroyCroppie() {
    if(this.croppie) {
      this.croppie.destroy();
      this.croppie = null;
    }
  }

  saveCroppedPicture() {
    if(this.croppie) {
      this.croppie.result({
        type: 'canvas',
        size: 'viewport',
        format: 'jpeg',
        quality: 0.5
      }).then(data => {
        this.pictures.push(data.substring(data.indexOf(",") + 1));
        this.recalculateNumberOfSurveys();
        this.destroyCroppie();
      });
    }
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

  deletePicture(index: number) {
    this.pictures.splice(index, 1);
    this.recalculateNumberOfSurveys();
  }

  recalculateNumberOfSurveys() {
    if(!this.permanentAtp) {
      let multiplier = 1;
      if(this.eachCountrySeparate) {
        multiplier = this.countries.length == 0 ? this.numberOfAllCountries : this.countries.length;
      }
      if (this.pictures.length <= 2) {
        this.numberOfSurveys = multiplier;
      } else {
        this.numberOfSurveys = multiplier * ((this.pictures.length * (this.pictures.length - 1)) / 2);
      }
    } else {
      this.numberOfSurveys = 0;
    }
  }

  changeGender(event: Event) {
    if (this.survey.male && this.survey.female) {
      this.survey.male = false;
    } else if(this.survey.male) {
      this.survey.female = true;
    } else {
      this.survey.male = true;
      this.survey.female = false;
    }
    event.preventDefault();
  }

  addCountry(event: Event) {
    event.preventDefault();
    let countrySelection = this.popoverController.create(CountrySelectionPopover, {callback: country => {
      if (this.countries.indexOf(country.alpha3) == -1) {
        this.countries.push(country.alpha3);
        this.countries.sort();
        this.recalculateNumberOfSurveys();
      }
      countrySelection.dismiss();
    }});
    countrySelection.present();
  }

  removeCountry(country: string) {
    let idx = this.countries.indexOf(country);
    if(idx != -1) {
      this.countries.splice(idx,1);
      this.recalculateNumberOfSurveys();
    }
  }

  changeSurveyType(event: Event) {
    event.preventDefault();
    if(!this.security) {
      for(let i=0; i < this.model.surveyTypes.length; i++) {
        if(this.model.surveyTypes[i].key == this.surveyType.key) {
          let nextIdx = i + 1;
          if(this.model.surveyTypes.length == nextIdx) {
            nextIdx = 0;
          }
          this.surveyType = this.model.surveyTypes[nextIdx];
          return;
        }
      }
    }
  }

  showMultiPictureHint() {
    this.alertController.create({
      title: '2+ pictures',
      message: 'If you choose more than 2 pictures then this will lead to an ATP for each combination.',
      buttons: [
        {text: 'OK'}
      ]
    }).present();
  }

  showPermanentSurveyHint() {
    this.alertController.create({
      title: 'Permanent ATP',
      message: 'Permanent ATPs are active as long as you wish. You can select how often a user is allowed to answer this ATP again. This is a free service as long as ATP is in beta.',
      buttons: [
        {text: 'OK'}
      ]
    }).present();
  }

  surveyComplete(): boolean {
    return this.pictures.length >= 2 && this.model.webuser.credits >= (this.numberOfSurveys * this.surveyType.costs);
  }

  public startSurvey() {
    this.survey.minAge = this.ageRange.lower;
    this.survey.maxAge = this.ageRange.upper;
    this.survey.countries = "";
    if(this.countries.length > 0) {
      this.countries.forEach(c => {
        if(this.survey.countries != "") {
          this.survey.countries += ",";
        }
        this.survey.countries += c;
      });
    } else {
      this.survey.countries = "ALL";
    }
    let type: SurveyType = this.permanentAtp ? {key: 'PERMANENT', name: 'permanent', answers: 0, costs: 0} : this.surveyType;
    this.surveyService.createSurvey(this.survey, type, this.pictures, this.eachCountrySeparate).subscribe(resp => {
      console.log("ATP started");
      this.localStorage.addSurveys(resp);
      this.notificationService.showDefaultToast(this.security ? 'Security ATP started' : 'ATP started');
      this.createEmptySurvey();
      this.nav.pop();
    });
  }

  getStartAtpExampleMsg(): string {
    let messages: Array<string> = [
      "Best haircut?",
      "Best looking?",
      "Color?",
      "Shape?",
      "Tastes better?",
      "Which is funnier?"
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  }

  toNumber(event): number {
    return +event;
  }
}
