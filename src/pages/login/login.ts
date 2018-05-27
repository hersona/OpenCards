import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SliderPage } from '../../pages/slider/slider';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { AlertController } from 'ionic-angular';
import { TasksServiceProvider } from '../../providers/tasks-service/tasks-service';
import { TranslateService } from '@ngx-translate/core';

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
  rows: any;
  data: any;
  results: any = {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private facebook: Facebook,
    public tasksService: TasksServiceProvider,
    public translate: TranslateService
  ) {    

  }

  getInstant(key) {
    return this.translate.get(key).subscribe(data => { return data });
  }

  validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  createUser(userData) {
    this.navCtrl.push(SliderPage);
    //Crea en la base de datos local 
    /*this.tasksService.create(userData)
      .then(response => {
        console.log(response),
          this.navCtrl.push(SliderPage);
      })
      .catch(error => {
        console.error(error);
      });*/
  }

  doLogin() {
    if (this.userData.name != "" && this.userData.lastname != "" && this.userData.email != ""
      && this.validateEmail(this.userData.email)) {
      this.createUser(this.userData);
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

  }

  loginWithFB() {
    try {
      this.facebook.login(['public_profile'])
        .then(rta => {
          console.log(rta.status);
          if (rta.status == 'connected') {
            this.getInfo();
          };
        })
        .catch(error => {
          console.error("ERROR 1");
          console.error(error);
          console.error(error.message);
        });
    } catch (Error) {
      console.error("ERROR 2");
      alert(Error.message);
    }
  }


  getInfo() {
    this.facebook.api('/me?fields=id,name,email,first_name,picture,last_name,gender', ['public_profile', 'email'])
      .then(data => {
        this.userData.name = data.name;
        this.userData.lastname = data.last_name;
        this.userData.email = data.email;
        this.createUser(this.userData);
        console.log(data);
        this.showUser = true;
        this.user = data;
      })
      .catch(error => {
        console.error(error);
      });
  }

}
