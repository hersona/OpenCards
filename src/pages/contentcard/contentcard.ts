import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ContentdetailPage } from '../../pages/contentdetail/contentdetail';
import { ContentProvider } from '../../providers/ContentProvider';

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
  sysId:number;
  objCard:any;
  strTitulo:string;
  strDescripcion:string;

  constructor(public navCtrl: NavController, public navParams: NavParams,public contentprovider : ContentProvider) {
    this.sysId = navParams.get("sysId");
    
    contentprovider.getCard(this.sysId).then(
      res => (this.strTitulo = res.fields.titulo,this.strDescripcion = res.fields.descripcion)
    );
      
  }
  
  goContenteDetail()
  {
    this.navCtrl.setRoot(ContentdetailPage);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContentcardPage');
  }

  

}
