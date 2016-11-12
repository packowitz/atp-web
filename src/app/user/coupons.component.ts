import {Component} from '@angular/core';
import {CouponService} from "../services/coupon.service";
import {Coupon} from "../shared/domain/coupon.component";

@Component({
  templateUrl: './coupons.component.html'
})
export class CouponsPage {
  coupons: Coupon[];

  constructor(private couponService: CouponService) {
    couponService.listCoupons().subscribe(data => this.coupons = data);
  }
}
