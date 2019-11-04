import { NgModule } from '@angular/core';
import {ContentcardPage} from "./contentcard";
import {IonicPageModule} from "ionic-angular";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpClient} from "@angular/common/http";
import {createTranslateLoader} from "../../app/app.module";

@NgModule({
  declarations: [
    ContentcardPage
  ],
  imports: [
    IonicPageModule.forChild(ContentcardPage),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
  ],
})
export class ContentcardPageModule {}
