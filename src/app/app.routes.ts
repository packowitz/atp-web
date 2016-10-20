import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "./services/auth-guard.service";
import {AnnouncementsPage} from "./commCenter/announcements.component";
import {FeedbackPage} from "./commCenter/feedback.component";
import {CallcenterHomePage} from "./commCenter/ccHome.component";
import {CommCenterPage} from "./commCenter/commCenter.component";
import {LoginComponent} from "./login/login.component";
import {MyATPsPage} from "./myATPs/myATPs.component";
import {MyATPsListPage} from "./myATPs/myATPsList.component";
import {MyATPsNewPage} from "./myATPs/myATPsNew.component";
import {MyATPsSecurityListPage} from "./myATPs/myATPsSecurityList.component";
import {MyATPsSecurityNewPage} from "./myATPs/myATPsSecurityNew.component";
import {ProfilePage} from "./profile/profile.component";
import {WelcomePage} from "./welcome/welcome.component";

const routes: Routes = [
  {
    path: '',
    component: WelcomePage,
    canActivate: [AuthGuard]
  }, {
    path: 'login',
    component: LoginComponent
  }, {
    path: 'atps',
    component: MyATPsPage,
    canActivate: [AuthGuard],
    children: [
      {path: 'list', component: MyATPsListPage},
      {path: 'new', component: MyATPsNewPage},
      {path: 'securityList', component: MyATPsSecurityListPage},
      {path: 'securityNew', component: MyATPsSecurityNewPage}
    ]
  }, {
    path: 'cc',
    component: CommCenterPage,
    canActivate: [AuthGuard],
    children: [
      {path: '', component: CallcenterHomePage},
      {path: 'improvements/open', component: FeedbackPage, data: {type: 'IMPROVEMENT', status: 'OPEN', name: 'open Improvements'}},
      {path: 'improvements/answered', component: FeedbackPage, data: {type: 'IMPROVEMENT', status: 'ANSWERED', name: 'answered Improvements'}},
      {path: 'improvements/closed', component: FeedbackPage, data: {type: 'IMPROVEMENT', status: 'CLOSED', name: 'closed Improvements'}},
      {path: 'bugs/open', component: FeedbackPage, data: {type: 'BUG_REPORT', status: 'OPEN', name: 'open Bugs'}},
      {path: 'bugs/answered', component: FeedbackPage, data: {type: 'BUG_REPORT', status: 'ANSWERED', name: 'answered Bugs'}},
      {path: 'bugs/closed', component: FeedbackPage, data: {type: 'BUG_REPORT', status: 'CLOSED', name: 'closed Bugs'}},
      {path: 'messages/open', component: FeedbackPage, data: {type: 'MESSAGE_SUGGESTION', status: 'OPEN', name: 'open Message Suggestions'}},
      {path: 'messages/answered', component: FeedbackPage, data: {type: 'MESSAGE_SUGGESTION', status: 'ANSWERED', name: 'answered Message Suggestions'}},
      {path: 'messages/closed', component: FeedbackPage, data: {type: 'MESSAGE_SUGGESTION', status: 'CLOSED', name: 'closed Message Suggestions'}},
      {path: 'kudos/open', component: FeedbackPage, data: {type: 'KUDOS', status: 'OPEN', name: 'open Kudos'}},
      {path: 'kudos/answered', component: FeedbackPage, data: {type: 'KUDOS', status: 'ANSWERED', name: 'answered Kudos'}},
      {path: 'kudos/closed', component: FeedbackPage, data: {type: 'KUDOS', status: 'CLOSED', name: 'closed Kudos'}},
      {path: 'other/open', component: FeedbackPage, data: {type: 'OTHER', status: 'OPEN', name: 'open Other Messages'}},
      {path: 'other/answered', component: FeedbackPage, data: {type: 'OTHER', status: 'ANSWERED', name: 'answered Other Messages'}},
      {path: 'other/closed', component: FeedbackPage, data: {type: 'OTHER', status: 'CLOSED', name: 'closed Other Messages'}},
      {path: 'announcements', component: AnnouncementsPage}
    ]
  }, {
    path: 'profile',
    component: ProfilePage,
    canActivate: [AuthGuard]
  }
];

export const routing = RouterModule.forRoot(routes, {useHash: true});
