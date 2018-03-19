import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { VideoPlayer ,VideoOptions } from '@ionic-native/video-player';
import { ContentdetailPage } from '../../pages/contentdetail/contentdetail';


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

  constructor(public navCtrl: NavController, public navParams: NavParams,private videoPlayer : VideoPlayer) {

  }
  
  goContenteDetail()
  {
    this.navCtrl.setRoot(ContentdetailPage);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContentcardPage');
  }

  

}
