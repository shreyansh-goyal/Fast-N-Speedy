import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { SignupComponent } from './Auth/signup/signup.component';
import { AppRoutingModule } from './app.routing.module';
import {MatToolbarModule} from '@angular/material/toolbar'; 
import {MatInputModule} from '@angular/material/input'; 
import {MatButtonModule} from '@angular/material/button'; 
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import { AuthService } from './Auth/signup/auth.service';
import { VerifyComponent } from './Auth/verify/verify-component/verify-component.component';
import { VerifyService } from './Auth/verify/verify-component/verify.service';
import {HomeModule} from "./home/home.module";
import { LoginComponent } from './Auth/login/login.component';
import { LoginService } from './Auth/login/login.service';
import {CarouselModule} from 'primeng/carousel';
import { AuthComponent } from './Auth/auth/auth.component'
import {StoreModule} from "@ngrx/store";
import { AuthReducer } from './Auth/store/auth.reducer';
import { AuthInterceptor } from './shared/auth.interceptor';
import {MatExpansionModule} from '@angular/material/expansion'; 
import {AgmCoreModule} from "@agm/core";
import { CartService } from './home/shared/cart.service';
import { CartComponent} from './cart/cart.component';
import {MatGridListModule} from '@angular/material/grid-list'; 
import {MatDividerModule} from '@angular/material/divider'; 
import {MatCardModule} from '@angular/material/card';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { DeliveryComponent } from './DeliveryBoy/delivery/delivery.component';
import { DeliveryLoginComponent } from './Auth/delivery-login/delivery-login.component';
import { AgmDirectionModule } from 'agm-direction';
import { RegisterRestaurantComponent } from './register-restaurant/register-restaurant.component';
import { RegisterDriverComponent } from './register-driver/register-driver.component';
import { RegisterComponent } from './register/register.component';
import { AdminLoginComponent } from './Auth/admin-login/admin-login.component';
import { AdminPageComponent } from './Auth/admin-page/admin-page.component';
import { AuthGuard } from './auth.guard';
const config: SocketIoConfig = { url: 'http://localhost:1234', options: {} };


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    VerifyComponent,
    LoginComponent,
    AuthComponent,
    CartComponent,
    DeliveryComponent,
    DeliveryLoginComponent,
    RegisterRestaurantComponent,
    RegisterDriverComponent,
    RegisterComponent,
    AdminLoginComponent,
    AdminPageComponent,
  ],
  imports: [
    SocketIoModule.forRoot(config),
    BrowserModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    AppRoutingModule,
    MatToolbarModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    HomeModule,
    CarouselModule,
    MatExpansionModule,
    StoreModule.forRoot({User:AuthReducer}),
    MatGridListModule,
    MatDividerModule,
    MatCardModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAm-9PwJzIYFx-AWEIlkMwWHAWHM-LGpwQ',
      libraries: ['places'] 
    }),
    AgmDirectionModule,
  ],
  providers: [
    AuthService,
    VerifyService,
    LoginService,
    CartService,
    AuthGuard,
    {provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
