import {Component, Injectable, trigger, state, style, transition, animate} from "@angular/core";

@Injectable()
export class NotificationService {

    message: string;

    constructor() {}

    public showSuccess(msg: string) {
        this.message = msg;
        setTimeout(() => this.hideMessage(), 5000);
    }

    public hideMessage() {
        this.message = null;
    }
}

@Component({
    selector: 'notification',
    template: `<div *ngIf="notificationService.message" class="bg-success notification-top" [@notificationState]="'visible'" (click)="notificationService.hideMessage()">{{notificationService.message}}</div>`,
    styles: [`
    .notification-top {
        position: fixed;
        top: 0;
        left: 40vw;
        width: 20vw;
        display: flex;
        height: 3em;
        align-items: center;
        justify-content: center;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
    }
    `],
    animations: [
        trigger('notificationState', [
            state('visible', style({opacity: 1, transform: 'translateY(0)'})),
            transition('void => *', [
                style({
                    opacity: 0,
                    transform: 'translateY(-100%)'
                }),
                animate('0.5s ease-in')
            ]),
            transition('* => void', [
                animate('0.5s ease-out', style({
                    opacity: 0,
                    transform: 'translateY(-100%)'
                }))
            ])
        ])
    ]
})
export class Notification {

    constructor(private notificationService: NotificationService) {
    }
}
