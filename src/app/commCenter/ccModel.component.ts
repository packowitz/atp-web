import {Injectable} from "@angular/core";

@Injectable()
export class CcModel {
    public openImprovements: number = 0;
    public openBugs: number = 0;
    public openMessages: number = 0;
    public openKudos: number = 0;
    public openOthers: number = 0;
}