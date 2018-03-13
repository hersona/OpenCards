import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContentcardPage } from './contentcard';

@NgModule({
  declarations: [
    ContentcardPage,
  ],
  imports: [
    IonicPageModule.forChild(ContentcardPage),
  ],
})
export class ContentcardPageModule {}
