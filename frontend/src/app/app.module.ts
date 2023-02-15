

// Core angular
import { NgModule } from '@angular/core';
import { APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of } from 'rxjs';

//Librerias de terceros
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {Ng2TelInputModule} from 'ng2-tel-input';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { HomeComponent } from './components/views/home/home.component,';
import { NavbarComponent } from './components/graphics/navbar/navbar.component,';
import { MarketplaceComponent } from './components/views/marketplace/marketplace.component,';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordStrength } from './components/graphics/passwordStrength/passwordStrength.component,';
import { RegisterComponent } from './components/views/register/register.component,';





// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    MarketplaceComponent,
    RegisterComponent,
    PasswordStrength
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    Ng2TelInputModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
