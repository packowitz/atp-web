import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {Util} from "./services/util.service";
import {SurveyService} from "./services/survey.service";
import {NotificationService, Notification} from "./services/notification.service";
import {Model} from "./shared/model.component";
import {LocalStorage} from "./shared/localStorage.component";
import {CountryService} from "./services/country.service";
import {CommCenterService} from "./services/commCenter.service";
import {CcModel} from "./commCenter/ccModel.component";
import {AuthService} from "./services/auth.service";
import {AuthGuard} from "./services/auth-guard.service";
import {routing} from "./app.routes";
import {ProfilePage} from "./profile/profile.component";
import {AnnouncementsPage, CountrySplitPipe} from "./commCenter/announcements.component";
import {FeedbackPage} from "./commCenter/feedback.component";
import {CallcenterHomePage} from "./commCenter/ccHome.component";
import {CommCenterPage} from "./commCenter/commCenter.component";
import {MyATPsSecurityNewPage} from "./myATPs/myATPsSecurityNew.component";
import {MyATPsSecurityListPage} from "./myATPs/myATPsSecurityList.component";
import {MyATPsNewPage} from "./myATPs/myATPsNew.component";
import {MyATPsListPage} from "./myATPs/myATPsList.component";
import {MyATPsPage} from "./myATPs/myATPs.component";
import {WelcomePage} from "./welcome/welcome.component";
import {LoginComponent} from "./login/login.component";
import {CreateAtp} from "./myATPs/createAtp.component";
import {AtpListings} from "./myATPs/atpListings.component";
import {Observable} from "rxjs/Rx";

@NgModule({
  declarations: [
    AppComponent,
    AtpListings,
    CreateAtp,
    LoginComponent,
    WelcomePage,
    MyATPsPage,
    MyATPsListPage,
    MyATPsNewPage,
    MyATPsSecurityListPage,
    MyATPsSecurityNewPage,
    CommCenterPage,
    CallcenterHomePage,
    FeedbackPage,
    AnnouncementsPage,
    ProfilePage,
    Notification,
    CountrySplitPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [
    AuthGuard,
    AuthService,
    CcModel,
    CommCenterService,
    CountryService,
    LocalStorage,
    Model,
    NotificationService,
    SurveyService,
    Util
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
