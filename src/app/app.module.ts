import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { TabsPage } from '../pages/tabs/tabs';



import { LoginPage } from '../pages/login/login';
import { NotificationPage } from '../pages/notification/notification';
import { ProfilePage } from '../pages/profile/profile';
import { EmergencyPage } from '../pages/emergency/emergency';
import { NewsPage } from '../pages/news/news';
import { CarPage } from '../pages/car/car';
import { CarServicePage } from '../pages/car-service/car-service';





// import { NgModule } from '@angular/core';
import { NewsDetailPage } from './../pages/news-detail/news-detail';
import { RegisterPage } from '../pages/register/register';
import { ForgotPasswordPage } from '../pages/forgot-password/forgot-password';
import { EditPasswordPage } from '../pages/edit-password/edit-password';
import { CarAddPage } from '../pages/car-add/car-add';
import { CarDetailPage } from '../pages/car-detail/car-detail';
import { NotificationAddPage } from '../pages/notification-add/notification-add';
import { NotificationCorrectPage } from '../pages/notification-correct/notification-correct';
import { ProfileEditPage } from '../pages/profile-edit/profile-edit';
import { ProfileSettingPage } from '../pages/profile-setting/profile-setting';

import { MomentModule } from 'angular2-moment';
import 'moment/locale/th';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ServerProvider } from '../providers/server/server';
import { Vibration } from '@ionic-native/vibration';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { OneSignal } from '@ionic-native/onesignal';
import { FileTransfer } from '@ionic-native/file-transfer';
// import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';
// import { Camera, CameraOptions } from '@ionic-native/camera';
import { Crop } from '@ionic-native/crop';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMaps } from '@ionic-native/google-maps';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    LoginPage,
    NotificationPage,
    ProfilePage,
    EmergencyPage,
    NewsPage,
    CarPage,
    CarServicePage,
    NewsDetailPage,
    RegisterPage,
    ForgotPasswordPage,
    EditPasswordPage,
    CarAddPage,
    CarDetailPage,
    NotificationAddPage,
    NotificationCorrectPage,
    ProfileEditPage,
    ProfileSettingPage
  ],
  imports: [
    MomentModule,
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    LoginPage,
    NotificationPage,
    ProfilePage,
    EmergencyPage,
    NewsPage,
    CarPage,
    CarServicePage,
    NewsDetailPage,
    RegisterPage,
    ForgotPasswordPage,
    EditPasswordPage,
    CarAddPage,
    CarDetailPage,
    NotificationAddPage,
    NotificationCorrectPage,
    ProfileEditPage,
    ProfileSettingPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Vibration,
    OneSignal,
    FileTransfer,
    File,
    Camera,
    Crop,
    Geolocation,
    GoogleMaps,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ServerProvider
  ]
})
export class AppModule {}
