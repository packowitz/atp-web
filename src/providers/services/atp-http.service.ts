import {Injectable, ViewChild} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {map, retryWhen, switchMap} from 'rxjs/operators';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Model} from "./model.service";
import {NotificationService} from "./notification.service";
import {Alert, AlertController, NavController} from "ionic-angular";
import {LocalStorage} from "./local-storage.service";
import {LoadingPage} from "../../pages/loading/loading.component";
import {LoadingState} from "../../pages/loading/loading-state.model";

@Injectable()
export class AtpHttp {

  @ViewChild('content') nav: NavController;

  constructor(public http: HttpClient,
              public localStorage: LocalStorage,
              public loadingState: LoadingState,
              public notificationService: NotificationService,
              public alertController: AlertController) {
  }

  doGet<T>(uri: string, loadingMessage: string): Observable<T> {
    this.notificationService.showLoading(loadingMessage);
    return this.http.get<T>(Model.server + uri).pipe(
      map(data => this.dismissLoading(data)),
      retryWhen(error => this.retryWhen(error))
    );
  }

  doGetBackground<T>(uri: string): Observable<T> {
    return this.http.get<T>(Model.server + uri).pipe(
      retryWhen(error => this.retryWhen(error))
    );
  }

  doPost<T>(uri: string, body: any, loadingMessage: string): Observable<T> {
    this.notificationService.showLoading(loadingMessage);
    return this.http.post<T>(Model.server + uri, body).pipe(
      map(data => this.dismissLoading(data)),
      retryWhen(error => this.retryWhen(error))
    );
  }

  doPostBackground<T>(uri: string, body: any): Observable<T> {
    return this.http.post<T>(Model.server + uri, body).pipe(
      retryWhen(error => this.retryWhen(error))
    );
  }

  doPut<T>(uri: string, body: any, loadingMessage: string): Observable<T> {
    this.notificationService.showLoading(loadingMessage);
    return this.http.put<T>(Model.server + uri, body).pipe(
      map(data => this.dismissLoading(data)),
      retryWhen(error => this.retryWhen(error))
    );
  }

  doDelete<T>(uri: string, loadingMessage: string): Observable<T> {
    this.notificationService.showLoading(loadingMessage);
    return this.http.delete<T>(Model.server + uri, {responseType: 'text' as 'json'}).pipe(
      map(data => this.dismissLoading(data)),
      retryWhen(error => this.retryWhen(error))
    );
  }

  private dismissLoading(data) {
    console.log(data);
    this.notificationService.dismissLoading();
    return data ? data : {};
  }

  private retryWhen(error): Observable<any> {
    return error.pipe(switchMap((err: any) => Observable.create(observer => {
      this.notificationService.dismissLoading().then(() => {
        let title: string, message: string, buttons: any[] = [];

        let retryBtn = {text: 'Retry', handler: () => observer.next()};
        let resetAccountBtn = {
          text: 'Reset account',
          handler: () => {
            this.localStorage.clearStorage();
            this.loadingState.reset();
            this.nav.setRoot(LoadingPage);
          }
        };
        let closeBtn = {text: 'OK'};
        let homeBtn = {text: 'home', handler: () => this.nav.setRoot(LoadingPage)};

        if(err.status == 0) {
          title = 'Network error';
          message = 'Please check that you are connected to the internet';
          buttons.push(retryBtn);
        } else {
          title = err.error.title;
          message = err.error.message;
          if(err.error.showRetryBtn) {buttons.push(retryBtn)}
          if(err.error.showResetAccountBtn) {buttons.push(resetAccountBtn)}
          if(err.error.showCloseBtn) {buttons.push(closeBtn)}
          if(err.error.showHomeBtn) {buttons.push(homeBtn)}
        }

        let alert: Alert = this.alertController.create({
          title: title ? title : "Error",
          message: message ? message : "An unknown Error occured.",
          buttons: buttons.length > 0 ? buttons : [closeBtn],
          enableBackdropDismiss: false
        });

        alert.present();
      });
    })));
  }
}
