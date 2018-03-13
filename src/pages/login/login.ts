import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SliderPage } from '../../pages/slider/slider';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  doLogin() {
    this.navCtrl.push(SliderPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
