import { Component,ElementRef } from '@angular/core';
import { MenuController,IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';

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
    titulo: '',
    descripcionCorta: '',
    imagenProducto:'',
    htmlContenido:''
  };

  objData: any;
  objCard: any;
  strTitulo: string;
  strDescripcion: string;

  constructor(public navCtrl: NavController,private menu: MenuController,public navParams: NavParams,private elRef:ElementRef){
    // If we navigated to this page, we will have an item available as a nav param
    
    this.objData = navParams.get("objData");
    this.objCard = navParams.get("objCard");

    console.log(this.objData);
    console.log(this.objCard);
    
    this.profileSettings = this.objData.fields;
  }


  fontSize: number = 1; // default font size in `em`

fontSizeChange($val: number){
    this.fontSize +=$val;
}

  ionViewWillEnter() {
    this.menu.enable(true, 'menu1');
  }  

  
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    //this.nav.setRoot(page.component);
    this.navCtrl.setRoot(HomePage);
  }

  goContenteDetail(data,card) {
    this.profileSettings = data.fields;
    
    /*this.navCtrl.setRoot(ContentdetailPage, {
      objData: data,objCard: card
    });*/
  }

  mostrarMenu()
  {
    this.menu.toggle();
  }  

}
