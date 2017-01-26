import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {Model} from "../../providers/services/model.service";
import {CountryService} from "../../providers/services/country.service";
import {LocalStorage} from "../../providers/services/localStorage.service";
import {LoadingState} from "./loadingState";
import {LoginPage} from "../login/login";
import {UserService} from "../../providers/services/user.service";
import {AdminHomePage} from "../adminHome/adminHome";
import {UserHomePage} from "../userHome/userHome";
import {FeedbackService} from "../../providers/services/feedback.service";


@Component({
  templateUrl: 'loading.html'
})
export class LoadingPage {

  constructor(public state: LoadingState,
              public nav: NavController,
              public userService: UserService,
              public countryService: CountryService,
              public model: Model,
              public localStorage: LocalStorage,
              public feedbackService: FeedbackService) {
    this.loadDataFromServer();
  }

  loadDataFromServer() {
    if(!this.state.loadedLocalStorage) {
      this.loadLocalStorage();
    } else if(!this.state.loadedCountries) {
      this.loadCountries();
    } else if(!this.state.loadedUser) {
      this.loadUser();
    } else if(!this.state.loadedFeedback) {
      this.loadFeedback();
    } else {
      this.nav.setRoot(this.model.isAdmin() ? AdminHomePage : UserHomePage);
    }
  }

  loadLocalStorage() {
    this.localStorage.loadData().then(() => {
      this.state.loadedLocalStorage = true;
      this.loadDataFromServer();
    });
  }

  loadCountries() {
    this.countryService.getCountries().subscribe(
      countries => {
        console.log("loaded " + countries.length + " countries");
        this.state.loadedCountries = true;
        this.loadDataFromServer();
      }
    );
  }

  loadUser() {
    if(this.model.webuser && this.model.userRights && this.localStorage.getToken()) {
      this.state.loadedUser = true;
      this.loadDataFromServer();
    } else {
      if(this.localStorage.getToken()) {
        this.resolveUser();
      } else {
        this.nav.setRoot(LoginPage);
      }
    }
  }

  public resolveUser() {
    this.userService.resolveWebuser().subscribe(
      data => {
        console.log("Loaded user data");
        this.model.webuser = data.webuser;
        this.model.userRights = data.userRights;
        this.state.loadedUser = true;
        this.loadDataFromServer();
      }
    );
  }

  loadFeedback() {
    if(this.model.userRights.callcenter) {
      this.feedbackService.enableUpdateOpenFeedbackInterval();
    }
    this.state.loadedFeedback = true;
    this.loadDataFromServer();
  }
}
