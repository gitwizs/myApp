import { Component, OnInit } from '@angular/core';
import { FetchService } from '../api/fetch.service'
import { debounceTime, isEmpty } from 'rxjs/operators';
import { Router,NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-passenger',
  templateUrl: './passenger.page.html',
  styleUrls: ['./passenger.page.scss'],
})
export class PassengerPage implements OnInit { 

  constructor(private fetch : FetchService ,private router : Router) { 
    this.seatParams = this.router.getCurrentNavigation().extras.state;
  }

  ngOnInit() {
    this.networkSubscriber();
    //alert(this.seatParams.seat[0].toString());
    this.Seats = this.seatParams.seat.toString();
  }

  //VARS Declaration
  seatParams : any;
  Seats : string;
  MGender : string = "male";
  FGender : string = "female";
  isConnected : boolean;
  email : boolean;
  phone : boolean;
  name : boolean;
  age : boolean;
  gender : boolean;
  submit = true; 

  Passenger = [{ email : '',phone : '',name : '',age : '',gender : ''}];

  success_email = '';
  success_phone = '';
  success_name = '';
  success_age = '';

  reg = new RegExp('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')
  reg_phone = new RegExp('(0/251)?[9][0-9]{8}$');
  reg_name = new RegExp('^[A-Za-z]{3}');
  reg_age  = new RegExp('^[1-9][0-9]{1}$');

  validation(){
    if(this.Passenger[0].email !== "" &&
       this.Passenger[0].phone !== ""  &&
       this.Passenger[0].name !== "" &&
       this.Passenger[0].age !== ""
       )
      this.submit = false;
      else 
      this.submit = true; 

  }

  validate(event,type : string){
    if(type === '1') {
    if(event.target.value === "") {
      this.email = true;
    }
    else {
      if(event.target.value.match(this.reg)) {
        if(this.email)
        this.success_email = '#2fdf75';
        this.email = false;
        this.Passenger[0].email = event.target.value;
        }
      else 
      this.email = true;   
    }
  }
    else if(type === '2') {
      if(event.target.value === ""){
        this.phone = true;
      }
      else {
        if(event.target.value.match(this.reg_phone)){
          if(this.phone)
          this.success_phone = '#2fdf75';
          this.phone = false;
          this.Passenger[0].phone = event.target.value;
        }
        else 
        this.phone = true;   
      }
    }
    else if(type === '3') {
      if(event.target.value === ""){
        this.name = true;
      }
      else {
        if(event.target.value.match(this.reg_name)){
          if(this.name)
          this.success_name = '#2fdf75';
          this.name = false;
          this.Passenger[0].name = event.target.value;
        }
        else 
        this.name = true;   
      }
    }
    else if(type === '4') {
      if(event.target.value === ""){
        this.age = true;
      }
      else {
        if(event.target.value.match(this.reg_age)){
          if(this.age)
          this.success_age = '#2fdf75';
          this.age = false;
          this.Passenger[0].age = event.target.value;
        }
        else 
        this.age = true;   
      }
       }
    else if( type == '5'){
      this.Passenger[0].gender = event.value;
   } 
   this.validation();
 }

  networkSubscriber(): void {
    this.fetch
        .getNetworkStatus()
        .pipe(debounceTime(300))
        .subscribe((connected: boolean) => {
            this.isConnected = connected;
            if(!this.isConnected){
              this.validation()
            }
            else this.validation();
            //alert('isConnected' + this.isConnected);
        }); 
  }

  travelSummary() {
    let navigationExtras: NavigationExtras = {
      state: {
        seat: this.seatParams,
        passenger: this.Passenger,
      }
    };
    this.router.navigate(['/travelinfo'], navigationExtras);
   }
}
