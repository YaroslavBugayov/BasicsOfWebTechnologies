import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from "./components/login/login.component";
import { RegistrationComponent } from "./components/registration/registration.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UserService } from "./services/user.service";
import { HttpClientModule } from "@angular/common/http";
import {ProfileService} from "./services/profile.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {JwtService} from "./services/jwt.service";
import {ProfileEditorComponent} from "./components/profileEditor/profile-editor.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    ProfileComponent,
    ProfileEditorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [UserService, ProfileService, JwtService],
  bootstrap: [AppComponent]
})
export class AppModule { }
