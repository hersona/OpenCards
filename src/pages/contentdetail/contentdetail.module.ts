import { NgModule } from '@angular/core';
import {ContentdetailPage} from "./contentdetail";
import {IonicPageModule} from "ionic-angular";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {createTranslateLoader} from "../../app/app.module";
import {HttpClient} from "@angular/common/http";
import {PipesModule} from "../../pipes/pipes.module";


@NgModule({
  declarations: [
    ContentdetailPage
  ],
  imports: [
    IonicPageModule.forChild(ContentdetailPage),
    PipesModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
  ],
})
export class ContentdetailPageModule {}
