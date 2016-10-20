import {Injectable} from "@angular/core";
import {Country} from "../shared/domain/country.component";

@Injectable()
export class Util {

    getTimeDiff(date: string) {
        let surveyStarted: number = new Date(Date.parse(date)).getTime();
        let diffInMin = Math.round((new Date().getTime() - surveyStarted) / 60000);
        if(diffInMin < 60) {
            return diffInMin + " min";
        }
        if(diffInMin < 1440) {
            return Math.round(diffInMin / 60) + " hours";
        }
        return Math.round(diffInMin / 1440) + " days";
    }

    countriesToString(countries: Country[]): string {
        let asString = "";
        if(countries.length > 0) {
            countries.forEach(country => {
                if(asString != "") {
                    asString += ",";
                }
                asString += country.alpha3;
            });
        } else {
            asString = "ALL";
        }
        return asString;
    }

    countriesFromString(countries: string, allCountries: Country[]): Country[] {
        let c: Country[] = [];
        if(countries != 'ALL') {
            let split: string[] = countries.split(',');
            split.forEach(
                country => {
                    allCountries.forEach(
                        aCountry => {
                            if(country == aCountry.alpha3) {
                                c.push(aCountry);
                            }
                        }
                    );
                }
            );
        }
        return c;
    }

}
