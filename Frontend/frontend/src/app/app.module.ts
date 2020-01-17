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
import { AuthComponent } from './Auth/auth/auth.component';
import {StoreModule} from "@ngrx/store";
import { AuthReducer } from './Auth/store/auth.reducer';
import { AuthInterceptor } from './shared/auth.interceptor';
import {MatExpansionModule} from '@angular/material/expansion'; 
@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    VerifyComponent,
    LoginComponent,
    AuthComponent
  ],
  imports: [
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
    StoreModule.forRoot({User:AuthReducer})
  ],
  providers: [
    AuthService,
    VerifyService,
    LoginService,
    {provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
