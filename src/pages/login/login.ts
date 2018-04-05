import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SliderPage } from '../../pages/slider/slider';
import { Facebook } from '@ionic-native/facebook';


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

  user: any = {};
  showUser: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,private facebook: Facebook) {
  }


  doLogin() {
    this.navCtrl.push(SliderPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  loginFacebook(){
    this.facebook.login(['public_profile', 'email'])
    .then(rta => {
      console.log(rta.status);
      if(rta.status == 'connected'){
        this.getInfo();
      };
    })
    .catch(error =>{
      console.error( error );
    });
  }

  getInfo(){
    this.facebook.api('/me?fields=id,name,email,first_name,picture,last_name,gender',['public_profile','email'])
    .then(data=>{
      console.log(data);
      this.showUser = true; 
      this.user = data;
    })
    .catch(error =>{
      console.error( error );
    });
  }

}
