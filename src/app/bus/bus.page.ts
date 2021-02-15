import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras } from '@angular/router';
import { FetchService } from '../api/fetch.service'
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-bus',
  templateUrl: './bus.page.html',
  styleUrls: ['./bus.page.scss'],
})
export class BusPage implements OnInit {

  constructor(private router: Router,private fetch: FetchService) { 
    this.searchParams = this.router.getCurrentNavigation().extras.state;
  }

  ngOnInit() {
    this.networkSubscriber();
    this.str = this.searchParams.departure;
    this.index  = this.citieAppv.findIndex(x => x.name === this.str);
    this.Departure = this.citieAppv[this.index];

    this.str = this.searchParams.arrival;
    this.index  = this.citieAppv.findIndex(x => x.name === this.str);
    this.Arrival = this.citieAppv[this.index];
    //alert(this.index);
    //this.citieAppv.name.toUpperCase().indexOf(args)
  }
  //VARS Declaration 
    searchParams : any ;
    str : string;
    index : any

    Departure : any;
    Arrival : any; 

 Buses = [
   {name:"Selam" , price:"600"},
   {name:"Noah", price:"550"},
   {name:"Sky", price:"500"}];

 citieAppv = [
  {name:'Addis Abeba',appv:"ADDX"},
  {name:'Mekelle',appv:"MQX"},
  {name:'Hawassa',appv:"HWS"},
  {name:'DireDawa',appv:"DRDA"},
  {name:'Jimma',appv:"JMA"},
  {name:'Bahirdar',appv:"BARD"},
  {name:'Gondar',appv:"GNDF"},
  {name:'Lalibela',appv:"LBX"},
  {name:'Afar',appv:"AFR"},
];
isConnected : boolean;

networkSubscriber(): void {
  this.fetch
      .getNetworkStatus()
      .pipe(debounceTime(300))
      .subscribe((connected: boolean) => {
          this.isConnected = connected;
          if(!this.isConnected){
            //this.validation()
          }
          else ;//this.validation()
          //alert('isConnected' + this.isConnected);
      });
}

seatSelection(args : any) {
  let navigationExtras: NavigationExtras = {
    state: {
      search: this.searchParams,
      bus: args,
    }
  };
  this.router.navigate(['/seat'], navigationExtras);
 }

}
