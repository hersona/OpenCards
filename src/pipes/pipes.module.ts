import { NgModule } from '@angular/core';
import {SafeHtmlPipe} from "./safehtml";


@NgModule({
  declarations: [
    SafeHtmlPipe
  ],
  exports: [
    SafeHtmlPipe
  ]
})
export class PipesModule {}
