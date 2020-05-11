import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { RestaurantDeliveryService } from './restaurant-delivery.service';

@Component({
  selector: 'app-register-restaurant',
  templateUrl: './register-restaurant.component.html',
  styleUrls: ['./register-restaurant.component.css']
})
export class RegisterRestaurantComponent implements OnInit {

  registerForm: FormGroup;
  coordinates: { latitude: Number, longitude: Number } = { latitude: undefined, longitude: undefined };
  ImageData:File;
  InnerPhoto1:File;
  InnerPhoto2:File;
  InnerPhoto3:File;


  constructor(private restService: RestaurantDeliveryService) { }


  ngOnInit() {
    this.registerForm = new FormGroup({
      'menu': new FormArray([
        new FormGroup({
          'type': new FormControl(null, Validators.required),
          'dishes': new FormArray([])
        })
      ]),
      'foodTypeServed': new FormArray([]),
      'img': new FormControl(null, Validators.required),
      'innerPhoto': new FormArray([]),
      'name': new FormControl(null, Validators.required),
      'phoneNo': new FormControl(null, Validators.required),
      'address': new FormControl(null, Validators.required),
      'landmark': new FormControl(null, Validators.required),
      'costForTwo': new FormControl(null, Validators.required)
    })

    navigator.geolocation.getCurrentPosition(resp => {
      this.coordinates.latitude = resp.coords.latitude;
      this.coordinates.longitude = resp.coords.longitude;
    })

  }


  AddCusine() {
    const group = new FormGroup({
      'type': new FormControl(null, Validators.required),
      'dishes': new FormArray([])
    });
    (<FormArray>this.registerForm.get('menu')).push(group);
  }
  getDishType(menu) {
    let menuControls = (<FormArray>this.registerForm.get(menu)).controls;
    return menuControls;
  }
  AddDish(index) {
    const formGroup = new FormGroup({
      'food': new FormControl(null, Validators.required),
      'price': new FormControl(null, Validators.required)
    })
    let dishArray = (<FormArray>(<FormGroup>(<FormArray>this.registerForm.get('menu')).controls[index]).controls.dishes);


    dishArray.push(formGroup);
  }
  getDishControl(index) {

    let formArrayControl = (<FormArray>(<FormGroup>(<FormArray>this.registerForm.get('menu')).controls[index]).controls.dishes).controls;

    return formArrayControl;
  }
  addNewField() {
    let formControl = new FormControl(null, Validators.required);
    (<FormArray>this.registerForm.get('foodTypeServed')).push(formControl);
  }
  onFileChange(event, control) {
    const reader = new FileReader();
    if (event.target.files[0].type.slice(0, 5) == 'image') {
      if (event.target.files && event.target.files.length) {
        const [file] = event.target.files;

        reader.readAsDataURL(file);
        reader.onload = () => {
          if (control == "img") {
            this.ImageData=event.target.files[0];
          }
          else if(control == "innerPhoto1")
          {
            this.InnerPhoto1=event.target.files[0];
          }
          else if(control=="innerPhoto2")
          {
            this.InnerPhoto2=event.target.files[0];
          }
          else if(control=="innerPhoto3")
          {
            this.InnerPhoto3=event.target.files[0];
          }
        };
      }
    }
    else {
      alert("Please upload a valid image file");
    }
  }
  UploadPhoto(control) {
      const formData= new FormData();
      alert("control is"+control);
      if(control=='img')
      {
        formData.append('image',this.ImageData);
        this.restService.uploadImage(formData).subscribe(
          (data:{url})=>{
            this.registerForm.patchValue({'img':data.url})
          },
          (err)=>{
            alert("file cannot be uploaded please select the correct file type");
          },
          ()=>{
            console.log("done");
          }
        )
      }
      else
      {
        if(control == "innerPhoto1")
        {
          formData.append('image',this.InnerPhoto1);
        }
        else if(control=="innerPhoto2")
        {
          formData.append('image',this.InnerPhoto2);
        }
        else if(control=="innerPhoto3")
        {
          formData.append('image',this.InnerPhoto3);
        }
        this.restService.uploadImage(formData).subscribe(
          (data:{url})=>{
            (<FormArray>this.registerForm.get('innerPhoto')).value.push(data.url);
          },
          (err)=>{
            alert("file cannot be uploaded please select the correct file type");
          },
          ()=>{
            console.log("done");
          }
        )
      }

  }
  onSubmit() {
    if (this.coordinates.latitude) {
      let data = {
        ...this.registerForm.value,
        ...this.coordinates
      }
      this.restService.registerRestaurant(data).subscribe(
        (data) => {
          alert("your restaurant is successfully registered");
        },
        (err) => {
          alert("some error occured");
        },
        () => {
          console.log("request completed");
        }
      );
    }
    else {
      alert("Please switch on your GPS");
    }

  }
}
