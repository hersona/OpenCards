import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';
import { Observable } from "rxjs";
import { LogicProvider } from '../../providers/logic/logic';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
  selector: 'page-slider',
  templateUrl: 'slider.html',
})
export class SliderPage {

  paramValues: Observable<string>;
  objApp : any;
  slider1Image:string;
  slider2Image:string;
  slider3Image:string;
  slider4Image:string;

  slider1ImageIco:string;
  slider2ImageIco:string;
  slider3ImageIco:string;
  slider4ImageIco:string;

  slider1Text:string;
  slider2Text:string;
  slider3Text:string;
  slider4Text:string;

  TranslateLocal: TranslateService;

  constructor(public navCtrl: NavController, public navParams: NavParams
    , private viewCtrl: ViewController,
    translate: TranslateService,
    public _logic: LogicProvider) {
      this.TranslateLocal = translate;
  }

  ionViewWillEnter() {
    this.viewCtrl.showBackButton(false);
    this.paramValues = this._logic.getData()
    this.paramValues.subscribe((res) => {
      this.objApp = res,
      this.slider1Image = "url(../assets/imgs/" + this.objApp.infoApp[this.objApp.appDefecto].slider1Img + ")",
      this.slider2Image = "url(../assets/imgs/" + this.objApp.infoApp[this.objApp.appDefecto].slider2Img + ")",
      this.slider3Image = "url(../assets/imgs/" + this.objApp.infoApp[this.objApp.appDefecto].slider3Img + ")",
      this.slider4Image = "url(../assets/imgs/" + this.objApp.infoApp[this.objApp.appDefecto].slider4Img + ")",
      this.slider1ImageIco = this.objApp.infoApp[this.objApp.appDefecto].slider1ImgIco,
      this.slider2ImageIco = this.objApp.infoApp[this.objApp.appDefecto].slider2ImgIco,
      this.slider3ImageIco = this.objApp.infoApp[this.objApp.appDefecto].slider3ImgIco,
      this.slider4ImageIco = this.objApp.infoApp[this.objApp.appDefecto].slider4ImgIco,
      this.setTextSlider()

    })
  }

  //Asignar valores de texto de los slider dinamicamente dependiendo del idioma
  setTextSlider()
  {
    this.TranslateLocal.get(this.objApp.infoApp[this.objApp.appDefecto].slider1Text).subscribe(
      value => {
        this.slider1Text = value;
      }
    )

    this.TranslateLocal.get(this.objApp.infoApp[this.objApp.appDefecto].slider2Text).subscribe(
      value => {
        this.slider2Text = value;
      }
    )

    this.TranslateLocal.get(this.objApp.infoApp[this.objApp.appDefecto].slider3Text).subscribe(
      value => {
        this.slider3Text = value;
      }
    )

    this.TranslateLocal.get(this.objApp.infoApp[this.objApp.appDefecto].slider4Text).subscribe(
      value => {
        this.slider4Text = value;
      }
    )

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SliderPage');
  }


irHome()
{
  this.navCtrl.setRoot(HomePage);
  
}

}
