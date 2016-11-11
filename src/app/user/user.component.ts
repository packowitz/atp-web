import {Component} from '@angular/core';
import {Model} from "../shared/model.component";

@Component({
  templateUrl: './user.component.html'
})
export class UserPage {
  constructor(private model: Model) {
  }
}
