import {Component} from "@angular/core";
import {Announcement} from "../../providers/domain/announcement.model";
import {AnnouncementService} from "../../providers/services/announcement.service";
import {Util} from "../../providers/services/util.service";
import {NotificationService} from "../../providers/services/notification.service";
import {ModalController, Modal} from "ionic-angular";
import {CreateAnnouncementPage} from "./create-announcement.component";

@Component({
  templateUrl: 'announcements.component.html'
})
export class AnnouncementsPage {

  announcements: Announcement[];

  constructor(public announcementService: AnnouncementService,
              public util: Util,
              public notificationService: NotificationService,
              public modalCtrl: ModalController) {
    this.announcementService.listAnnouncements().subscribe(data => this.announcements = data);
  }

  deleteAnnouncement(announcement: Announcement) {
    if(window.confirm("Are you sure to delete this announcements?")) {
      this.announcementService.deleteAnnouncement(announcement).subscribe(
        () => {
          let idx = this.announcements.indexOf(announcement);
          if(idx >= 0) {
            this.announcements.splice(idx, 1);
          }
          this.notificationService.showDefaultToast("Announcement deleted");
        }
      );
    }
  }

  newAnnoucement() {
    let modal: Modal = this.modalCtrl.create(CreateAnnouncementPage);
    modal.onDidDismiss(newAnnouncement => {
      if(newAnnouncement) {
        this.announcements.unshift(newAnnouncement);
      }
    });
    modal.present();
  }

}
