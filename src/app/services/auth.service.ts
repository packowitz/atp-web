import {Http, Headers} from "@angular/http";
import {environment} from '../../environments/environment';
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Webuser} from "../shared/domain/webuser.component";
import {LocalStorage} from "../shared/localStorage.component";
import 'rxjs/add/operator/map';
import {UserRights} from "../shared/domain/userRights.component";

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
export class AuthService {
    redirectUrl: string = "/";

    constructor(private http: Http, private localStorage: LocalStorage) {}

    login(email: string, password: string): Observable<TokenAndUser> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(environment.server + "/web/auth/login", JSON.stringify({email: email, password: password}), {headers: headers}).map(res => res.json());
    }

    resolveWebuser(): Observable<UserWithRights> {
        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + this.localStorage.getToken());
        return this.http.get(environment.server + "/web/app/user", {headers: headers}).map(res => res.json());
    }
}
