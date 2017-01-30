import {Country} from "../domain/country.model";
import {Observable} from "rxjs/Observable";
import {Injectable} from "@angular/core";
import {AtpHttp} from "./atp-http.service";

@Injectable()
export class CountryService {

  countries: Country[];

  constructor(public atpHttp: AtpHttp) {}

  getCountries(): Observable<Country[]> {
    if(this.countries) {
      return Observable.create(obs => obs.next(this.countries));
    }

    return this.atpHttp.doGetBackground("/country/list").map(data => {
      this.countries = data;
      return this.countries;
    })
  }
}