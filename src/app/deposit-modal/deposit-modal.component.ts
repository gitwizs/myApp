import { Component, OnInit ,Input } from '@angular/core';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-deposit-modal',
  templateUrl: './deposit-modal.component.html',
  styleUrls: ['./deposit-modal.component.scss'],
})
export class DepositModalComponent implements OnInit {
  @Input() city1:string;
  @Input() city2:string;
  @Input() datas: string;

  data : any;
  type : string;
  constructor(private modalCtrl: ModalController) { }

  cities = [
    {name:'Addis Abeba',value:"1"},
    {name:'Mekelle',value:"1"},
    {name:'Hawassa',value:"3"},
    {name:'DireDawa',value:"1"},
    {name:'Jimma',value:"1"},
    {name:'Bahirdar',value:"1"},
    {name:'Gondar',value:"1"},
    {name:'Lalibela',value:"1"},
    {name:'Afar',value:"1"},
  ];
  ngOnInit() {
    //this.type = '${datas}';
    //alert(this.datas);
  }
 dismissModal(city :string,value : string) :void {    
   //if(value == "1")
   this.city1 = city;
   let data = { 'city1': city };
   this.modalCtrl.dismiss(data);
 }
}
