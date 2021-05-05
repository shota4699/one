import { Component, OnInit ,ViewChild,ViewChildren,QueryList} from '@angular/core';
import {MapInfoWindow,MapMarker,GoogleMap} from '@angular/google-maps';
import { Router } from '@angular/router';
import{GlobalService} from '../global.service';
@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

  constructor(
    public gs : GlobalService,
    private router : Router,
  ) {}
  id:string="";
  email:string="";
  prefecture:string="";
  password:string="";
  postObj: any={};
  returnObj: any={};


  @ViewChildren(MapInfoWindow) infoWindow: QueryList<MapInfoWindow>;
  @ViewChild(GoogleMap,{static:false})map:GoogleMap;
  zoom = 16;
  server:any={};
  // 東新宿駅の座標
  //localStorage.spot: google.maps.LatLngLiteral;
  center: google.maps.LatLngLiteral;
  markerPositions:any[]=[
    {
      kind:[1, 1, 1],
      lat: 32.804210,
      lng: 130.707999,
      des: "https://www.google.co.jp/maps/@32.8032337,130.7109053,16z?hl=ja"
    },
    {
      kind:[1, 0, 1],
      lat:32.802167,
      lng: 130.714364,
      des:"two"
    },
    {
      kind:[0, 0, 1],
      lat:32.801734, 
      lng: 130.709987,
      des :"three"
    }
  ];
  //addMarker(event: google.maps.MapMouseEvent){
    ionViewWillEnter(){
    this.markerPositions.push(
      /*event.latLng.toJSON()*//*{
      lat: 32.87642991138389,
      lng: 130.74612078150454
    },
    {
      lat:32.879094,
      lng: 130.745856
    }*/);
  //} 
  }
  openInfoWindow(marker: MapMarker,windowIndex: number){
    /// stores the current index in forEach
  let curIdx = 0;
  this.infoWindow.forEach((window: MapInfoWindow) => {
    if (windowIndex === curIdx) {
      window.open(marker);
      curIdx++;
    } else {
      curIdx++;
    }
  });
}
  // 地図のオプション
  options: google.maps.MapOptions = {
    disableDefaultUI: true
  };

   // 現在位置マーカーの座標
   currentPosition: google.maps.LatLngLiteral;
   // 現在位置マーカーのオプション
   currentPositionMarkerOption: google.maps.MarkerOptions = {
     icon: {
       url: "http://140.227.58.187/302/main/image/trash_post2.png",
       scaledSize: new google.maps.Size(64, 64)
     }
   };
   
   MarkerOption: google.maps.MarkerOptions = {
    icon: {
      url: "http://140.227.58.187/302/main/image/trash_post1.png",
      scaledSize: new google.maps.Size(64, 64)
    }
  };

  
  ngOnInit() {
    // 現在位置を取得する。
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.currentPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        localStorage.spot=this.center;
      });
    }
  }
  onCurrentPositionMarkerClick(marker: MapMarker) {
    // 地図をマーカーの座標までパンさせる。
    this.map.panTo(marker.getPosition());
  }
  singup =()=>{
    this.postObj['id'] = this.id;
    this.postObj['email'] = this.email;
    this.postObj['prefecture'] = this.prefecture;
    this.postObj['password'] = this.password;
    const body = this.postObj;

    this.gs.http('http://140.227.58.187/302/main/inquiry.php',body).subscribe(
      res =>{
        this.returnObj = res;
        if(this.returnObj['stats']==200){
          //this.alertSuccess();
          this.router.navigate(['/login']);
        }
        else{
          //this.alertFailer();
        }
      }
    )
  }
}