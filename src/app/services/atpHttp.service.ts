import {Injectable} from "@angular/core";
import {Headers, Http} from "@angular/http";

@Injectable()
export class AtpHttp {

    constructor(private http: Http) {}
}
