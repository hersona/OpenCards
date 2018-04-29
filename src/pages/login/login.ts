import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SliderPage } from '../../pages/slider/slider';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})



export class LoginPage {

  FB_APP_ID: number = 1039887276149982;
  user: any = {};
  userData = {
    name: '',
    lastname: '',
    email: ''
  };
  showUser: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
    private facebook: Facebook) {


  }

  validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  doLogin() {
    if (this.userData.name != "" && this.userData.lastname != "" && this.userData.email != ""
      && this.validateEmail(this.userData.email)) {
      this.navCtrl.push(SliderPage);
    }
    else {
      let alert = this.alertCtrl.create({
        title: 'Datos de contacto',
        subTitle: 'Por favor digita los datos completos para garantizar nuestra comunicación',
        buttons: ['Continuar']
      });
      alert.present();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  loginWithFB() {
    //this.navCtrl.push(SliderPage);

    try {
      this.facebook.login(['public_profile', 'email'])
        .then(rta => {
          console.log(rta.status);
          if (rta.status == 'connected') {
            this.getInfo();
          };
        })
        .catch(error => {
          console.error(error);
        });
    } catch (Error) {
      alert(Error.message);
    }
  }

  loginFacebook() {
    /*try {
      this.facebook.login(['public_profile', 'email'])
        .then(rta => {
          console.log(rta.status);
          if (rta.status == 'connected') {
            this.getInfo();
          };
        })
        .catch(error => {
          console.error(error);
        });
    } catch (Error) {
      alert(Error.message);
    }*/
  }

  getInfo() {
    this.facebook.api('/me?fields=id,name,email,first_name,picture,last_name,gender', ['public_profile', 'email'])
      .then(data => {
        console.log(data);
        this.showUser = true;
        this.user = data;
      })
      .catch(error => {
        console.error(error);
      });
  }

}
