import { Component,ElementRef } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { ContentcardPage } from '../../pages/contentcard/contentcard';
import { ContentProvider } from '../../providers/ContentProvider';
import {DomSanitizer,SafeHtml} from "@angular/platform-browser";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  listCards: any;
  builderHtml: string;
  numberCard: number;
  objRender:SafeHtml;

  constructor(private el:ElementRef,public navCtrl: NavController, private menu: MenuController, public contentprovider: ContentProvider,private sanitizer:DomSanitizer) {
    this.builderHtml = "";
    contentprovider.getCards().then(
      res => (this.listCards = res
      ));
      
  }

  viewContent(sysIdValue) {
    console.log(sysIdValue);
    this.navCtrl.push(ContentcardPage, {
      sysId: sysIdValue
    });
  }

  goToStore() {
    window.open('http://openmind-store.com', '_system');
  }



  ionViewWillEnter() {
    this.menu.enable(true, 'Menu1');
  }

  showMenu()
  {
    this.menu.toggle();
  }  

}
