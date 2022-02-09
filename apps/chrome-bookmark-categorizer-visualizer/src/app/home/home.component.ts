import { Component, OnInit } from '@angular/core';

import { AppService } from './../app.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { of } from 'rxjs';

@Component({
  selector: 'chrome-bookmark-categorizer-visualizer-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  backups$: Observable<any[]> = of([]);

  constructor(private appService: AppService, private routerService: Router) {}

  ngOnInit(): void {
    this.backups$ = this.appService.getAllTabsByUserId('abc');
  }

  navigateToBackup(backupId: string): void {
    this.routerService.navigate([`/window/${backupId}`]);
  }
}
