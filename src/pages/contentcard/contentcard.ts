import { Component, Pipe, PipeTransform } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ContentdetailPage } from '../../pages/contentdetail/contentdetail';
import { ContentProvider } from '../../providers/ContentProvider';
import { AlertController } from 'ionic-angular';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { TranslateService } from '@ngx-translate/core';
import { RestProvider } from '../../providers/rest/rest';
import { TasksServiceProvider } from '../../providers/tasks-service/tasks-service';



@IonicPage()
@Component({
  selector: 'page-contentcard',
  templateUrl: 'contentcard.html',
})
export class ContentcardPage {

  ContenidoTarjeta: string = "resumen";

  objCard: any;
  strTitulo: string;
  ImagenPrincipal: string;
  strDescripcion: string;
  strUrlCompra: string;
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

  AppCode: any = {};
  AppValidate: any = {};

  descending: boolean = false;
  order: number;
  column: string = 'name';
  buttonEnable: any = true;
  translateLocal: TranslateService;

  ionViewWillLeave() {
    this.buttonEnable = true;
  }

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public alertCtrl: AlertController, public contentprovider: ContentProvider,
    private theInAppBrowser: InAppBrowser,
    translate: TranslateService,
    public restProvider: RestProvider,
    public tasksService: TasksServiceProvider
  ) {
    this.translateLocal = translate;
    this.objCard = navParams.get("objCard");
    //Ordenar arreglo por el orden
    this.objCard.sort(function (orden1, orden2) {
      if (orden1.fields.orden < orden2.fields.orden) {
        return -1;
      } else if (orden1.fields.orden > orden2.fields.orden) {
        return 1;
      } else {
        return 0;
      }
    });
    this.strTitulo = this.objCard[0].fields.productoRelacionado.fields.titulo;
    this.ImagenPrincipal = this.objCard[0].fields.productoRelacionado.fields.imagenSuperior.fields.file.url;
    this.strDescripcion = this.objCard[0].fields.productoRelacionado.fields.descripcion;
    this.strUrlCompra = this.objCard[0].fields.productoRelacionado.fields.urlTiendaProducto;
    this.validateCode(this.objCard[0].fields.productoRelacionado.fields.tituloInterno);
  }


  //Validar si la persona ya digito previamente el codigo
  validateCode(tituloInterno) {
    this.AppValidate.name = tituloInterno;
    this.tasksService.getParam(this.AppValidate.name)
      .then(data => {
        if (data.length > 0) {
          this.ContenidoTarjeta = 'contenido';
          this.AppValidate.downloaded = true;
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  //Ir al contenido del detalle
  goContenteDetail(data, card) {
    if (this.buttonEnable) {
      this.buttonEnable = false;
      this.navCtrl.push(ContentdetailPage, {
        objData: data, objCard: card
      });
    }
  }

  cardValidate: any = {};
  showPrompt(titulo, urlDescarga) {
    this.ContenidoTarjeta = 'resumen';
    if (this.AppValidate.downloaded) {
      //Significa que ya descargo el kit
      this.ContenidoTarjeta = 'contenido';
    }
    else {

      this.translateLocal.get('CONTENCARDMESSAGEVALIDATE').subscribe(
        valueTranslate => {
          let prompt = this.alertCtrl.create({
            title: titulo,
            message: valueTranslate.message,
            inputs: [
              {
                name: 'title',
                placeholder: valueTranslate.tittle
              },
            ],
            buttons: [
              {
                text: valueTranslate.download,
                handler: data => {
                  //Obtener el usuario creado
                  this.tasksService.getUser()
                    .then(dataUser => {
                      this.AppCode.CodeApp = data.title;
                      this.AppCode.UserEmail = dataUser[0].email;
                      this.AppCode.UserName = dataUser[0].name + ' ' + dataUser[0].lastname;
                      this.AppCode.CodeKit = this.objCard[0].fields.productoRelacionado.fields.tituloInterno;

                      //Crea en el servicio y guarda en base de datos
                      this.restProvider.saveTokenAcces(this.AppCode).then((result: any) => {
                        switch (JSON.parse(result._body).Error) {
                          //Respuesta del servicio OK
                          case '0': {
                            this.ContenidoTarjeta = 'contenido';
                            //Marcar como cargado el curso
                            this.cardValidate.name = this.AppCode.CodeKit;
                            this.cardValidate.valueParam = '1';
                            this.tasksService.insertParamsOpenValue(this.cardValidate.name, this.cardValidate.valueParam);
                            break;
                          }
                          //Codigo no valido
                          case '1': {
                            this.ContenidoTarjeta = 'resumen';
                            let alert = this.alertCtrl.create({
                              title: valueTranslate.notValid,
                              subTitle: valueTranslate.codeVerify,
                              buttons: [valueTranslate.acceptButton]
                            });
                            alert.present();
                            break;
                          }
                          //Codigo ya utilizado
                          case '2': {
                            this.ContenidoTarjeta = 'resumen';
                            let alert = this.alertCtrl.create({
                              title: valueTranslate.codeUseTittle,
                              subTitle: valueTranslate.codeUseDescription,
                              buttons: [valueTranslate.acceptButton]
                            });
                            alert.present();
                            break;
                          }
                        }

                      }, (err) => {
                        console.log(err);
                      });
                    })
                    .catch(error => {
                      console.error(error);
                    });
                }
              },
              {
                text: valueTranslate.buy,
                handler: data => {
                  let target = "_system";
                  this.theInAppBrowser.create(urlDescarga, target, this.options);
                }
              }
              ,
              {
                text: valueTranslate.cancel,
                handler: data => {
                  this.ContenidoTarjeta = 'resumen';
                }
              },
            ]
          });
          prompt.present();

        }
      )



    }
  }
}
