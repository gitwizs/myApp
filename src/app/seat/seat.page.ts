import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seat',
  templateUrl: './seat.page.html',
  styleUrls: ['./seat.page.scss'],
})
export class SeatPage implements OnInit {
  seats : any;
  public selectedList:Array<string> = new Array(); 
  start : boolean;
  constructor() {
    this.seats = Array(12).fill(1).map((x,i)=>i+1);
   }
  ngOnInit() {
    
  }

  seatCheck(seat : number,right : boolean){
    this.start = true;
    if(right) { 
    let index: number = this.data.indexOf('R' + seat );
      if(index > -1)
    this.data.splice(index,1);
    else 
    this.data.push('R'+ seat); 
  }
    else {
      let index: number = this.data.indexOf('L' + seat );
      if(index > -1)
      this.data.splice(index,1);
      else 
      this.data.push('L'+ seat); 
    //this.data.push('L'+ seat);   
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
}
