import { Component, ElementRef } from '@angular/core';
import { MenuController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';
import { Platform } from 'ionic-angular';
import { ContentcardPage } from '../../pages/contentcard/contentcard';


@IonicPage()
@Component({
  selector: 'page-contentdetail',
  templateUrl: 'contentdetail.html',
})
export class ContentdetailPage {

  profileSettings = {
    descripcion: '',
    descripcionCorta: '',
    titulo: '',
    imagenProducto: '',
    htmlContenido: ''
  };
  profileSettingsOld:any;
  objData: any;
  objCard: any;
  strTitulo: string;
  strDescripcion: string;

  constructor(public navCtrl: NavController, private menu: MenuController, 
    public navParams: NavParams,platform: Platform) {
    this.objData = navParams.get("objData");
    this.objCard = navParams.get("objCard");
    this.menu.enable(true, 'menu1');
    this.profileSettings = this.objData.fields;
    this.profileSettingsOld = this.profileSettings;
  }


  fontSize: number = 1; // default font size in `em`

  fontSizeChange($val: number) {
    this.fontSize += $val;
  }

  ionViewWillEnter() {
    this.menu.enable(true, 'menu1');
  }


  goToHome() {
    this.navCtrl.setRoot(HomePage);
  }

  goToSummary()
  {
    this.navCtrl.pop();
  }

  //Ir al contenido del detalle
  goContenteDetail(data, card) {
    this.profileSettingsOld = this.profileSettings;
    this.profileSettings = data.fields;
  }


  mostrarMenu() {    
    this.menu.open();
  }

}
