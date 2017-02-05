import {Component} from "@angular/core";
import {Coupon} from "../../providers/domain/coupon.model";
import {CouponService} from "../../providers/services/coupon.service";
import {CreateCouponPage} from "./create-coupon.component";
import {ModalController, Modal} from "ionic-angular";

@Component({
  templateUrl: 'coupons.component.html'
})
export class CouponsPage {
  coupons: Coupon[];

  constructor(public couponService: CouponService,
              public modalCtrl: ModalController) {
    couponService.listCoupons().subscribe(data => this.coupons = data);
  }

  showDetails(coupon) {
    console.log("showing details of a coupon will come later");
  }

  createCoupon() {
    let modal: Modal = this.modalCtrl.create(CreateCouponPage);
    modal.onDidDismiss(newCoupon => {
      if(newCoupon) {
        this.coupons.unshift(newCoupon);
      }
    });
    modal.present();
  }
}
