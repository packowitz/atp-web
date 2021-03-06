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
import {RegisterClosedBetaPage} from "../pages/login/register-closed-beta.component";
import {ClosedBetaUserPage} from "../pages/closedBeta/closed-beta-user.component";
import {BrowserModule} from "@angular/platform-browser";
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import {IonicStorageModule} from "@ionic/storage";
import {CroppieComponent} from "../pages/croppie/croppie-component";
import {JwtTokenInterceptor} from "../providers/interceptors/jwt_token.interceptor";

@NgModule({
  declarations: [
    AtpWebApp,

    AdminHomePage,
    AnnouncementsPage,
    ClosedBetaUserPage,
    CountrySelectionPopover,
    CouponsPage,
    CreateAnnouncementPage,
    CreateCouponPage,
    CreateSurveyPage,
    CroppieComponent,
    FeedbackDetailPage,
    FeedbackPage,
    LoginPage,
    LoadingPage,
    MySurveysPage,
    ProfilePage,
    RegisterClosedBetaPage,
    SecuritySurveyPage,
    UserDetailPage,
    UserHomePage,
    UsersPage,

    SingleSurveyBar,

    CountrySplitPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(AtpWebApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    AdminHomePage,
    AnnouncementsPage,
    AtpWebApp,
    ClosedBetaUserPage,
    CountrySelectionPopover,
    CouponsPage,
    CreateAnnouncementPage,
    CreateCouponPage,
    CreateSurveyPage,
    CroppieComponent,
    FeedbackDetailPage,
    FeedbackPage,
    LoginPage,
    LoadingPage,
    MySurveysPage,
    ProfilePage,
    RegisterClosedBetaPage,
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
    SurveyService,
    UserService,
    Util,
    {provide: HTTP_INTERCEPTORS, useClass: JwtTokenInterceptor, multi: true},
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
