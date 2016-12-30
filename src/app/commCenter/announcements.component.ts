import {Component, PipeTransform, Pipe, trigger, state, style, transition, animate} from '@angular/core';
import {Country} from "../shared/domain/country.component";
import {CountryService} from "../services/country.service";
import {Announcement} from "../shared/domain/announcement.component";
import {CommCenterService} from "../services/commCenter.service";
import {Util} from "../services/util.service";
import {NotificationService} from "../services/notification.service";

@Pipe({name: 'countrySplit'})
export class CountrySplitPipe implements PipeTransform {
  allCountries: Country[];

  constructor(private countryService: CountryService) {
    countryService.getCountries().subscribe(countries => this.allCountries = countries);
  }

  transform(value, args: string[]): Country[] {
    let countries = [];
    value.split(",").forEach(
      countryCode => {
        if (this.allCountries) {
          this.allCountries.forEach(
            aCountry => {
              if (countryCode == aCountry.alpha3) {
                countries.push(aCountry);
              }
            }
          );
        } else {
          countries.push({alpha3: countryCode, nameEng: ''});
        }
      }
    );
    return countries;
  }
}

@Component({
  templateUrl: './announcements.html',
  animations: [
    trigger('modalState', [
      state('visible', style({
        opacity: 1
      })),
      transition('void => visible', animate('300ms ease-in')),
      transition('visible => void', animate('100ms ease-out'))
    ])
  ]
})
export class AnnouncementsPage {
  announcements: Announcement[];
  showModal: boolean = false;
  newAnnounce: Announcement = new Announcement();
  newAnnounceCountries: Country[] = [];
  allCountries: Country[];
  addedCountry = "default";

  constructor(private ccService: CommCenterService,
              private countryService: CountryService,
              private util: Util,
              private notificationService: NotificationService) {
    countryService.getCountries().subscribe(countries => this.allCountries = countries);
    ccService.listAnnouncements().subscribe(data => this.announcements = data);
  }

  deleteAnnouncement(announcement: Announcement) {
    if(window.confirm("Are you sure to delete this announcement?")) {
      this.ccService.deleteAnnouncement(announcement).subscribe(
        () => {
          let idx = this.announcements.indexOf(announcement);
          if(idx >= 0) {
            this.announcements.splice(idx, 1);
          }
          this.notificationService.showSuccess("Announcement deleted")
        }
      );
    }
  }

  addCountry(country) {
    if (this.newAnnounceCountries.indexOf(country) == -1) {
      this.newAnnounceCountries.push(country);
    }
  }

  removeCountry(country) {
    let index = this.newAnnounceCountries.indexOf(country);
    if (index != -1) {
      this.newAnnounceCountries.splice(index, 1);
    }
  }

  sendNewAnnouncement() {
    this.newAnnounce.countries = this.util.countriesToString(this.newAnnounceCountries);
    this.ccService.postAnnouncement(this.newAnnounce).subscribe(
      announcement => {
        this.notificationService.showSuccess("Announcement successful published");
        this.showModal = false;
        this.announcements.unshift(announcement);
        this.newAnnounce = new Announcement();
        this.newAnnounceCountries = [];
        this.addedCountry = "default";
      }
    );
  }
}
