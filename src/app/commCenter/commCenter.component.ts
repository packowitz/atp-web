import {Component} from '@angular/core';
import {CcModel} from "./ccModel.component";
import {Model} from "../shared/model.component";
import {CommCenterService} from "../services/commCenter.service";

@Component({
    templateUrl: './commCenter.html'
})
export class CommCenterPage {
    constructor(private model: Model,
                private ccModel: CcModel,
                private ccService: CommCenterService) {
        ccService.refreshOpenFeedbackcount();
    }
}
