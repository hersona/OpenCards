import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SettingopenPage } from './settingopen';
import {HttpClient} from "@angular/common/http";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {createTranslateLoader} from "../../app/app.module";

@NgModule({
  declarations: [
    SettingopenPage,
  ],
  imports: [
    IonicPageModule.forChild(SettingopenPage),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
  ],
})
export class SettingopenPageModule {}
