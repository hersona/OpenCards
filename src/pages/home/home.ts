import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { ContentcardPage } from '../../pages/contentcard/contentcard';
import { ContentProvider } from '../../providers/ContentProvider';
import { SafeHtml } from "@angular/platform-browser";
import { TranslateService } from '@ngx-translate/core';
import { TasksServiceProvider } from '../../providers/tasks-service/tasks-service';
import { Network } from '@ionic-native/network';
import { AlertController } from 'ionic-angular';
import { Observable } from "rxjs";
import { LogicProvider } from '../../providers/logic/logic';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  listCards: any;
  numberCard: number;
  objRender: SafeHtml;
  objCard: any;
  ContentLocal: ContentProvider;
  TranslateLocal: TranslateService;
  objParam: any;
  AppValidate: any = {};
  buttonEnable: any = true;
  homeHeaderText:string;
  paramValues: Observable<string>;
  objApp : any;
  contentfulProducto:string;
  contentfulModuloProducto:string;

  constructor(public navCtrl: NavController,
    private menu: MenuController,
    public contentprovider: ContentProvider,
    translate: TranslateService,
    public tasksService: TasksServiceProvider,
    private network: Network,
    public alertCtrl: AlertController,
    public _logic: LogicProvider
  ) {
    this.ContentLocal = contentprovider;
    this.TranslateLocal = translate;

    //Validar si tiene una coleccion valida para guardar contenido
    if (this.network.type != 'none') {
      //Almacenar contenido modo desconectado
      this.ContentLocal.getCards(translate.getDefaultLang(),this.contentfulProducto)
        .then(
          res => (
            this.tasksService.insertParamsOpenValue('HomeDataSet', JSON.stringify(res)),
            this.getContentDataBase()
          ));
    }
    else {
      this.getContentDataBase();
    }
  }


  ionViewWillEnter() {
    this.menu.enable(true, 'Menu1');
    this.paramValues = this._logic.getData()
    this.paramValues.subscribe((res) => {
      this.objApp = res,
      this.setText()
    })
  }

  //Asignar valores de texto y valores defecto de busqueda
  setText()
  {
    this.TranslateLocal.get(this.objApp.infoApp[this.objApp.appDefecto].homeHeaderText).subscribe(
      value => {
        this.homeHeaderText = value;
      }
    )

    this.TranslateLocal.get(this.objApp.infoApp[this.objApp.appDefecto].contentfulProducto).subscribe(
      value => {
        this.contentfulModuloProducto = value;
      }
    )

    this.TranslateLocal.get(this.objApp.infoApp[this.objApp.appDefecto].contentfulModuloProducto).subscribe(
      value => {
        this.contentfulModuloProducto = value;
      }
    )


  }

  ionViewWillLeave() {
    this.buttonEnable = true;
  }

  getContentDataBase() {
    this.AppValidate.name = 'HomeDataSet';
    this.tasksService.getParam(this.AppValidate.name)
      .then(data => {
        if (data.length > 0) {
          this.listCards = JSON.parse(data[0].valueParam);
          //Ordenar arreglo por el orden
          this.listCards.sort(function (orden1, orden2) {
            if (orden1.fields.orden < orden2.fields.orden) {
              return -1;
            } else if (orden1.fields.orden > orden2.fields.orden) {
              return 1;
            } else {
              return 0;
            }
          });
        }
        else {
          this.messageInternetNoValid();
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  messageInternetNoValid() {
    this.TranslateLocal.get('internetConnection').subscribe(
      valueTranslate => {
        let alert = this.alertCtrl.create({
          title: valueTranslate.tittle,
          subTitle: valueTranslate.message,
          buttons: [valueTranslate.button]
        });
        alert.present();
      }
    );
  }

  contentNotAvalaible() {
    this.buttonEnable = true;
    let alert = this.alertCtrl.create({
      title: 'Próximamente',
      subTitle: 'Estamos trabajando en tener todos nuestros contenidos digitales, te informaremos tan pronto estén disponibles',
      buttons: ['Continuar']
    });
    alert.present();
  }

  //Ver contenido del manual
  viewContent(sysIdValue) {
    if (this.buttonEnable) {
      this.buttonEnable = false;
      //Validar si tiene una coleccion valida para guardar contenido
      if (this.network.type != 'none') {
        //Almacenar contenido modo desconectado
        this.ContentLocal.getCard(this.TranslateLocal.getDefaultLang(),this.contentfulModuloProducto, sysIdValue).then(
          res => (
            this.tasksService.insertParamsOpenValue(sysIdValue, JSON.stringify(res)),
            this.getContentDetailDataBase(sysIdValue)
          )
        );
      }
      else {
        this.getContentDetailDataBase(sysIdValue);
      }
    }
  }

  //Obtener contenido de la base de datos
  getContentDetailDataBase(idContent) {
    this.AppValidate.name = idContent;
    this.tasksService.getParam(this.AppValidate.name)
      .then(data => {
        if (data.length > 0) {
          this.objCard = JSON.parse(data[0].valueParam);
          if (this.objCard.length > 0) {
            this.navCtrl.push(ContentcardPage, {
              objCard: this.objCard
            });
          }
          else {
            this.contentNotAvalaible();
          }
        }
        else {
          this.messageInternetNoValid();
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  goToStore() {
    window.open('http://openmind-store.com', '_system');
  }



  showMenu() {
    this.menu.toggle();
  }

}
