import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ContentdetailPage } from '../../pages/contentdetail/contentdetail';
import { ContentProvider } from '../../providers/ContentProvider';
import { AlertController } from 'ionic-angular';
import { InAppBrowser , InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { TranslateService } from '@ngx-translate/core';


@IonicPage()
@Component({
  selector: 'page-contentcard',
  templateUrl: 'contentcard.html',
})
export class ContentcardPage {

  ContenidoTarjeta: string = "resumen";
  sysId: number;
  objCard: any;
  strTitulo: string;
  strDescripcion: string;
  strUrlCompra: string;
  options : InAppBrowserOptions = {
    location : 'yes',//Or 'no' 
    hidden : 'no', //Or  'yes'
    clearcache : 'yes',
    clearsessioncache : 'yes',
    zoom : 'yes',//Android only ,shows browser zoom controls 
    hardwareback : 'yes',
    mediaPlaybackRequiresUserAction : 'no',
    shouldPauseOnSuspend : 'no', //Android only 
    closebuttoncaption : 'Close', //iOS only
    disallowoverscroll : 'no', //iOS only 
    toolbar : 'yes', //iOS only 
    enableViewportScale : 'no', //iOS only 
    allowInlineMediaPlayback : 'no',//iOS only 
    presentationstyle : 'pagesheet',//iOS only 
    fullscreen : 'yes',//Windows only    
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public alertCtrl: AlertController, public contentprovider: ContentProvider,
    private theInAppBrowser: InAppBrowser,
    translate: TranslateService
    ) {
    this.sysId = navParams.get("sysId");

    contentprovider.getCard(translate.getDefaultLang(),this.sysId).then(
      res => (console.log(res), 
        this.strTitulo = res[0].fields.productoRelacionado.fields.titulo
        ,this.strDescripcion = res[0].fields.productoRelacionado.fields.descripcion
        ,this.strUrlCompra = res[0].fields.productoRelacionado.fields.urlTiendaProducto
        ,this.objCard = res
      )
    );

  }

  goContenteDetail(data,card) {
    this.navCtrl.setRoot(ContentdetailPage, {
      objData: data,objCard: card
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContentcardPage');
  }


  showPrompt(titulo,urlDescarga) {
    let prompt = this.alertCtrl.create({
      title: titulo,
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
            this.ContenidoTarjeta = 'resumen';
          }
        },
        {
          text: 'Descargar',
          handler: data => {
            
          }
        },
        {
          text: 'Comprar',
          handler: data => {
            let target = "_system";
            this.theInAppBrowser.create(urlDescarga,target,this.options);            
          }
        }
      ]
    });
    prompt.present();
  }

}
