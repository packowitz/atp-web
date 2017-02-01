import {Component} from "@angular/core";
import {ViewController} from "ionic-angular";
import {Coupon} from "../../providers/domain/coupon.model";
import {CouponService} from "../../providers/services/coupon.service";

@Component({
  templateUrl: 'create-coupon.component.html'
})
export class CreateCouponPage {

  coupon: Coupon;

  constructor(public couponService: CouponService,
              public viewCtrl: ViewController) {
    this.coupon = new Coupon();
    let startDate = new Date();
    startDate.setDate(startDate.getDate() - 1);
    let endDate = new Date();
    endDate.setDate(endDate.getDate() + 1);
    this.coupon.startDate = startDate.toISOString().substring(0, 10);
    this.coupon.endDate = endDate.toISOString().substring(0, 10);
  }

  close() {
    this.viewCtrl.dismiss();
  }

  createCoupon() {
    this.couponService.postCoupon(this.coupon).subscribe(
      coupon => {
        this.viewCtrl.dismiss(coupon);
      }
    );
  }

}
