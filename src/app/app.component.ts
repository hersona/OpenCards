import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { SliderPage } from '../pages/slider/slider';
import { SettingopenPage } from '../pages/settingopen/settingopen';
import { ContentProvider } from '../providers/ContentProvider';
import { OneSignal } from '@ionic-native/onesignal';
import { SQLite } from '@ionic-native/sqlite';
import { TasksServiceProvider } from '../providers/tasks-service/tasks-service';
import { TranslateService } from '@ngx-translate/core';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { Http } from '@angular/http';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  ContentLocal: ContentProvider;
  objCard: any;
  rootPage: any = LoginPage;
  pages: Array<{ title: string, component: any, typeComponent: any }>;
  options: InAppBrowserOptions = {
    location: 'yes',//Or 'no'
    hidden: 'no', //Or  'yes'
    clearcache: 'yes',
    clearsessioncache: 'yes',
    zoom: 'yes',//Android only ,shows browser zoom controls
    hardwareback: 'yes',
    mediaPlaybackRequiresUserAction: 'no',
    shouldPauseOnSuspend: 'no', //Android only
    closebuttoncaption: 'Close', //iOS only
    disallowoverscroll: 'no', //iOS only
    toolbar: 'yes', //iOS only
    enableViewportScale: 'no', //iOS only
    allowInlineMediaPlayback: 'no',//iOS only
    presentationstyle: 'pagesheet',//iOS only
    fullscreen: 'yes',//Windows only
  };
  languagueParam: any = {};
  sliderValidate: any = {};

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
    private oneSignal: OneSignal,
    private alertCtrl: AlertController,
    public tasksService: TasksServiceProvider,
    public sqlite: SQLite,
    private translate: TranslateService,
    private theInAppBrowser: InAppBrowser,
    public contentprovider: ContentProvider,
    public http: Http
  ) {

    this.initializeApp();

    this.ContentLocal = contentprovider;

  }

  initializeApp() {
    this.platform.ready().then(() => {

      this.http.get('assets/data/AppSettings.json').map(res => console.log(res.json()));

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.show();

      //Configuraciones generales
      this.setConfigurations();

      //Notificaciones Push
      this.handlerNotifications();


    });
  }


  private setConfigurations() {
    this.sqlite.create({
      name: 'opencards.db',
      location: 'default' // the location field is required
    })
      .then((db) => {
        this.tasksService.setDatabase(db);
        this.tasksService.truncate();
        this.tasksService.createTable();

        //Revisar si ya cargo el slide previo o no
        this.tasksService.getParam('viewSlider')
        .then(data => {
          if (data.length > 0) {
            this.nav.push(HomePage);
          }
          else
          {
            this.tasksService.insertParamsOpenValue('viewSlider', 'true');
            this.nav.push(SliderPage);
          }
        })
        .catch(error => {
          console.error(error);
        });

        //Asignar lenguaje
        let browserLang = this.translate.getBrowserLang();

        this.languagueParam.name = 'languageApp';
        this.tasksService.getParam(this.languagueParam.name)
          .then(data => {
            if (data.length > 0) {
              console.log("NAVEGADOR" + data[0].valueParam);
              //Asignar el valor del navegador
              this.translate.setDefaultLang(data[0].valueParam);
              this.translate.use(data[0].valueParam);

              console.log("VALOR DEFECTO" + this.translate.getDefaultLang());

              //Inicializar con lenguaje por defecto
              this.ContentLocal.getLanguageContentFul(this.translate.getDefaultLang());
            }
            else {
              this.languagueParam.valueParam = browserLang;
              this.tasksService.insertParamsOpenValue(this.languagueParam.name, this.languagueParam.valueParam);
              this.translate.setDefaultLang(browserLang);
              this.translate.use(browserLang);
              //Inicializar con lenguaje por defecto
              this.ContentLocal.getLanguageContentFul(this.translate.getDefaultLang());
            }

            //Inicializar objeto del menu
            this.translate.get(['BOOKSTORE', 'LANGUAGE', 'BUY', 'ABOUTOPEN', 'ABOUTOPENCARDS', 'HELPOPEN']).subscribe(
              value => {
                // used for an example of ngFor and navigation
                this.pages = [
                  { title: value.BOOKSTORE, component: HomePage, typeComponent: 'PAGE' },
                  { title: value.LANGUAGE, component: SettingopenPage, typeComponent: 'PAGE' },
                  { title: value.BUY, component: 'http://openmind-store.com/', typeComponent: 'URL' },
                  { title: value.ABOUTOPEN, component: 'https://www.openmind-global.com/nosotros', typeComponent: 'URL' },
                  { title: value.ABOUTOPENCARDS, component: 'http://www.opencards.co/', typeComponent: 'URL' },
                  { title: value.HELPOPEN, component: 'https://www.openmind-global.com/Contactenos', typeComponent: 'URL' },
                ];

              }
            )

          })
          .catch(error => {
            console.error(error);
          });

      })
      .then(() => {
        this.splashScreen.hide();
      })
      .catch(error => {
        console.error(error);
      });
  }

  private handlerNotifications() {
    this.oneSignal.startInit('ed0d9b69-1d1c-469f-a50b-f953cc47bea8', '760511075014');
    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
    this.oneSignal.handleNotificationOpened()
      .subscribe(jsonData => {

        console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
        //Validar si la notificación tiene comportamiento
        if (jsonData.notification.payload.additionalData != null) {
          //Notificaciones para redireccionar a una pagina
          if (jsonData.notification.payload.additionalData.page != null) {
            let target = "_system";
            this.theInAppBrowser.create(jsonData.notification.payload.additionalData.page, target, this.options);
          }

          //DYLAN
          //Contenido en especifico
          /*if (jsonData.notification.payload.additionalData.product != null) {
            console.log(jsonData.notification.payload.additionalData.product);
            this.ContentLocal.getCard(this.translate.getDefaultLang(), jsonData.notification.payload.additionalData.product).then(
              res => (
                this.objCard = res,
                this.nav.push(ContentcardPage, {
                  objCard: this.objCard
                })
              )
            );
          }*/
        }
        else {
          //Mensaje informativo
          let alert = this.alertCtrl.create({
            title: jsonData.notification.payload.title,
            subTitle: jsonData.notification.payload.body,
            buttons: ['OK']
          });
          alert.present();
        }
      });
    this.oneSignal.endInit();
  }

  openPage(page) {
    console.log(page);
    switch (page.typeComponent) {
      case 'PAGE': {
        this.nav.setRoot(page.component);
        this.nav.push(page.component);
        break;
      }
      case 'URL': {
        let target = "_system";
        this.theInAppBrowser.create(page.component, target, this.options);
        break;
      }
    }
  }
}
