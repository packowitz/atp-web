import {Injectable} from "@angular/core";
import {Webuser} from "./domain/webuser.component";
import {UserRights} from "./domain/userRights.component";

@Injectable()
export class Model {
  public webuser: Webuser;
  public userRights: UserRights;
}
