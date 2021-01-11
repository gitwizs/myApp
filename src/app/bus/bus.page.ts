import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bus',
  templateUrl: './bus.page.html',
  styleUrls: ['./bus.page.scss'],
})
export class BusPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
 Buses = [{name:"Selam"},{name:"Noah"},{name:"Sky"}];
}
