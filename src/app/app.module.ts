import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { HttpModule } from '@angular/http';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ContentProvider } from '../providers/ContentProvider';
import { Facebook } from '@ionic-native/facebook';
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

import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { LogicProvider } from '../providers/logic/logic';
import {SettingopenPageModule} from "../pages/settingopen/settingopen.module";
import {SliderPageModule} from "../pages/slider/slider.module";
import {RegisterPageModule} from "../pages/register/register.module";
import {LoginPageModule} from "../pages/login/login.module";
import {ContentdetailPageModule} from "../pages/contentdetail/contentdetail.module";
import {ContentcardPageModule} from "../pages/contentcard/contentcard.module";


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
    ListPage
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
    AngularFireModule.initializeApp(firebaseConfig),
    SettingopenPageModule,
    SliderPageModule,
    RegisterPageModule,
    LoginPageModule,
    ContentdetailPageModule,
    ContentcardPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage
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
