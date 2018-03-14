import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ContentcardPage } from '../../pages/contentcard/contentcard';
import { RegisterPage } from '../../pages/register/register';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  

  constructor(public navCtrl: NavController,public alertCtrl: AlertController) {

  }

  viewContent(){
    this.navCtrl.push(ContentcardPage);
  }

  goToStore()
  {
    window.open('http://openmind-store.com', '_system');
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
