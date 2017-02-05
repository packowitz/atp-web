import {Country} from "../domain/country.model";
import {CountryService} from "../services/country.service";
import {PipeTransform, Pipe} from "@angular/core";

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
