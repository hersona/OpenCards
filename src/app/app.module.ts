import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { SliderPage } from '../pages/slider/slider';
import { ContentcardPage } from '../pages/contentcard/contentcard';
import { RegisterPage } from '../pages/register/register';
import { ContentdetailPage } from '../pages/contentdetail/contentdetail';
import { createClient, Entry } from 'contentful';
import { HttpModule } from '@angular/http';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ContentProvider } from '../providers/ContentProvider';
import { Facebook } from '@ionic-native/facebook';
import {DomSanitizer} from "@angular/platform-browser";
import { HTTP } from '@ionic-native/http';
import { OneSignal } from '@ionic-native/onesignal';
import { SQLite } from '@ionic-native/sqlite';
import { TasksServiceProvider } from '../providers/tasks-service/tasks-service';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { RestProvider } from '../providers/rest/rest';
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { HttpClient, HttpClientModule } from "@angular/common/http"; 

import { MarkdownModule } from 'angular2-markdown';
import { Network } from '@ionic-native/network';


export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    SliderPage,
    ContentcardPage,
    RegisterPage,
    ContentdetailPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    HttpModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    MarkdownModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    SliderPage,
    ContentcardPage,
    RegisterPage,
    ContentdetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ContentProvider,
    Facebook,
    HTTP,
    OneSignal,
    SQLite,
    TasksServiceProvider,
    InAppBrowser,
    RestProvider,
    Network
  ]
  
})
export class AppModule {}
