import { RouterModule, Routes } from '@angular/router'; // CLI imports router

import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { WindowViewComponent } from './window-view/window-view.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'window/:backupId', component: WindowViewComponent },
]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
