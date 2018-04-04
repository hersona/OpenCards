import { Component } from '@angular/core';
import { NavController,MenuController } from 'ionic-angular';
import { ContentcardPage } from '../../pages/contentcard/contentcard';
import { AlertController } from 'ionic-angular';
import { ContentProvider } from '../../providers/ContentProvider';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  
  listCards:any;
  
  constructor(public navCtrl: NavController,public alertCtrl: AlertController, private menu: MenuController,public contentprovider : ContentProvider) {
    contentprovider.getCards().then(
      res => this.listCards = res
    );
  }

  viewContent(sysIdValue){
    console.log(sysIdValue);
    this.navCtrl.push(ContentcardPage,{
      sysId: sysIdValue
    });
  }

  goToStore()
  {
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
