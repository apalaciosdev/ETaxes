

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

//Componentes
import { HomeComponent } from './components/views/public/home/home.component,';
import { NavbarComponent } from './components/graphics/navbar/navbar.component,';
import { MarketplaceComponent } from './components/views/public/marketplace/marketplace.component,';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordStrength } from './components/graphics/passwordStrength/passwordStrength.component,';
import { RegisterComponent } from './components/views/public/register/register.component,';
import { LoginComponent } from './components/views/public/login/login.component,';
import { UserProductsComponent } from './components/views/private/userProducts/userProducts.component,';





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
    UserProductsComponent,
    RegisterComponent,
    LoginComponent,
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
