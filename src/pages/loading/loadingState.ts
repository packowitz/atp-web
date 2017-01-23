import {Injectable} from "@angular/core";

@Injectable()
export class LoadingState {
  loadedLocalStorage: boolean = false;
  loadedCountries: boolean = false;
  loadedUser: boolean = false;

  reset() {
    this.loadedLocalStorage = false;
    this.loadedCountries = false;
    this.loadedUser = false;
  }
}
