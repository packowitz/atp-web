import {Injectable} from '@angular/core';
import {Router, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {CanActivate} from '@angular/router';
import {AuthService} from "./auth.service";
import {Model} from "../shared/model.component";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router,
                private authService: AuthService,
                private model: Model) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.model.webuser) {
            return true;
        }

        this.authService.redirectUrl = state.url;

        this.router.navigate(['/login']);
        return false;
    }
}
