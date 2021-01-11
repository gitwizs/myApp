import { Component,Input } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { stringify } from 'querystring';
import { DepositModalComponent } from '../deposit-modal/deposit-modal.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private menu: MenuController,private modalCtr :ModalController) { }
  //variable Declaration
  city: String;
  type : string;
  cityData : any = {
    "city1":"From",
    "city2":"To",
  };  
  datas :any;
  twoDisabled = true;
  item: number = 1;

  menus = [
    {"item":"Bus","icon":"bus-outline"},
    {"item":"Flight","icon":"airplane-outline"},
    {"item":"Hotel","icon":"bed-outline"},
    {"item":"Restaurant","icon":"restaurant-outline"}
  ];

  trip(type : string) {
   if(type == '1') {
    this.twoDisabled = true;
   }
   else if(type == '2'){
    this.twoDisabled = false;
   }
   else if(type == '3') {
    this.twoDisabled = false;
   }
  }

  async openModal(type : string){
    this.type = type;
       let modal = await this.modalCtr.create({
      component: DepositModalComponent,
      componentProps: { datas: '3' },
    });
    modal.onDidDismiss().then((data) => {
      const data2 = data['data'];
      if(this.type == '1')
      this.cityData['city1'] = data2.city1;
      if(this.type == '2')
      this.cityData['city2'] = data2.city1;
    }) 
    return await modal.present();
  }
  
    openFirst () {
      this.menu.enable(true, 'first');
      this.menu.open('first');
    }
  
    openEnd() {
      this.menu.open('end');
    }
  
    openCustom() {
      this.menu.enable(true, 'custom');
      this.menu.open('custom');
    }
    incrementQty() {
      if(this.item<5){
          this.item++;
      }
      else ;
    }
    decrementQty(){
      if(this.item>1){
      this.item--;
      }
      else ;
    }

}
