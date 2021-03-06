import {Component} from "@angular/core";
import {NavParams, AlertController} from "ionic-angular/index";
import {Country} from "../../providers/domain/country.model";
import {CountryService} from "../../providers/services/country.service";

@Component({
  template: `
<ion-list class="country-selection">
    <ion-list-header>Choose a country</ion-list-header>
    <ion-item *ngFor="let country of countries" (click)="callback(country)">
        <img src="assets/img/flags/{{country.alpha3}}.png" class="flag">{{country.nameEng}}
    </ion-item>
</ion-list>`,
  styles: [`
    .country-selection{
        max-height: 60vh;
    }
    .button-inner {
        justify-content: flex-start;
    }
    .flag {
        height: 1.2em;
        vertical-align: bottom;
        margin-right: 3vw;
        border: 1px black solid;
    }`]
})

export class CountrySelectionPopover{
  countries: Country[];
  callback;

  constructor(public countryService: CountryService,
              public navParams: NavParams,
              public alertController: AlertController) {
    this.loadCountries();
    this.callback = navParams.get('callback');
  }

  loadCountries() {
    this.countryService.getCountries().subscribe(data => {
      this.countries = data;
    }, err => {
      this.alertController.create({
        title: 'Network Error',
        message: 'There was a network error!',
        buttons: [{
          text: 'Retry',
          handler: () => {
            this.loadCountries();
          }
        }]
      }).present();
    });
  }
}
