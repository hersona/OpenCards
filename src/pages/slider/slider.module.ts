import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {SliderPage} from "./slider";
import {HttpClient} from "@angular/common/http";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {createTranslateLoader} from "../../app/app.module";

@NgModule({
  declarations: [
      SliderPage
  ],
  imports: [
    IonicPageModule.forChild(SliderPage),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
  ],
})
export class SliderPageModule {}
