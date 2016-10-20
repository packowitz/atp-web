import {Injectable} from "@angular/core";

@Injectable()
export class LocalStorage {
    private token: string;

    constructor() {
        let lsVal = window.localStorage.getItem('atp');
        if(lsVal) {
            let lsObj = JSON.parse(lsVal);
            this.token = lsObj.token;
        }
    }

    private writeToLS() {
        window.localStorage.setItem('atp', JSON.stringify({
            token: this.token
        }));
    }

    public getToken(): string {
        return this.token;
    }

    public setToken(token: string) {
        this.token = token;
        this.writeToLS();
    }
}