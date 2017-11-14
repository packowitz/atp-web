import {AtpHttp} from "./atp-http.service";
import {Injectable} from "@angular/core";
import {Coupon} from "../domain/coupon.model";
import {Observable} from "rxjs/Observable";

@Injectable()
export class CouponService {

  constructor(public atpHttp: AtpHttp) {}

  postCoupon(coupon: Coupon): Observable<Coupon> {
    return this.atpHttp.doPost("/web/app/coupon", coupon, "creating coupon");
  }

  listCoupons(): Observable<Coupon[]> {
    return this.atpHttp.doGet("/web/app/coupon/list", "loading coupons");
  }
}
