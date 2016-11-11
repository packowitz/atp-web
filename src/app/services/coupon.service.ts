import {Http, Headers} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {Injectable} from "@angular/core";
import {Country} from "../shared/domain/country.component";
import {environment} from "../../environments/environment";
import {Coupon} from "../shared/domain/coupon.component";
import {LocalStorage} from "../shared/localStorage.component";

@Injectable()
export class CouponService {

  countries: Country[];

  constructor(public http: Http, private localStorage: LocalStorage) {}

  postCoupon(coupon: Coupon): Observable<Coupon> {
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + this.localStorage.getToken());
    headers.append('Content-Type', 'application/json');
    return this.http.post(environment.server + "/web/app/coupon", JSON.stringify(coupon), {headers: headers}).map(res => res.json());
  }

  listCoupons(): Observable<Coupon[]> {
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + this.localStorage.getToken());
    return this.http.get(environment.server + "/web/app/coupon", {headers: headers}).map(res => res.json());
  }
}
