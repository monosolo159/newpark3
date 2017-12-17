import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, ModalController, AlertController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { ServerProvider } from '../../providers/server/server';
import { Geolocation } from '@ionic-native/geolocation';
import 'rxjs/add/operator/map';

import {
 GoogleMaps,
 GoogleMap,
 GoogleMapsEvent,
 GoogleMapOptions,
 CameraPosition,
 MarkerOptions,
 Marker
} from '@ionic-native/google-maps';


declare var google;

@Component({
  selector: 'page-car-service',
  templateUrl: 'car-service.html'
})
export class CarServicePage {

  @ViewChild('mapContainer') mapContainer: ElementRef;
  // map: any;
  infoWindows: any;

  map:GoogleMap;
  lat:any; long:any;

  public xxxxx = 'https://www.w3schools.com/css/trolltunga.jpg';
  public data_table: Array<{}>;
  public user_id = '';
  public mapApi ='AIzaSyBeyl5wC-Q1wBUqQh38lMITihEIolEikAo';
  public linkPic = this.server.linkServerPic();
  constructor(public googleMaps: GoogleMaps,public geolocation: Geolocation,public loadingCtrl: LoadingController, public navCtrl: NavController, public alertCtrl: AlertController, public modalCtrl: ModalController, public storage: Storage, public server: ServerProvider, public http: HttpClient) {
    console.log("page car service");
    this.infoWindows = [];
    // this.loadMap();


    // apikey android = AIzaSyB5-9pxsp17YVlcG3tkR3DsNrwA6B9v1EY
    // apikey ios = AIzaSyAhW3NoHCdw7bJZ2gAWfejdOBrHiJq1MGs
  }
  ionViewDidLoad() {
   this.loadMap();
  }
  // ionViewWillEnter() {
  //   this.displayGoogleMap();
  //   this.getMarkers();
  // }
  ionViewWillEnter() {
    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
     // data can be a set of coordinates, or an error (if an error occurred).
     // data.coords.latitude
     // data.coords.longitude
     this.lat = data.coords.latitude;
     this.long = data.coords.longitude;
     // this.loadMap();

     // console.log("2");
     // console.log(this.lat+','+this.long);
    });
  }

  // ionViewDidEnter() {
  //   // this.geolocation.getCurrentPosition().then((resp) => {
  //   //   // resp.coords.latitude
  //   //   this.lat = resp.coords.latitude;
  //   //   this.long = resp.coords.longitude;
  //   //   console.log("1");
  //   //   console.log(this.lat+','+this.long);
  //   //   // resp.coords.longitude
  //   // }).catch((error) => {
  //   //   console.log('Error getting location', error);
  //   // });
  //
  //   let watch = this.geolocation.watchPosition();
  //   watch.subscribe((data) => {
  //    // data can be a set of coordinates, or an error (if an error occurred).
  //    // data.coords.latitude
  //    // data.coords.longitude
  //    this.lat = data.coords.latitude;
  //    this.long = data.coords.longitude;
  //    this.loadMap();
  //
  //    // console.log("2");
  //    // console.log(this.lat+','+this.long);
  //   });
  //   // console.log(this.lat+','+this.long);
  //
  //   // this.displayGoogleMap();
  //   // this.getMarkers();
  //
  // }

  loadMap() {

    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: 43.0741904,
          lng: -89.3809802
        },
        zoom: 18,
        tilt: 30
      }
    };

    this.map = this.googleMaps.create('map_canvas', mapOptions);

    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        console.log('Map is ready!');

        // Now you can use all methods safely.
        this.map.addMarker({
            title: 'Ionic',
            icon: 'blue',
            animation: 'DROP',
            position: {
              lat: 43.0741904,
              lng: -89.3809802
            }
          })
          .then(marker => {
            marker.on(GoogleMapsEvent.MARKER_CLICK)
              .subscribe(() => {
                alert('clicked');
              });
          });

      });
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
