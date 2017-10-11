import {Component} from "@angular/core";
import {NavParams, ViewController} from "ionic-angular";

declare var Croppie: any;

@Component({
  templateUrl: 'croppie-component.html'
})
export class CroppieComponent {

  croppie: any;

  constructor(public navParams: NavParams, public viewCtrl: ViewController) {
    let w = navParams.get('width');
    let h = navParams.get('height');
    let maxWidth = Math.min(window.innerWidth, 560);
    let maxHeight = Math.min(window.innerHeight, 560);
    if (w > maxWidth || h > maxHeight) {
      let ratio = w / h;
      if (w > maxWidth) {
        w = maxWidth;
        h = w / ratio;
      }
      if (h > maxHeight) {
        h = maxHeight;
        w = h * ratio;
      }
    }
    setTimeout(() => this.showCroppie(w, h, navParams.get('src')), 100);
  }

  showCroppie(w, h, src) {
    this.croppie = new Croppie(document.getElementById('create-survey-croppie'), {
      viewport: {width: 300, height: 300},
      boundary: {width: w, height: h},
      enableOrientation: true
    });
    this.croppie.bind({url: src});
  }

  saveCroppedPicture() {
    if(this.croppie) {
      this.croppie.result({
        type: 'canvas',
        size: 'viewport',
        format: 'jpeg',
        quality: 0.5
      }).then(data => {
        this.croppie.destroy();
        this.viewCtrl.dismiss(data.substring(data.indexOf(",") + 1));
      });
    }
  }

  rotateLeft() {
    if(this.croppie) {
      this.croppie.rotate(-90);
    }
  }

  rotateRight() {
    if(this.croppie) {
      this.croppie.rotate(90);
    }
  }
}
