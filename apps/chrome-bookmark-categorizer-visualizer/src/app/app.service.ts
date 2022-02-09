/* eslint-disable no-prototype-builtins */

import { Observable, of } from "rxjs";

import { Injectable } from "@angular/core";
import backups from './../allTabs.json';

@Injectable({ providedIn: 'root' })
export class AppService {
    getAllTabsByUserId(userId: string): Observable<any[]> {
        return of(backups) as any;
    }

    getUserWindowsByBackupId(backupId: string): Observable<any> {
        const backup: any = (backups as []).filter((backup: any) => backup._id === backupId)[0];
        const windowTabCountMapping: any = {};

        if (!backup) {
            return of({})
        }
        backup.tabs.forEach((tab: any) => {
            if (windowTabCountMapping.hasOwnProperty(tab.windowId)) {
                windowTabCountMapping[tab.windowId]++;
                return;
            }
            windowTabCountMapping[tab.windowId] = 1;
        })
        console.log('hiiiii')
        console.log(windowTabCountMapping);
        return of(windowTabCountMapping);
    }
}