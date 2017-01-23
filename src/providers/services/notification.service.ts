import {Injectable} from "@angular/core";
import {LoadingController, Loading, Toast, ToastController} from "ionic-angular";

@Injectable()
export class NotificationService {
  loading: Loading;
  toast: Toast;

  constructor(public loadingController: LoadingController, public toastController: ToastController) {
  }

  showLoading(message: string) {
    this.loading = this.loadingController.create({
      content: message,
      spinner: 'dots'
    });
    this.loading.present();
  }

  //noinspection TypeScriptUnresolvedVariable
  dismissLoading(): Promise<any> {
    if(this.loading) {
      return this.loading.dismiss().then(() => this.loading = null);
    } else {
      //noinspection TypeScriptUnresolvedFunction
      return new Promise(func => func());
    }
  }

  showToast(options: any) {
    this.toast = this.toastController.create(options);
    this.toast.present();
  }

  //noinspection TypeScriptUnresolvedVariable
  dismissToast(): Promise<any> {
    if(this.toast) {
      return this.toast.dismiss().then(() => this.toast = null);
    } else {
      //noinspection TypeScriptUnresolvedFunction
      return new Promise(func => func());
    }
  }
}
