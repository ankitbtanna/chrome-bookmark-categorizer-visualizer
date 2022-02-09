import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppService } from './app.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { WindowViewComponent } from './window-view/window-view.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, WindowViewComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [AppService],
  bootstrap: [AppComponent],
})
export class AppModule {}
