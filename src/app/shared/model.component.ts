import {Injectable} from "@angular/core";
import {Webuser} from "./domain/webuser.component";

@Injectable()
export class Model {
    public webuser: Webuser;
}