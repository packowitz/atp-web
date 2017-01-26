import {NgModule, ErrorHandler} from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {AtpWebApp} from './app.component';
import {LoginPage} from "../pages/login/login";
import {LoadingPage} from "../pages/loading/loading";
import {Model} from "../providers/services/model.service";
import {AtpHttp} from "../providers/services/atpHttp.service";
import {UserService} from "../providers/services/user.service";
import {NotificationService} from "../providers/services/notification.service";
import {CountryService} from "../providers/services/country.service";
import {LocalStorage} from "../providers/services/localStorage.service";
import {LoadingState} from "../pages/loading/loadingState";
import {Storage} from "@ionic/storage";
import {SurveyService} from "../providers/services/survey.service";
import {AdminHomePage} from "../pages/adminHome/adminHome";
import {UserHomePage} from "../pages/userHome/userHome";
import {ProfilePage} from "../pages/profile/profile";
import {FeedbackService} from "../providers/services/feedback.service";
import {FeedbackPage} from "../pages/feedback/feedback";
import {Util} from "../providers/services/util.service";
import {AnnouncementPage} from "../pages/announcement/announcement";

@NgModule({
  declarations: [
    AdminHomePage,
    AnnouncementPage,
    AtpWebApp,
    FeedbackPage,
    LoginPage,
    LoadingPage,
    ProfilePage,
    UserHomePage
  ],
  imports: [
    IonicModule.forRoot(AtpWebApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    AdminHomePage,
    AnnouncementPage,
    AtpWebApp,
    FeedbackPage,
    LoginPage,
    LoadingPage,
    ProfilePage,
    UserHomePage
  ],
  providers: [
    AtpHttp,
    CountryService,
    FeedbackService,
    LoadingState,
    LocalStorage,
    Model,
    NotificationService,
    Storage,
    SurveyService,
    UserService,
    Util,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
