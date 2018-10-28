import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ContentProvider } from '../../providers/ContentProvider';
import { HomePage } from '../../pages/home/home';

/**
 * Generated class for the SettingopenPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settingopen',
  templateUrl: 'settingopen.html',
})
export class SettingopenPage {

  objLanguages:any;
  languageDefaultLocal:string = '';
  ContentLocal: ContentProvider;
  navParamsLocal : NavController;


  constructor(public navCtrl: NavController, public navParams: NavParams, public contentProvider : ContentProvider) {
    this.ContentLocal = contentProvider;
    this.navParamsLocal = navCtrl;
    this.languageDefaultLocal = contentProvider.languageDefault;
    this.objLanguages = contentProvider.objLanguages;
  }

  saveForm() {
     this.ContentLocal.languageDefault = this.languageDefaultLocal;
     this.navParamsLocal.push(HomePage);
  }

  ionViewDidLoad() {
    
  }

}
