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
import { SettingopenPage } from '../pages/settingopen/settingopen';
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
import {SafeHtmlPipe} from "../pipes/safehtml";

import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { LogicProvider } from '../providers/logic/logic';


export const firebaseConfig = {
  apiKey: "AIzaSyB9NLOCgv0Wv430ZXmHHHtu05bKGxAdQdY",
  authDomain: "opencards-2d793.firebaseapp.com",
  databaseURL: "https://opencards-2d793.firebaseio.com",
  projectId: "opencards-2d793",
  storageBucket: "opencards-2d793.appspot.com",
  messagingSenderId: "760511075014"
};

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
    SettingopenPage,
    RegisterPage,
    ContentdetailPage,
    SafeHtmlPipe
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
    MarkdownModule.forRoot(),
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    SliderPage,
    ContentcardPage,
    SettingopenPage,
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
    Network,
    LogicProvider
  ]
  
})
export class AppModule {}
