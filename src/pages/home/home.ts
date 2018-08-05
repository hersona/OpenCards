import { Component, ElementRef } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { ContentcardPage } from '../../pages/contentcard/contentcard';
import { ContentProvider } from '../../providers/ContentProvider';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { TranslateService } from '@ngx-translate/core';
import { TasksServiceProvider } from '../../providers/tasks-service/tasks-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  listCards: any;
  numberCard: number;
  objRender: SafeHtml;
  objCard: any;
  ContentLocal: ContentProvider;
  TranslateLocal: TranslateService;
  objParam: any;
  AppValidate: any = {};

  constructor(private el: ElementRef, public navCtrl: NavController,
    private menu: MenuController,
    public contentprovider: ContentProvider, private sanitizer: DomSanitizer,
    translate: TranslateService,
    public tasksService: TasksServiceProvider
  ) {
    this.ContentLocal = contentprovider;
    this.TranslateLocal = translate;

    this.AppValidate.name = 'HomeDataSet';
    this.tasksService.getParam(this.AppValidate)
      .then(data => {
        if (data.length > 0) {
          this.listCards = JSON.parse(data[0].valueParam);
        }
        else
        {
          console.log('Información no Cache');
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  viewContent(sysIdValue) {
    this.ContentLocal.getCard(this.TranslateLocal.getDefaultLang(), sysIdValue).then(
      res => (
        this.objCard = res,
        this.navCtrl.push(ContentcardPage, {
          objCard: this.objCard
        })
      )
    );
  }

  goToStore() {
    window.open('http://openmind-store.com', '_system');
  }

  ionViewWillEnter() {
    this.menu.enable(true, 'Menu1');
  }

  showMenu() {
    this.menu.toggle();
  }

}
