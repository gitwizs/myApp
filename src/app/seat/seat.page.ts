import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras } from '@angular/router';
import { FetchService } from '../api/fetch.service'
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-seat',
  templateUrl: './seat.page.html',
  styleUrls: ['./seat.page.scss'],
})
export class SeatPage implements OnInit {

  //VARS Declaration
  seats : any;
  public selectedList:Array<string> = new Array(); 
  start : boolean;
  busParams : any;
  Total : number; 
  constructor(private router: Router,private fetch :FetchService) { 
    this.busParams = this.router.getCurrentNavigation().extras.state;
    this.seats = Array(12).fill(1).map((x,i)=>i+1);
   }
  ngOnInit() {
    this.networkSubscriber();
    this.Total = parseInt(this.busParams.search.total);
  }

  seatCheck(seat : number,right : boolean){
    this.start = true;
    if(right) { 
    let index: number = this.data.indexOf('R' + seat );
      if(index > -1) {
         this.data.splice(index,1);
          this.Total++ ;     
       }
    else { 
      if(this.Total > 0) {
        this.data.push('R'+ seat);
        this.Total-- ; 
      }
     }
  }
    else {
      let index: number = this.data.indexOf('L' + seat );
      if(index > -1) {
      this.data.splice(index,1);
      this.Total++ ; 
      }
      else {
        if(this.Total > 0) {
      this.data.push('L'+ seat); 
    //this.data.push('L'+ seat);   
     this.Total-- ; 
          }
        }
      }
  
 }
 isSelected(seat : number,right : boolean){
   if(!right){
  let index: number = this.data.indexOf('L' + seat );
  if(index > -1)
  return true;
  else 
  return false;
   }
   else {
    let index: number = this.data.indexOf('R' + seat );
    if(index > -1)
    return true;
    else 
    return false;
   } 

 }
 public data = [];

  addData(data) {
    this.data.push(data);
  }
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

passenger() {
  let navigationExtras: NavigationExtras = {
    state: {
      bus: this.busParams,
      seat: this.data,
    }
  };
  this.router.navigate(['/passenger'], navigationExtras);
 }

}
