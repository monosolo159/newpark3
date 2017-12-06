import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Vibration } from '@ionic-native/vibration';
/*
  Generated class for the ServerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServerProvider {

  private pvdLinkShort = 'http://parkingwarning.com/';
  // private pvdLinkShort = 'http://192.168.0.108/ParkingWarningWebSiteService/';


  //ที่เก็บภาพรถ
  private pvdLinkPic = this.pvdLinkShort + 'upload/images/cars/';

  private pvdLinkPicProfile = this.pvdLinkShort + 'upload/images/users/';

  private pvdLink = this.pvdLinkShort + 'index.php/application/';

  private pvdLinkPicNotification = this.pvdLinkShort + 'upload/images/notification/';

  private pvdLinkPicNews = this.pvdLinkShort + 'upload/images/news/';

  constructor(public http: HttpClient, public vibration:Vibration) {
    console.log('Hello ServerProvider Provider');
  }

  linkServer() {
    return this.pvdLink;
  }
  linkServerShort() {
    return this.pvdLinkShort;
  }
  linkServerPic() {
    return this.pvdLinkPic;
  }
  linkServerPicProfile() {
    return this.pvdLinkPicProfile;
  }
  linkServerPicNotification() {
    return this.pvdLinkPicNotification;
  }

  linkServerPicNews() {
    return this.pvdLinkPicNews;
  }

  notiVibration(time) {
    this.vibration.vibrate(time);
  }

}
