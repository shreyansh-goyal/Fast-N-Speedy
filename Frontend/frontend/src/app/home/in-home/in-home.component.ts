import { Component, OnInit } from '@angular/core';
import {HomeService} from "../home.service"; 
import {RestaurantModel} from "../RestaurantModel/restaurant.model";
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-in-home',
  templateUrl: './in-home.component.html',
  styleUrls: ['./in-home.component.css']
})
export class InHomeComponent implements OnInit {
  restaurants:RestaurantModel[];
  images = ["http://www.btwindia.com/assets/images/banner/New/Banners-02.jpg","http://www.btwindia.com/assets/images/banner/New/Banners-03.jpg"]
  activeImage=["http://www.btwindia.com/assets/images/banner/New/Banners-01.jpg"]
  private items: any[] = [{
    id: '1',
    value: 21
  },{
    id: '2',
    value: 4
  },{
    id: '4',
    value: 12
  },{
    id: '8',
    value: 11
  }];
  userData:Observable<{user}>;
  user:any={};
  constructor(private home:HomeService,private store:Store<{User:{user}}>,private router:Router) {
   }
  ngOnInit() {
    this.userData=this.store.select('User');
    this.userData.subscribe(
      (data)=>{
        this.user=data.user;

      },
      (err)=>{},
      ()=>{}
    )
    console.log(this.user);
    if(!this.user.jwtToken)
    {
      this.router.navigate(["/home"]);
    }
    this.home.getBanners().subscribe(
      (data:any)=>{
        if(data.length)
        {
          let bannerArray=data[0].Details.banners;
          console.log(bannerArray);
          this.activeImage=[bannerArray[0]];
          this.images=bannerArray.slice(1);
        }
        else
        {
          alert("No images");
        }
      },
      (err)=>{
        alert("Error in loading banner pages");
      },
      ()=>{

      }
    )
    this.home.getRestaurants().subscribe(
      (data:any)=>{
        let x=[];
        // for(let i of data)
        // {
        //   let lat1=i.Details.latitude;
        //   let lon1=i.Details.longitude;
        //   let lat2=this.user.latitude;
        //   let lon2=this.user.longitude;
        //   var R = 6371;
        //   var dLat = (3.14*(lat2-lat1))/180;
        //   var dLon = (3.14*(lon2-lon1))/180; 
        //   var a = 
        //     Math.sin(dLat/2) * Math.sin(dLat/2) +
        //     Math.cos((3.14*(lat1))/180) * Math.cos((3.14*(lat2))/180) * 
        //     Math.sin(dLon/2) * Math.sin(dLon/2); 
        //   var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        //   var d = R * c;
        //   console.log(d);
        //   if(d<25)
        //   {
        //     x.push(i);
        //   }
        // }
        // this.home.setRestaurants(x);
        // this.restaurants=[...x];
        this.restaurants=data;        
    },
    (err)=>{
      console.log(err);
    },
    ()=>{
        console.log("completed");
    }
    )
  }
  loadRestaurant(index){
    setTimeout(()=>{this.router.navigate(["/home","restaurant",`${index}`])},500)
  }

}



