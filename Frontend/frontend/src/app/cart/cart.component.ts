import { CartService } from "../home/shared/cart.service";
import { Component, AfterViewInit, ViewChild, ElementRef,OnInit, ɵConsole, Inject } from 
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
  url={
    url: 'https://cdn0.iconfinder.com/data/icons/map-and-navigation-2-1/48/100-512.png',
    scaledSize: {
        width: 40,
        height: 60
    }
  }
  restaurant:any;
  orders:Array<any>;
  totalCost: number=0;
  map:boolean=false;
  userData:Observable<{user}>;
  user:any={};
  @ViewChild('mapContainer') gmap: ElementRef;
  constructor(private cart:CartService,private store:Store<{User:{user}}>,private socket:Socket,private router:Router) { }

  ngOnInit() {
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
    this.socket.fromEvent<{data}>("someEvent").subscribe(
      (data)=>{
        console.log(data);
        alert(data);0
      },
      (err)=>{
        console.log(err);
      },
      ()=>{
        console.log("request is completed");
      }
    )
    this.socket.emit("getOrder",{restaurant:this.restaurant,user:this.user,order:this.orders})
      console.log("deliveredToCustomer"+this.user.emailId);
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
  }
  // openDialog(){
  //   console.log("hello");
  //   const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
  //     width: '250px',
  //     height:'250px'
  // });
  // dialogRef.afterClosed().subscribe(result => {
  //   console.log('The dialog was closed');
  // });
//}
}
// @Component({
//   selector: 'dialog-overview-example-dialog',
//   templateUrl: './dialog-overview-example-dialog.html',
// })
// export class DialogOverviewExampleDialog {

//   constructor(
//     public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
//     @Inject(MAT_DIALOG_DATA) public data: any) {}

//   onNoClick(): void {
//     this.dialogRef.close();
//   }
// }