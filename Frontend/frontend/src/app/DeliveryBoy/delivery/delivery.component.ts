import { Component, OnInit, NgZone, ChangeDetectorRef } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css']
})
export class DeliveryComponent implements OnInit {
  reachedRestaurant:boolean=false;
  restaurantData: boolean=false;
  user: any;
  orders: any;
  restaurant: any;
  customer:any;
  totalCost:number=0;
  latitude:number=10;
  longitude:number=10;
  dir:any;
  destinationIconUrl:string="../../../assets/icons/xhdpi.png";
  reachedCustomer: boolean=false;
  path: string="restaurant";
  constructor(private socket:Socket,private store:Store<{User:{user}}>,private zone: NgZone,private cdr: ChangeDetectorRef) { }

  public renderOptions = {
    suppressMarkers: true,
}

  ngOnInit() {
    navigator.geolocation.watchPosition(function(position) {
            console.log(position);
            let latitude=position.coords.latitude;
            let longitude=position.coords.longitude;
            if(this.restaurantData)
            {
                this.dir.origin = {
                  lat: position.coords.latitude, lng:position.coords.longitude
                }
                if(this.latitude!=position.coords.latitude||this.longitude!=position.coords.longitude)
                {
                  this.latitude=position.coords.latitude;
                  this.longitude=position.coords.longitude;
                  this.socket.emit("changeDriverLocation",{user:this.user,coordinates:{latitude,longitude}});
                  
                }
                if(this.path=="restaurant"&&this.dir.destination.lat==this.dir.origin.lat&&this.dir.destination.lng==this.dir.origin.lng)
                {
                  this.reachedRestaurant=true;
                }
                else if(this.path=="customer"&&this.dir.destination.lat==this.dir.origin.lat&&this.dir.destination.lng==this.dir.origin.lng)
                {
                  this.reachedCustomer=true;  
                }
            }
            }.bind(this),
                (err)=>{
                  console.log(err);
                }
    );
    this.store.select('User').subscribe(
                data=>{
                  this.user=data.user;
                  console.log(this.user);
                }
    )
    this.socket.fromEvent<{data}>(this.user.emailId).subscribe(
              (data:any)=>{
                console.log(data);
                this.orders=[...data.data.order];
                this.restaurant={...data.data.restaurant}
                this.customer={...data.data.user};
                for(let i of this.orders)
                {
                  console.log(i);
                  this.totalCost+=i.price*i.quantity;
                }
                this.dir = {
                  origin: { lat: this.latitude, lng: this.longitude },
                  destination: { lat: this.restaurant.Details.latitude, lng:  this.restaurant.Details.longitude }
                }
                this.restaurantData=true;
              },
              (err)=>{
                console.log(err);
              },
              ()=>{
                console.log("request is completed");
              }
    )
    this.socket.fromEvent<{data}>("refreshDriver"+this.user.emailId).subscribe(
          (data)=>{
            console.log("we have got the event and we can now proceed further");
            this.restaurantData=false;
          }
    )
  }
  loadUserDirection(){
    this.dir.destination={
      lat:this.customer.latitude,
      lng:this.customer.longitude
    }
    this.destinationIconUrl="../../../assets/icons/Home.png";
    this.reachedRestaurant=false;
    this.path="customer";
  }
  delivered(){
    this.reachedCustomer=false;
    console.log(this.restaurant);
    this.socket.emit("delivered",{user:this.user,customer:this.customer,order:this.orders,restaurant:this.restaurant,totalCost:this.totalCost})
  }
}
