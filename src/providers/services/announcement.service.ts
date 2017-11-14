import {AtpHttp} from "./atp-http.service";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Announcement} from "../domain/announcement.model";

@Injectable()
export class AnnouncementService {
  constructor(public atpHttp: AtpHttp) {
  }

  listAnnouncements(): Observable<Announcement[]> {
    return this.atpHttp.doGet("/web/app/cc/announcement/list", "loading announcements");
  }

  postAnnouncement(announcement: Announcement): Observable<Announcement> {
    return this.atpHttp.doPost("/web/app/cc/announcement", announcement, "sending announcement");
  }

  deleteAnnouncement(announcement: Announcement): Observable<any> {
    return this.atpHttp.doDelete("/web/app/cc/announcement/" + announcement.id, "deleting announcement");
  }

}
