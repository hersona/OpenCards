import { Component } from '@angular/core';
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
  sysId: number;
  objCard: any;
  strTitulo: string;
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
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public alertCtrl: AlertController, public contentprovider: ContentProvider,
    private theInAppBrowser: InAppBrowser,
    translate: TranslateService,
    public restProvider: RestProvider,
    public tasksService: TasksServiceProvider
  ) {
    this.sysId = navParams.get("sysId");

    contentprovider.getCard(translate.getDefaultLang(), this.sysId).then(
      res => (
        //console.log(res),
        this.strTitulo = res[0].fields.productoRelacionado.fields.titulo
        , this.strDescripcion = res[0].fields.productoRelacionado.fields.descripcion
        , this.strUrlCompra = res[0].fields.productoRelacionado.fields.urlTiendaProducto
        , this.objCard = res
        , this.validateCode(res[0].fields.productoRelacionado.fields.titulo)
      )
    );

  }

  //Validar si la persona ya digito previamente el codigo
  validateCode(strTitulo) {
    this.AppValidate.name = strTitulo;
    this.tasksService.getParam(this.AppValidate)
      .then(data => {
        if (data.length > 0) {
          this.goContenteDetail(this.objCard[0], this.objCard);
        }
      })
      .catch(error => {
        console.error(error);
      });

  }

  //Ir al contenido del detalle
  goContenteDetail(data, card) {
    this.navCtrl.setRoot(ContentdetailPage, {
      objData: data, objCard: card
    });
  }

  ionViewDidLoad() {

  }

  cardValidate: any = {};
  showPrompt(titulo, urlDescarga) {

    let prompt = this.alertCtrl.create({
      title: titulo,
      message: "Digita el código que se encuentra en el interior de la caja",
      inputs: [
        {
          name: 'title',
          placeholder: 'Código de descarga'
        },
      ],
      buttons: [
        {
          text: 'Descargar',
          handler: data => {
            //Obtener el usuario creado
            this.tasksService.getUser()
              .then(dataUser => {
                this.AppCode.CodeApp = data.title;
                this.AppCode.UserEmail = dataUser[0].email;
                this.AppCode.UserName = dataUser[0].name + ' ' + dataUser[0].lastname;
                this.AppCode.CodeKit = this.strTitulo;

                //Crea en el servicio y guarda en base de datos
                this.restProvider.saveTokenAcces(this.AppCode).then((result: any) => {
                  console.log(result);

                  switch (JSON.parse(result._body).Error) {
                    //Respuesta del servicio OK
                    case '0': {
                      this.ContenidoTarjeta = 'contenido';
                      //Marcar como cargado el curso
                      this.cardValidate.name = this.strTitulo;
                      this.cardValidate.valueParam = '1';
                      this.tasksService.insertParamsOpen(this.cardValidate);
                      break;
                    }
                    //Codigo no valido
                    case '1': {
                      this.ContenidoTarjeta = 'resumen';
                      let alert = this.alertCtrl.create({
                        title: 'Código no valido',
                        subTitle: 'Por favor verifica el código ingresado',
                        buttons: ['Aceptar']
                      });
                      alert.present();
                      break;
                    }
                    //Codigo ya utilizado
                    case '2': {
                      this.ContenidoTarjeta = 'resumen';
                      let alert = this.alertCtrl.create({
                        title: 'Código en uso',
                        subTitle: 'El código digitado ya se encuentra en uso por favor verifique nuevamente',
                        buttons: ['Aceptar']
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
        /*{
          text: 'Comprar',
          handler: data => {
            let target = "_system";
            this.theInAppBrowser.create(urlDescarga, target, this.options);
          }
        }
        ,*/
        {
          text: 'Cancelar',
          handler: data => {
            this.ContenidoTarjeta = 'resumen';
          }
        },
      ]
    });
    prompt.present();
  }

}
