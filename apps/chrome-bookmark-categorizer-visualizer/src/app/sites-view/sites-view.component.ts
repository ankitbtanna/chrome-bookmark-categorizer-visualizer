import { Component, OnInit } from '@angular/core';
import { map, of, tap } from 'rxjs';

import { ActivatedRoute } from '@angular/router';
import { AppService } from './../app.service';

@Component({
  selector: 'chrome-bookmark-categorizer-visualizer-sites-view',
  templateUrl: './sites-view.component.html',
  styleUrls: ['./sites-view.component.scss'],
})
export class SitesViewComponent implements OnInit {
  $sites = of([]);
  backupId = '';
  windowId = '';
  constructor(private route: ActivatedRoute, private appService: AppService) {}

  ngOnInit(): void {
    this.route.queryParamMap
      .pipe(
        tap((params) => {
          const backupId = params.get('backupId') ?? '';
          const windowId = params.get('windowId') ?? '';

          this.setBackupId(backupId);
          this.setWindowId(windowId);
        }),
        tap(() => {
          this.setSites();
        }),
        map((params) => params)
      )
      .subscribe();
  }

  private setSites(): void {
    this.$sites = this.appService.getSitesByBackupIdAndWindowId(
      this.backupId,
      this.windowId
    );
  }

  private setBackupId(backupId = ''): void {
    this.backupId = backupId;
  }

  private setWindowId(windowId = ''): void {
    this.windowId = windowId;
  }
}
