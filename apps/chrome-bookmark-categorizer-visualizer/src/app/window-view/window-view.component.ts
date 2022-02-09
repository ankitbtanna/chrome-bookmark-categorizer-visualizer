import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { AppService } from './../app.service';
import { of } from 'rxjs';

@Component({
  selector: 'chrome-bookmark-categorizer-visualizer-window-view',
  templateUrl: './window-view.component.html',
  styleUrls: ['./window-view.component.scss'],
})
export class WindowViewComponent implements OnInit {
  private backupId = '123';

  windows$ = of({});

  constructor(private route: ActivatedRoute, private appService: AppService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      this.backupId = paramMap.get('backupId') || '';
      console.log(this.backupId);
      this.windows$ = this.appService.getUserWindowsByBackupId(this.backupId);
    });
  }
}
