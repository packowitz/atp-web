import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {LocalStorage} from "../shared/localStorage.component";
import {Model} from "../shared/model.component";

@Component({
    templateUrl: './login.html'
})
export class LoginComponent {
    username: string;
    password: string;
    resolvingToken: boolean = false;

    constructor(private router: Router,
                private authService: AuthService,
                private localStorage: LocalStorage,
                private model: Model) {}

    ngAfterViewInit() {
        if(this.localStorage.getToken()) {
            this.resolvingToken = true;
            this.authService.resolveWebuser().subscribe(
                webuser => {
                    this.model.webuser = webuser;
                    this.resolvingToken = false;
                    this.router.navigateByUrl(this.authService.redirectUrl);
                },
                error => {
                    console.error(error);
                    this.resolvingToken = false;
                }
            );
        }
    }

    doLogin() {
        if(this.username && this.username.length > 0 && this.password && this.password.length > 0) {
            this.authService.login(this.username, this.password).subscribe(
                data => {
                    this.localStorage.setToken(data.token);
                    this.model.webuser = data.webuser;
                    this.router.navigateByUrl(this.authService.redirectUrl);
                },
                error => {
                    console.log("Error while login:");
                    console.log(error);
                }
            );
        }
    }
}
