import { CartService } from "../home/shared/cart.service";
import { Component, AfterViewInit, ViewChild, ElementRef,OnInit, ɵConsole, Inject, Input } from 
'@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Socket } from 'ngx-socket-io';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  @Input("noRestaurant") element;
  driverLatitude=0;
  driverLongitude=0;
  Homeurl={
    url: 'https://cdn0.iconfinder.com/data/icons/map-location-solid-style/91/Map_-_Location_Solid_Style_23-512.png',
    scaledSize: {
        width: 40,
        height: 60
    }
  }
  Restauranturl={
    url: 'https://static.thenounproject.com/png/1661307-200.png',
    scaledSize: {
        width: 40,
        height: 60
    }
  }
  Driverurl={
    url: 'https://image.flaticon.com/icons/png/512/870/premium/870186.png',
    scaledSize: {
        width: 40,
        height: 60
    }
  }
  restaurant:any;
  driver:any=false;
  orders:Array<any>;
  totalCost: number=0;
  map:boolean=false;
  userData:Observable<{user}>;
  user:any={};
  @ViewChild('mapContainer') gmap: ElementRef;
  constructor(private cart:CartService,private store:Store<{User:{user}}>,private socket:Socket,private router:Router) { }

  ngOnInit() {
    console.log(document.cookie);
    this.restaurant=this.cart.restaurant;
    this.orders=this.cart.getOrders();
    this.computeCost();
    this.userData=this.store.select('User');
    this.userData.subscribe(
      (data)=>{
        this.user=data.user;
      },
      (err)=>{},
      ()=>{}
    )
    this.socket.fromEvent<{data}>("changeDriverLocation"+this.user.emailId).subscribe(
      (data:any)=>{
        console.log(data);
        this.driver=true;
        this.driverLatitude=data.data.coordinates.latitude;
        this.driverLongitude=data.data.coordinates.longitude;
        console.log(this.driverLatitude,this.driverLongitude);
      },
      (err)=>{
        console.log(err);
      },
      ()=>{
        console.log("request is completed");
      }
    )
    this.socket.fromEvent<{data}>("No Driver Found"+this.user.emailId).subscribe(
      (data:any)=>{
        alert("Sorry we cannot deliver this time");
      },
      (err)=>{
        console.log(err);
      },
      ()=>{
        console.log("request is completed");
      }
    )
    this.socket.fromEvent("deliveredToCustomer"+this.user.emailId).subscribe(
      (data)=>{
        alert("Your wait is over!Food is on your gate...");
        this.router.navigate(["/home"])
      }
    )
  }
  increaseQuantity(index:number)
  {
    this.orders[index].quantity++;
    this.computeCost();
  }
  decreaseQuantity(index:number)
  {
    if(this.orders[index].quantity>1)
    {
      this.orders[index].quantity--;
      this.computeCost()
    }
    else
    {

      this.orders.splice(index,index+1);
      this.computeCost()
    }
  }  
  computeCost()
  {
    this.totalCost=0;
    for(let dish of this.orders){
      this.totalCost=this.totalCost+dish.price*dish.quantity;
    }
  }
  loadMap()
  {
    this.map=true;
    this.socket.emit("getOrder",{restaurant:this.restaurant,user:this.user,order:this.orders})
  }

}
