import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ContentdetailPage } from '../../pages/contentdetail/contentdetail';
import { ContentProvider } from '../../providers/ContentProvider';
import { AlertController } from 'ionic-angular';
/**
 * Generated class for the ContentcardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public contentprovider: ContentProvider) {
    this.sysId = navParams.get("sysId");

    contentprovider.getCard(this.sysId).then(
      res => (console.log(res), this.strTitulo = res[0].fields.productoRelacionado.fields.titulo
        , this.strDescripcion = res[0].fields.productoRelacionado.fields.descripcion,
        this.objCard = res
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


  showPrompt(titulo) {

    console.log(titulo);

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
        }
      ]
    });
    prompt.present();
  }

}
