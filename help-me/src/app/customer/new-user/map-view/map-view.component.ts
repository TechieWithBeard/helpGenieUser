import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { debounceTime, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoadingController } from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageServiceService } from 'src/app/storage-service.service';
import { Coordinates } from '../../model/user-data.model';
import { Geolocation } from '@capacitor/geolocation';
import { GoogleMap } from '@capacitor/google-maps';
import * as L from 'leaflet';
declare var google: any;

@Component({
  selector: 'app-map-view',
  standalone:true,
  imports:[CommonModule,IonicModule,FormsModule],
  templateUrl: './map-view.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  styleUrls: ['./map-view.component.scss'],
})
export class MapViewComponent  implements OnInit {
  public map!: L.Map;
  isOpenMaps:boolean=false;
  coordinates:Coordinates|null=null;
  searchInput: string="";
  dropdownOptions: any[]=[]; 
  showPopup: boolean = false;
  private searchSubject: Subject<string> = new Subject<string>();
  markerId!:L.Marker
  newMap:GoogleMap|null=null;
  loading!:HTMLIonLoadingElement
  mode:"update"|"add"|"new"="new"


  constructor(public route:ActivatedRoute,private loadingCtrl: LoadingController,public router:Router,public storage:StorageServiceService) { }

  ngOnInit() {

        this.searchSubject.pipe(
      debounceTime(2000) // Debounce for 2 seconds
    ).subscribe(() => {
      this.searchPlace();
    });

    try{
      let isMode= this.route?.snapshot?.paramMap?.get('mode')! as "update"|"add"|"new"|null;
      if(isMode){
       this.mode=isMode
      }
    }catch(ex){
      console.log(ex)
    }

    this.mapDelayLoader()
  }

  saveLocation(){

    // this.isOpenMaps=false;
    this.storage.set("coordinates",JSON.stringify(this.coordinates))
    if(this.mode=="new"){
      this.router.navigate(['/register'])
    }else{
    this.router.navigate(['/home/settings/edit-address/'+this.mode])

    }

  }


  mapDelayLoader(){
    // setTimeout( () => { this.loadMap(); }, 1000);
    this.loadLeafMap()
  }

  loadLeafMap(){
    this.map = L.map('map',{
      
      zoom: 25
    })

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 25,
        attribution: '© OpenStreetMap'
    }).addTo(this.map);
    this.map.locate({setView: true, maxZoom: 25});

    
  
  this.map.on('locationfound', (e)=>{
    var radius = e.accuracy;
    this.map.setView(e.latlng,19)
    this.addMarker(e.latlng.lat,e.latlng.lng)
  });

  }


  getCurrentLocation(){
   
    try{
      if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) =>{
     
      this.coordinates={lat:position.coords.latitude,lng:position.coords.longitude}
      this.storage.set("coordinates",JSON.stringify(this.coordinates))
     this.map.locate({setView: true, maxZoom: 19});
      this.addMarker(position.coords.latitude,position.coords.longitude)

          });
    }
    }
    catch(ex){
      this.addMarker(12.98863,77.75961)
    }
  
}


  
pinplace(placeid:string,placename:string){
  if (placeid) {

    this.searchInput=placename
   let geocoder = new google.maps.Geocoder();

   geocoder.geocode({ placeId: placeid }).then(async ({ results }:any) => {
this.showPopup=false
this.addMarker(results[0].geometry.location.lat(), results[0].geometry.location.lng(),)
      });

  }
  
}



  async showLoading() {
    try{
      this.loading = await this.loadingCtrl.create({
        message: 'Loading Current location',
        duration: 4000,
      });
    
      this.loading.present();
    }catch(ex){
console.error(ex)
    }

    
  }


  // async loadMap(){
  //   this.showLoading()
  //     console.log("map loading")
  //     let mapRef = document.getElementById('map');
  //     console.log("map object found")
  //     if(this.loading){
  //       this.loading.dismiss();
  //      }
  //     if(mapRef){
  
  
  //       try{
  //         if(navigator.geolocation) {
  //           Geolocation.getCurrentPosition().then((position:any) =>{
             
         
  //             // alert(coordinates)
  //         this.coordinates={lat:position.coords.latitude,lng:position.coords.longitude}
  //             });
  //       }
  //       }
  //       catch(ex){
  //         // this.addMarker(12.98863,77.75961)
  //       }
      
       
  
  //       this.newMap =await GoogleMap.create({
          
  //         id: 'my-map', // Unique identifier for this map instance
  //         element: mapRef, // reference to the capacitor-google-map element
  //         apiKey: environment.GMAP_API_KEY, // Your Google Maps API Key
  //         config: {
  //           center: {
  //             // The initial position to be rendered by the map
  //             lat: this.coordinates?.lat?this.coordinates?.lat:11.8666652,
  //             lng: this.coordinates?.lng?this.coordinates?.lng:75.3595632,
  //           },
            
  //           zoom: 18, 
        
  //           // mapTypeControl:false
  //           // The initial zoom level to be rendered by the map
  //         },
          
  //       });
  
  
  //   //     const input = document.getElementById("pac-input") as HTMLInputElement;
  //   // const searchBox = new google.maps.places.SearchBox(input);
  
  //      // this.addNecktarMarker(12.988390190405154,77.75958086181566);
  //     // this.newMap.enableTouch()
  //       this.newMap.enableCurrentLocation(true);
  //       // this.newMap.enableAccessibilityElements(true);
       
      
  //       try{
  //           Geolocation.getCurrentPosition().then((position) =>{
         
  //               var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
  //            console.log("current location: "+latlng  );
  //           // let [a,b]=latlng;
    
  //            this.addMarker(position.coords.latitude,position.coords.longitude)
  
  //         this.coordinates={lat:position.coords.latitude,lng:position.coords.longitude}
  //           // this.newMap?.setCamera({coordinate:this.coordinates})
  //           // this.newMap?.setCenter(newLatLng);
      
          
  //         // marker.setPosition(latlng);
  //               // map.setCenter(latlng);
  //               // clearInterval(animationInterval);
  //               // $('#you_location_img').css('background-position', '-144px 0px');
  //           });
  //       }
  //       catch(ex){
  //         // alert("asdasd"+ex)
  //         // this.addMarker(12.98863,77.75961)
  //       }
      
  //       await this.newMap.setOnMapClickListener((e:any)=>{
  //         this.coordinates={lat:e.latitude,lng:e.longitude}
  //         this.addMarker( this.coordinates.lat, this.coordinates.lng)
   
  //       })
  //       await this.newMap.setOnMarkerClickListener((e:any)=>{
  //         console.log(e)
  //       })
  //       await this.newMap.setOnMarkerDragEndListener((e:any)=>{
  //         console.log(e)
  //         this.coordinates={lat:e.latitude,lng:e.longitude}
   
      
  
  //       })
  //      // const marker = new google.maps.Marker({map: this.newMap, draggable: false});
  //     }else{
  //       if(this.loading){
  //         this.loading.dismiss();
  //        }
  //     }
  
  
  
  
    
  // }

  
  // pinplace(placeid:string){

  
  //   if (placeid) {
  
  //    let geocoder = new google.maps.Geocoder();
  
  //    geocoder
  //       .geocode({ placeId: placeid })
  //       .then(async ({ results }:any) => {
  // // results[0].geometry.location
  
  // await this.newMap?.setCamera({
  //   coordinate: {
  //     lat: results[0].geometry.location.lat(),
  //     lng: results[0].geometry.location.lng(),
  //   }
  // });
  // this.showPopup=false
  // this.addMarker(results[0].geometry.location.lat(), results[0].geometry.location.lng(),)
  //       });
  
  //   }
    
  // }
  onKeyUp(event: any): void {
    console.log(event)
    this.searchSubject.next(event.target.value);
    this.showPopup = true;
  }
  
  

  searchPlace(){
    let autocompleteService = new google.maps.places.AutocompleteService();
  
    autocompleteService.getPlacePredictions({ input: this.searchInput },(predictions:any, status:any)=> {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        // Populate dropdown with predictions
        this.dropdownOptions=[]
  
        predictions?.forEach((prediction:any) =>{
          const option = document.createElement('option');
          option.value = prediction.place_id;
          option.textContent = prediction.description;
          this.dropdownOptions.push(option);
        });
      }
    });
  
  
  
  
  }



  // async addMarker(lat:number,lang:number){

  //   try{
  // if(this.markerId){
  //     this.newMap?.removeMarker(this.markerId)
  //   }
 
  //   }
  //   catch(ex){
  //     console.error(ex)
  //   }
  //   this.markerId=await this.newMap?.addMarker({
  //     draggable:true,
  //     coordinate: {
  //       lat: lat,
  //       lng: lang
  //     },
  //     title:"Help Genie Provider Location"

  //   });

  

  //   await this.newMap?.setCamera({
  //     coordinate: {
  //       lat: lat,
  //       lng: lang,
  //     },
  //     zoom: 18,
  //     animate:true
  //   });













  //   // const request = {
  //   //   location: new google.maps.LatLng(lat,lang),
  //   //   radius: '50', 
  //   // };

  //   // var service = new google.maps.places.PlacesService(this.newMap);

  //   // service.nearbySearch(request, (results: any, status: any) => {
  //   //   if (status === google.maps.places.PlacesServiceStatus.OK) {
      
  //   //     console.log(results)
  //   //   } else {
  //   //     console.error('PlacesService error:', status);
  //   //   }
  //   // });





















  
  
  // }
  
  async addMarker(lat:number,lang:number){
    //   try{
  
  
  
  
  
  
  if(this.markerId){
    this.map.removeLayer(this.markerId)
  }
  this.map.setView([lat,lang],17)
  this.coordinates={lat:lat,lng:lang}
  this.storage.set("coordinates",JSON.stringify(this.coordinates))
    this.markerId=L.marker([lat,lang],{
      draggable:true
    }).addTo(this.map)
          .bindPopup("You are here").openPopup();
  
          this.markerId.addEventListener('dragend',(event)=>{
              console.log(event)
              var position =  this.markerId.getLatLng();
              console.log(position)
              this.coordinates=position
              this.storage.set("coordinates",JSON.stringify(this.coordinates))
          })
    
    }

  async locateMe(){
    this.getCurrentLocation()
  }

}
