import { Component } from '@angular/core';
import {LocalStorage} from "./shared/localStorage.component";
import {Model} from "./shared/model.component";
import {Router} from "@angular/router";

@Component({
  selector: 'atp-app',
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(private router: Router, private model: Model, private localStorage: LocalStorage) {}

  logout() {
    this.model.webuser = null;
    this.localStorage.setToken(null);
    this.router.navigateByUrl('/login');
  }
}
