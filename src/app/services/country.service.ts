import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {Injectable} from "@angular/core";
import {Country} from "../shared/domain/country.component";
import {environment} from "../../environments/environment";

@Injectable()
export class CountryService {

    countries: Country[];

    constructor(public http:Http) {}

    getCountries(): Observable<Country[]> {
        if(this.countries) {
            return Observable.create(obs => obs.next(this.countries));
        }
        return this.http.get(environment.server + "/country/list").map(res => {
            if(res.status != 200) {
                throw new Error('Error while retrieving countries: ' + res.status);
            }
            this.countries = res.json();
            return this.countries;
        })
    }
}
