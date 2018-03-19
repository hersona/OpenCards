import { Component } from '@angular/core';
import { MenuController,IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';

/**
 * Generated class for the ContentdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contentdetail',
  templateUrl: 'contentdetail.html',
})
export class ContentdetailPage {

  profileSettings = {
    page: 'profile',
    pageTitleKey: 'SETTINGS_PAGE_PROFILE'
  };


  pages: Array<{title: string, component: any}>;

  constructor(private menu: MenuController, private nav: NavController,public navParams: NavParams){
    // If we navigated to this page, we will have an item available as a nav param
    this.profileSettings.page = "Metodo 1";
    
    this.pages = [
      { title: 'Metodo 1', component: HomePage },
      { title: 'Metodo 2', component: HomePage },
      { title: 'Metodo 3', component: HomePage }
    ];
  }

  ionViewWillEnter() {
    this.menu.enable(true, 'menu1');
  }  

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  swipeEvent(e) {
    alert("netro");
    console.log(0);
    if(e.direction == '2'){
       console.log(1);
    }
    else if(e.direction == '4'){
      console.log(2);
    }
  }

  tapEvent($event) {
      alert('' + $event.direction);
  }

  cambiarContenido(contenido)
  {
    console.log(contenido);
    this.profileSettings.page = contenido.title;
  }

  itemTapped(item) {
    // That's right, we're pushing to ourselves!
    this.nav.push(ContentdetailPage, {
      item: item
    });
  }

}
