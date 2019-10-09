import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SliderPage } from '../../pages/slider/slider';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { AlertController } from 'ionic-angular';
import { TasksServiceProvider } from '../../providers/tasks-service/tasks-service';
import { RestProvider } from '../../providers/rest/rest';
import { TranslateService } from '@ngx-translate/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseListObservable } from 'angularfire2/database';
import { LogicProvider } from '../../providers/logic/logic';
import { Observable } from "rxjs";



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
    UserEmail: '',
    Image: '',
    Creationchannel: '1',
    Password: 'AppOpen',
    Gender: '',
    UserName: ''
  };
  showUser: boolean = false;
  rows: any;
  data: any;

  results: any = {};
  AppCode: any = {};
  objTest: any = {};

  shoppingItems: FirebaseListObservable<any[]>;
  paramValues: Observable<string>;
  logo: string;
  footerCopyright:string;
  objApp : any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private facebook: Facebook,
    public tasksService: TasksServiceProvider,
    public restProvider: RestProvider,
    public translate: TranslateService,
    public database: AngularFireDatabase,
    public _logic: LogicProvider
  ) {
    this.shoppingItems = this.database.list('/ParametersApp');
  }


  ionViewWillEnter() {
    this.footerCopyright = "Loading...";
    this.paramValues = this._logic.getData()
    this.paramValues.subscribe((res) => {
      this.objApp = res,
      this.logo = this.objApp.infoApp[this.objApp.appDefecto].logo,
      this.footerCopyright = this.objApp.infoApp[this.objApp.appDefecto].footerCopyright
    })
  }

  getInstant(key) {
    return this.translate.get(key).subscribe(data => { return data });
  }

  validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  createUser(userData) {
    //Crea en la base de datos local 
    this.tasksService.create(userData)
      .then(response => {
        //Guardar token
        this.restProvider.saveLead(userData).then((result) => {
          console.log(result);
          this.navCtrl.push(SliderPage);
        }, (err) => {
          console.log(err);
        });

      })
      .catch(error => {
        console.error(error);
      });
  }

  doLogin() {
    if (this.userData.name != "" && this.userData.lastname != "" && this.userData.UserEmail != ""
      && this.validateEmail(this.userData.UserEmail)) {
      this.userData.UserName = this.userData.name + ' ' + this.userData.lastname;
      this.createUser(this.userData);
    }
    else {

      this.translate.get('loginIncomplete').subscribe(
        valueTranslate => {
          let alert = this.alertCtrl.create({
            title: valueTranslate.tittle,
            subTitle: valueTranslate.message,
            buttons: [valueTranslate.button]
          });
          alert.present();
        }
      );    }
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
          console.error("Error obteniendo perfil");
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
        this.userData.UserName = data.name + ' ' + data.last_name;
        this.userData.UserEmail = data.email;
        this.userData.Gender = data.gender;
        this.userData.Image = data.picture.data.url;
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
