import {Component} from '@angular/core';
import {Model} from "../shared/model.component";

@Component({
    templateUrl: './myATPs.html'
})
export class MyATPsPage {
    constructor(private model: Model) {}
}
