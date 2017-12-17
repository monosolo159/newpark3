import { Component } from '@angular/core';
// import { Component, ViewChild } from '@angular/core';
import { Platform, AlertController } from 'ionic-angular';
// import { App, Platform, Nav, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { OneSignal } from '@ionic-native/onesignal';
import { LoginPage } from '../pages/login/login';

import { Storage } from '@ionic/storage';
import { ServerProvider } from '../providers/server/server';
import { HttpClient } from '@angular/common/http';
// import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';

import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(public platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public server:ServerProvider,public http:HttpClient,public storage:Storage,public alertCtrl:AlertController,public _OneSignal:OneSignal) {
    // console.log(angular.version);
    storage.get('user_data').then((val) => {
      console.log(val);
      if (val == null) {
        this.rootPage = LoginPage;
        console.log("get success null");
        // console.log(val);
      } else {
        this.rootPage = TabsPage;
        console.log("get success not null");
        // console.log(val);

      }
    });


    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.platform.registerBackButtonAction(() => {
        // navigator['app'].exitApp();
        this.exit();
      });

      statusBar.styleDefault();
      splashScreen.hide();

      this.initializeApp();
    });
  }

  exit() {
    let alert = this.alertCtrl.create({
      // title: 'Confirm',
      message: 'ออกจากแอพ',
      buttons: [{
        text: "ออก",
        handler: () => { this.exitApp() }
      }, {
          text: "ยกเลิก",
          role: 'cancel'
        }]
    })
    alert.present();
  }
  exitApp() {
    this.platform.exitApp();
  }


  initializeApp() {
    // this.platform.ready().then(() => {

    this._OneSignal.startInit('6ac42896-75e0-44a6-800e-18ace3d1ffde', '141918096663');
    // this._OneSignal.inFocusDisplaying(this._OneSignal.OSInFocusDisplayOption.InAppAlert);
    this._OneSignal.inFocusDisplaying(this._OneSignal.OSInFocusDisplayOption.InAppAlert);
    this._OneSignal.enableVibrate(true);
    this._OneSignal.enableSound(true);
    this._OneSignal.setSubscription(true);
    this._OneSignal.getIds()
      .then((ids) => {
        // this.deviceId = JSON.stringify(ids);
        // console.log('getIds: ' + JSON.stringify(ids));
      });
    this._OneSignal.handleNotificationReceived().subscribe(() => {
      // handle received here how you wish.
      this.server.notiVibration([5000, 2000, 5000, 2000, 5000, 2000, 5000, 2000, 5000, 2000, 5000]);
    });
    this._OneSignal.handleNotificationOpened().subscribe(() => {
      // handle opened here how you wish.
      // Vibration.vibrate([0, 0, 0, 0, 0]);
    });
    this._OneSignal.endInit();
    // })
  }
}
