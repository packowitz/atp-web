import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Webuser} from "../domain/webuser.model";
import {UserRights} from "../domain/user-rights.model";
import {AtpHttp} from "./atp-http.service";
import {ClosedBetaUser} from "../domain/closed-beta-user.model";

export class TokenAndUser {
  token: string;
  webuser: Webuser;
  userRights: UserRights;
}

export class UserWithRights {
  webuser: Webuser;
  userRights: UserRights;
}

@Injectable()
export class UserService {
  constructor(private atpHttp: AtpHttp) {
  }

  login(email: string, password: string): Observable<TokenAndUser> {
    return this.atpHttp.doPost<TokenAndUser>("/web/auth/login", {email: email, password: password}, "Logging in");
  }

  registerForBeta(gmail: string, appleId: string, finding: string): Observable<any> {
    return this.atpHttp.doPost("/web/auth/register-closed-beta", {gmail: gmail, appleId: appleId, finding: finding}, "Sending your data");
  }

  listBetaUsers(): Observable<ClosedBetaUser[]> {
    return this.atpHttp.doGet<ClosedBetaUser[]>("/web/app/closedbeta/list", "Loading beta users");
  }

  sendAndroidInvite(id: number): Observable<ClosedBetaUser> {
    return this.atpHttp.doPost<ClosedBetaUser>("/web/app/closedbeta/invite/android/" + id, {}, "Sending invite");
  }

  resolveWebuser(): Observable<UserWithRights> {
    return this.atpHttp.doGetBackground<UserWithRights>("/web/app/user");
  }

  listUsers(): Observable<Webuser[]> {
    return this.atpHttp.doGet<Webuser[]>("/web/app/user/list", "Loading users");
  }

  getUserRights(userId: number): Observable<UserRights> {
    return this.atpHttp.doGet<UserRights>("/web/app/user/rights/" + userId, "Loading details");
  }

  updateUserRights(userId: number, userRights: UserRights): Observable<UserRights> {
    return this.atpHttp.doPut<UserRights>("/web/app/user/rights/" + userId, userRights, "Updating user rights");
  }

  getAdminUsers(): Observable<Webuser[]> {
    return this.atpHttp.doGet<Webuser[]>("/web/app/user/admins", "Loading admins");
  }
}
