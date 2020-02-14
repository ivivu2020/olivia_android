import { Injectable } from '@angular/core';
import { ToastController, Events, Platform } from '@ionic/angular';
import { Network } from '@ionic-native/network/ngx';
import {
  Observable,
  fromEvent,
  merge,
  of
} from 'rxjs';

import {
  mapTo
} from 'rxjs/operators';

export enum ConnectionStatusEnum {
  Online,
  Offline
}

@Injectable({
  providedIn: 'root'
})
export class NetworkProvider {

  private online$: Observable < boolean > = undefined;

  constructor(public alertCtrl: ToastController, 
    public network: Network,
    public eventCtrl: Events, private platform: Platform) {
      this.online$ = Observable.create(observer => {
        observer.next(true);
      }).pipe(mapTo(true));
      if (this.platform.is('cordova') || this.platform.is('android') || this.platform.is('ios')) {
        // on Device
        this.online$ = merge(
          this.network.onConnect().pipe(mapTo(true)),
          this.network.onDisconnect().pipe(mapTo(false)));
      } else {
        // on Browser
        this.online$ = merge( of (navigator.onLine),
          fromEvent(window, 'online').pipe(mapTo(true)),
          fromEvent(window, 'offline').pipe(mapTo(false))
        );
      }
     }

     public getNetworkType(): string {
      return this.network.type
    }
  
    public getNetworkStatus(): Observable < boolean > {
      return this.online$;
    }

    public setNetworkStatus(value){
      this.online$.pipe(mapTo(value));
    }

    isOnline(): boolean {
      return navigator.onLine;
    }

    isOffline(): boolean {
      return !navigator.onLine;
    }
}
