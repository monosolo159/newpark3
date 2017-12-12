import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, ModalController, AlertController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { ServerProvider } from '../../providers/server/server';
import { Geolocation } from '@ionic-native/geolocation';
import 'rxjs/add/operator/map';

declare var google;

@Component({
  selector: 'page-car-service',
  templateUrl: 'car-service.html'
})
export class CarServicePage {

  @ViewChild('mapContainer') mapContainer: ElementRef;
  map: any;
  infoWindows: any;

  public xxxxx = 'https://www.w3schools.com/css/trolltunga.jpg';
  public data_table: Array<{}>;
  public user_id = '';
  public mapApi ='AIzaSyBeyl5wC-Q1wBUqQh38lMITihEIolEikAo';
  public linkPic = this.server.linkServerPic();
  constructor(public loadingCtrl: LoadingController, public navCtrl: NavController, public alertCtrl: AlertController, public modalCtrl: ModalController, public storage: Storage, public server: ServerProvider, public http: HttpClient) {
    console.log("page car service");
    this.infoWindows = [];
  }

  // ionViewWillEnter() {
  //   this.displayGoogleMap();
  //   this.getMarkers();
  // }

  ionViewDidEnter() {
    this.displayGoogleMap();
    // this.getMarkers();
  }

  displayGoogleMap() {
    let latLng = new google.maps.LatLng(17.150914, 104.153813);

    let mapOptions = {
      center: latLng,
      disableDefaultUI: false,
      fullscreenControl: false,
      zoom: 15,
      myLocationButton: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    }
    this.map = new google.maps.Map(this.mapContainer.nativeElement, mapOptions);
  }

  getMarkers() {
    this.http.post('assets/markers.json',{})
      .subscribe(response => {
        //รับข้อมูลใส่ไว้ในตัวแปร
        // this.data_table = JSON.parse(response["_body"]);
        this.addMarkersToMap(response["_body"]);
      }, error => {
      });
  }

  addMarkersToMap(markers) {
    for(let marker of markers) {
      var position = new google.maps.LatLng(marker.latitude, marker.longitude);
      var dogwalkMarker = new google.maps.Marker({
        position: position,
        title: marker.name,
        description : marker.description
        });
      dogwalkMarker.setMap(this.map);
      this.addInfoWindowToMarker(dogwalkMarker);
    }
  }

  addInfoWindowToMarker(marker) {
    var infoWindowContent = '<div id="content"><h3 id="firstHeading" class="firstHeading">' + marker.title + '</h3></div>';
    var infoWindow = new google.maps.InfoWindow({
      content: infoWindowContent
    });
    marker.addListener('click', () => {
      this.closeAllInfoWindows();
      infoWindow.open(this.map, marker);
    });
    this.infoWindows.push(infoWindow);
  }

  closeAllInfoWindows() {
    for(let window of this.infoWindows) {
      // window.open('geo://' + 17.150914 + ',' + 104.153813 + '?q=' + 17.15106291 + ',' + 104.15644169 + '(สกลแกรนพาเรส)', '_system');
      window.close();
    }
  }

}
