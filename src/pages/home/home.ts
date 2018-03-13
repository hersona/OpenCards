import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ContentcardPage } from '../../pages/contentcard/contentcard';
import { RegisterPage } from '../../pages/register/register';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  viewContent(){
    this.navCtrl.push(ContentcardPage);
  }

  goToStore()
  {
    

  }
}
