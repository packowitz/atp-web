import {Http, Headers} from "@angular/http";
import {environment} from '../../environments/environment';
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Webuser} from "../shared/domain/webuser.component";
import {LocalStorage} from "../shared/localStorage.component";
import 'rxjs/add/operator/map';

export class TokenAndUser {
    token: string;
    webuser: Webuser;
}

@Injectable()
export class AuthService {
    redirectUrl: string = "/";

    constructor(private http: Http, private localStorage: LocalStorage) {}

    login(username: string, password: string): Observable<TokenAndUser> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(environment.server + "/web/auth/login", JSON.stringify({username: username, password: password}), {headers: headers}).map(res => res.json());
    }

    resolveWebuser(): Observable<Webuser> {
        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + this.localStorage.getToken());
        return this.http.get(environment.server + "/web/app/user", {headers: headers}).map(res => res.json());
    }
}
