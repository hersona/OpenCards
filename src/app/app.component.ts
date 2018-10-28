import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { SettingopenPage } from '../pages/settingopen/settingopen';
import { ContentProvider } from '../providers/ContentProvider';
import { ContentcardPage } from '../pages/contentcard/contentcard';
import { OneSignal } from '@ionic-native/onesignal';
import { SQLite } from '@ionic-native/sqlite';
import { TasksServiceProvider } from '../providers/tasks-service/tasks-service';
import { TranslateService } from '@ngx-translate/core';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';


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


  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
    private oneSignal: OneSignal,
    private alertCtrl: AlertController,
    public tasksService: TasksServiceProvider,
    public sqlite: SQLite,
    private translate: TranslateService,
    private theInAppBrowser: InAppBrowser,
    public contentprovider: ContentProvider
  ) {

    this.initializeApp();

    this.ContentLocal = contentprovider;

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Libreria', component: HomePage, typeComponent: 'PAGE' },
      { title: 'Idiomas', component: SettingopenPage, typeComponent: 'PAGE' },
      { title: 'Comprar', component: 'http://openmind-store.com/', typeComponent: 'URL' },
      { title: 'Acerca de Openmind', component: 'https://www.openmind-global.com/nosotros', typeComponent: 'URL' },
      { title: 'Acerca de Open Cards', component: 'http://www.opencards.co/', typeComponent: 'URL' },
      { title: 'Ayuda', component: 'https://www.openmind-global.com/Contactenos', typeComponent: 'URL' },
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.show();

      //Notificaciones Push
      this.handlerNotifications();
      //Base de datos
      this.setDataBaseConfig();
      //Language
      this.translate.addLangs(["", "es"]);
      let browserLang = this.translate.getBrowserLang();
      this.translate.setDefaultLang(browserLang);
      //Inicializar con lenguaje por defecto
      this.ContentLocal.getLanguageContentFul(this.translate.getDefaultLang());
    });
  }


  private setDataBaseConfig() {
    this.sqlite.create({
      name: 'opencards.db',
      location: 'default' // the location field is required
    })
      .then((db) => {
        this.tasksService.setDatabase(db);
        //this.tasksService.truncate();
        this.tasksService.createTable();

        //Revisar si ya esta creado previamente lo debe enviar al home
        this.tasksService.getUser()
          .then(data => {
            if (data.length > 0) {
              this.rootPage = HomePage;
            }
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

          //Contenido en especifico
          if (jsonData.notification.payload.additionalData.product != null) {
            console.log(jsonData.notification.payload.additionalData.product);
            this.ContentLocal.getCard(this.translate.getDefaultLang(), jsonData.notification.payload.additionalData.product).then(
              res => (
                this.objCard = res,
                this.nav.push(ContentcardPage, {
                  objCard: this.objCard
                })
              )
            );
          }
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
        //this.nav.setRoot(page.component);
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
