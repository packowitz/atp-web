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
import {AnnouncementsPage} from "../pages/announcements/announcements.component";
import {FeedbackDetailPage} from "../pages/feedback/feedback-detail.component";
import {AnnouncementService} from "../providers/services/announcement.service";
import {CountrySplitPipe} from "../providers/pipes/country-split.pipe";
import {CreateAnnouncementPage} from "../pages/announcements/create-announcement.component";
import {CouponsPage} from "../pages/coupons/coupons.component";
import {CouponService} from "../providers/services/coupon.service";
import {CreateCouponPage} from "../pages/coupons/create-coupon.component";
import {SecuritySurveyPage} from "../pages/securitySurveys/security-surveys.component";
import {MySurveysPage} from "../pages/mySurveys/my-surveys.component";
import {UsersPage} from "../pages/users/users.component";
import {SingleSurveyBar} from "../providers/directives/single-survey-bar.component";
import {CreateSurveyPage} from "../pages/createSurvey/create-survey.component";
import {CountrySelectionPopover} from "../pages/countrySelection/countrySelection.component";
import {UserDetailPage} from "../pages/users/user-detail.component";

@NgModule({
  declarations: [
    AtpWebApp,

    AdminHomePage,
    AnnouncementsPage,
    CountrySelectionPopover,
    CouponsPage,
    CreateAnnouncementPage,
    CreateCouponPage,
    CreateSurveyPage,
    FeedbackDetailPage,
    FeedbackPage,
    LoginPage,
    LoadingPage,
    MySurveysPage,
    ProfilePage,
    SecuritySurveyPage,
    UserDetailPage,
    UserHomePage,
    UsersPage,

    SingleSurveyBar,

    CountrySplitPipe
  ],
  imports: [
    IonicModule.forRoot(AtpWebApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    AdminHomePage,
    AnnouncementsPage,
    AtpWebApp,
    CountrySelectionPopover,
    CouponsPage,
    CreateAnnouncementPage,
    CreateCouponPage,
    CreateSurveyPage,
    FeedbackDetailPage,
    FeedbackPage,
    LoginPage,
    LoadingPage,
    MySurveysPage,
    ProfilePage,
    SecuritySurveyPage,
    UserDetailPage,
    UserHomePage,
    UsersPage
  ],
  providers: [
    AnnouncementService,
    AtpHttp,
    CountryService,
    CouponService,
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
