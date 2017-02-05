import {Component} from "@angular/core";
import {Announcement} from "../../providers/domain/announcement.model";
import {AnnouncementService} from "../../providers/services/announcement.service";
import {ViewController} from "ionic-angular";
import {Country} from "../../providers/domain/country.model";
import {CountryService} from "../../providers/services/country.service";
import {Util} from "../../providers/services/util.service";

@Component({
  templateUrl: 'create-announcement.component.html'
})
export class CreateAnnouncementPage {

  announcement: Announcement;
  allCountries: Country[];
  selectedCountries: Country[];

  constructor(public announcementService: AnnouncementService,
              public viewCtrl: ViewController,
              public countryService: CountryService,
              public util: Util) {
    countryService.getCountries().subscribe(countries => this.allCountries = countries);
    this.announcement = new Announcement();
    this.selectedCountries = [];
  }

  close() {
    this.viewCtrl.dismiss();
  }

  postAnnouncement() {
    if(this.selectedCountries.length == this.allCountries.length) {
      this.announcement.countries = "ALL";
    } else {
      this.announcement.countries = this.util.countriesToString(this.selectedCountries);
    }
    this.announcementService.postAnnouncement(this.announcement).subscribe(
      announcement => {
        this.viewCtrl.dismiss(announcement);
      }
    );
  }

}
