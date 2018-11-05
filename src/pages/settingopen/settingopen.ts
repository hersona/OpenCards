import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ContentProvider } from '../../providers/ContentProvider';
import { HomePage } from '../../pages/home/home';
import { TranslateService } from '@ngx-translate/core';
import { TasksServiceProvider } from '../../providers/tasks-service/tasks-service';

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

  objLanguages: any;
  languageDefaultLocal: any;
  ContentLocal: ContentProvider;
  navParamsLocal: NavController;
  languagueParam: any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, public contentProvider: ContentProvider, 
    private translate: TranslateService,public tasksService: TasksServiceProvider) {
    this.ContentLocal = contentProvider;
    this.navParamsLocal = navCtrl;
    this.languageDefaultLocal = contentProvider.languageDefault;
    this.objLanguages = contentProvider.objLanguages;
  }

  saveForm() {
    var objLangWeb = this.objLanguages.filter(
      book => book.contentful === this.languageDefaultLocal)[0];
    
    this.translate.use(objLangWeb.web);
    this.ContentLocal.languageDefault = this.languageDefaultLocal;
    this.languagueParam.name = 'languageApp';
    this.languagueParam.valueParam = this.ContentLocal.languageDefault;
    this.tasksService.insertParamsOpenValue(this.languagueParam.name,objLangWeb.web);
    this.navParamsLocal.push(HomePage);
  }

  ionViewDidLoad() {

  }

}
