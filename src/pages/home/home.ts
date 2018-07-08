import { Component, ElementRef } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { ContentcardPage } from '../../pages/contentcard/contentcard';
import { ContentProvider } from '../../providers/ContentProvider';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  listCards: any;
  builderHtml: string;
  numberCard: number;
  objRender: SafeHtml;
  objCard: any;
  ContentLocal: ContentProvider;
  TranslateLocal: TranslateService;

  constructor(private el: ElementRef, public navCtrl: NavController,
    private menu: MenuController,
    public contentprovider: ContentProvider, private sanitizer: DomSanitizer,
    translate: TranslateService
  ) {
    this.ContentLocal = contentprovider;
    this.TranslateLocal = translate;

    this.builderHtml = "";
    contentprovider.getCards(translate.getDefaultLang()).then(
      res => (this.listCards = res, console.log(res)
      ));

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
