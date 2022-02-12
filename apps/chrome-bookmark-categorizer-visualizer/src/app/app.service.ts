import { Observable, of } from "rxjs";

import { IGNORED_URLS } from './app.const';
import { Injectable } from "@angular/core";
import backups from './../allTabs.json';

/* eslint-disable no-prototype-builtins */






@Injectable({ providedIn: 'root' })
export class AppService {
  getAllTabsByUserId(userId: string): Observable<any[]> {
    return of(backups) as any;
  }

  getUserWindowsByBackupId(backupId: string): Observable<any> {
    const backup: any = (backups as []).filter(
      (backup: any) => backup._id === backupId
    )[0];
    const windowTabCountMapping: any = {};

    if (!backup) {
      return of({});
    }
    backup.tabs.forEach((tab: any) => {
      if (windowTabCountMapping.hasOwnProperty(tab.windowId)) {
        windowTabCountMapping[tab.windowId]++;
        return;
      }
      windowTabCountMapping[tab.windowId] = 1;
    });
    return of(windowTabCountMapping);
  }

    getSitesByBackupIdAndWindowId(backupId: string, windowId: string): Observable<any> {
        const sitesAndTabsCountMapping = [];
        
        if (!backupId || windowId === undefined) {
            return of([]);
        }
        
        const backup: any = (backups as []).filter(
          (backup: any) => backup._id === backupId
        )[0];

        if (!backup) {
            return of([]);
        }

        const tabsByWindowId = this.getTabsByWindowId(backup.tabs, windowId);
        this.getUniqueSitesByTabs(tabsByWindowId);

        return of([]);
    }
    
    private getTabsByWindowId(tabs: any[] = [], windowId: string = ''): any[] {
        const allTabs = [...tabs];
        return allTabs.filter((tab) => tab.windowId === parseInt(windowId));
    }

    private getUniqueSitesByTabs(tabs: any[] = []): string[] {
        const allTabs = [...tabs];
        const filteredIgnoredTabs = allTabs.filter((tab) => !IGNORED_URLS.includes(tab.url));
        let uniqueSites: any[] = [];

        const domains = filteredIgnoredTabs.map((tab) => {
            return tab.url.slice(0, tab.url.indexOf('/', 8) + 1);
        });
        
        uniqueSites = Array.from(new Set([...domains]));
        return uniqueSites;
    }
}