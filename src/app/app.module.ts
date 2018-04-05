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


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ContentProvider } from '../providers/ContentProvider';
import { Facebook } from '@ionic-native/facebook';

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
    Facebook
  ]
})
export class AppModule {}
