import { Component, ElementRef } from '@angular/core';
import { MenuController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';
import { Platform } from 'ionic-angular';


/**
 * Generated class for the ContentdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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

    //Metodo para controlar el boton atras
    /*platform.registerBackButtonAction(() => {
      if(this.profileSettings == this.profileSettingsOld)
      {
        this.navCtrl.push(ContentcardPage, {
          objCard: this.objCard
        })
      }
      else
      { 
        this.profileSettings = this.profileSettingsOld;
      }
    },1);*/
    
  }


  fontSize: number = 1; // default font size in `em`

  fontSizeChange($val: number) {
    this.fontSize += $val;
  }

  ionViewWillEnter() {
    this.menu.enable(true, 'menu1');
  }


  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    //this.nav.setRoot(page.component);
    this.navCtrl.push(HomePage);
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
