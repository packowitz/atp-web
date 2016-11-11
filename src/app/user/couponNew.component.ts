import {Component} from '@angular/core';
import {Coupon} from "../shared/domain/coupon.component";
import {CouponService} from "../services/coupon.service";
import {NotificationService} from "../services/notification.service";

@Component({
  templateUrl: './couponNew.component.html'
})
export class CouponNewPage {
  coupon: Coupon;

  constructor(private couponService: CouponService, private notificationService: NotificationService) {
    this.coupon = new Coupon();
  }

  couponValid(): boolean {
    return this.coupon.code && this.coupon.code.length >=8 && this.coupon.code.length <= 25 && this.coupon.reward && this.coupon.reward > 0;
  }

  createCoupon() {
    this.couponService.postCoupon(this.coupon).subscribe(coupon => {
      this.notificationService.showSuccess("Coupon " + coupon.code + " created.");
      this.coupon = new Coupon();
    });
  }
}
