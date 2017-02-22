import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Webuser} from "../domain/webuser.model";
import {UserRights} from "../domain/user-rights.model";
import {AtpHttp} from "./atp-http.service";

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
    return this.atpHttp.doPost("/web/auth/login", {email: email, password: password}, "Logging in");
  }

  resolveWebuser(): Observable<UserWithRights> {
    return this.atpHttp.doGetBackground("/web/app/user");
  }

  listUsers(): Observable<Webuser[]> {
    return this.atpHttp.doGet("/web/app/user/list", "Loading users");
  }

  getAdminUsers(): Observable<Webuser[]> {
    return this.atpHttp.doGet("/web/app/user/admins", "Loading admins");
  }
}
