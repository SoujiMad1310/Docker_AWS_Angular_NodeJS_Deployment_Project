import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { QuestionsComponent } from './questions/questions.component';
import { HttpClientModule } from '@angular/common/http';
import { ChangeTestBgDirective } from './change-test-bg.directive';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    WelcomeComponent,
    QuestionsComponent,
    ChangeTestBgDirective,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
