import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { ContentcardPage } from '../../pages/contentcard/contentcard';
import { AlertController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, private menu: MenuController, public contentprovider: ContentProvider,private sanitizer:DomSanitizer) {
    this.builderHtml = "";
    contentprovider.getCards().then(
      res => (this.listCards = res,
        this.BuildList(this.listCards)
      ));
  }

  //Construir lista dinamica
  BuildList(listCards) {
    console.log(listCards);
    this.numberCard = 0;
    for (let data of listCards) 
    {
      //Validar si se debe iniciar una nueva fila
      if (this.numberCard == 0) {
        this.builderHtml += "<div class=\"filaHome\">";
      }

      this.builderHtml += "<div class=\"column\">" +
        "<img (click)=\"viewContent('" + data.sys.id + "')\" src=\"https://" + data.fields.imgTarjeta.fields.file.url + "\" /></div>";

      this.numberCard += 1;

      if (this.numberCard == 3) {
        this.builderHtml += "</div>";
      }

      if (this.numberCard == 3) {
        this.numberCard = 0;
      }
    }
    if(this.numberCard != 3)
    {
      this.builderHtml += "</div>";
    }
    
   this.objRender = this.sanitizer.bypassSecurityTrustHtml(this.builderHtml);
    
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


  showPrompt() {
    let prompt = this.alertCtrl.create({
      title: 'Tarjeta conversación',
      message: "Digita el código que se encuentra en el interior de la caja",
      inputs: [
        {
          name: 'title',
          placeholder: 'Código de descarga'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Descargar',
          handler: data => {
            this.navCtrl.push(ContentcardPage);
          }
        }
      ]
    });
    prompt.present();
  }

}
