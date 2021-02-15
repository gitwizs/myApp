import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Network } from '@ionic-native/network/ngx';
import { fromEvent, merge, of, Observable } from 'rxjs';
import { mapTo } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FetchService {
  private online: Observable<boolean> = undefined;
  private valid: Observable<boolean> = undefined;

  constructor(public afs: AngularFirestore,public network: Network) { 
  this.online = Observable.create(observer => {
    observer.next(true);
    }).pipe(mapTo(true));

    this.valid = Observable.create(observer => {
      observer.next(true);
      }).pipe(mapTo(true));

    //this.valid = merge ()

    this.online = merge(
      of(navigator.onLine),
      fromEvent(window, 'online').pipe(mapTo(true)),
      fromEvent(window, 'offline').pipe(mapTo(false))
  );
  }
  public getNetworkType(): string {
    return this.network.type;
}

  public getNetworkStatus(): Observable<boolean> {
    return this.online;
}
 
}
