import {NgModule, ErrorHandler} from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {AtpWebApp} from './app.component';
import {LoginPage} from "../pages/login/login.component";
import {LoadingPage} from "../pages/loading/loading.component";
import {Model} from "../providers/services/model.service";
import {AtpHttp} from "../providers/services/atp-http.service";
import {UserService} from "../providers/services/user.service";
import {NotificationService} from "../providers/services/notification.service";
import {CountryService} from "../providers/services/country.service";
import {LocalStorage} from "../providers/services/local-storage.service";
import {LoadingState} from "../pages/loading/loading-state.model";
import {Storage} from "@ionic/storage";
import {SurveyService} from "../providers/services/survey.service";
import {AdminHomePage} from "../pages/adminHome/admin-home.component";
import {UserHomePage} from "../pages/userHome/user-home.component";
import {ProfilePage} from "../pages/profile/profile.component";
import {FeedbackService} from "../providers/services/feedback.service";
import {FeedbackPage} from "../pages/feedback/feedback.component";
import {Util} from "../providers/services/util.service";
import {AnnouncementPage} from "../pages/announcement/announcement.component";
import {FeedbackDetailPage} from "../pages/feedback/feedback-detail.component";
import {AnnouncementService} from "../providers/services/announcement.service";
import {CountrySplitPipe} from "../providers/pipes/country-split.pipe";
import {CreateAnnouncementPage} from "../pages/announcement/create-announcement.component";

@NgModule({
  declarations: [
    AtpWebApp,

    AdminHomePage,
    AnnouncementPage,
    CreateAnnouncementPage,
    FeedbackDetailPage,
    FeedbackPage,
    LoginPage,
    LoadingPage,
    ProfilePage,
    UserHomePage,

    CountrySplitPipe
  ],
  imports: [
    IonicModule.forRoot(AtpWebApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    AdminHomePage,
    AnnouncementPage,
    AtpWebApp,
    CreateAnnouncementPage,
    FeedbackDetailPage,
    FeedbackPage,
    LoginPage,
    LoadingPage,
    ProfilePage,
    UserHomePage
  ],
  providers: [
    AnnouncementService,
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
