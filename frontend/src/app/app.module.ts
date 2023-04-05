

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
import { ToastrModule } from 'ngx-toastr';


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
import { ProductSupport } from './components/views/public/productSupport/productSupport.component,';
import { CarrouselComponent } from './components/graphics/carrousel/carrousel.component,';
import { StarRating } from './components/graphics/starRating/starRating.component,';
import { UploadFilesComponent } from './components/graphics/uploadFIles/uploadFiles.component,';
import { EditProductComponent } from './components/views/private/editProduct/editProduct.component,';
import { CreateProductComponent } from './components/views/private/createProduct/createProduct.component,';
import { ProductInfoComponent } from './components/views/public/productInfo/productInfo.component,';
import { CartComponent } from './components/views/public/cart/cart.component,';
import { CheckOutComponent } from './components/views/public/checkOut/checkOut.component,';
import { UserProfileComponent } from './components/views/private/userProfile/userProfile.component,';
import { BarChartComponent } from './components/graphics/barChart/barChart.component,';
import { NgChartsModule } from 'ng2-charts';
import { DashboardNavbarComponent } from './components/graphics/dashboardNavbar/dashboardNavbar.component,';





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
    ProductInfoComponent,
    UserProductsComponent,
    CreateProductComponent,
    EditProductComponent,
    RegisterComponent,
    LoginComponent,
    CartComponent,
    CheckOutComponent,
    PasswordStrength,
    StarRating,
    UploadFilesComponent,
    UserProfileComponent,
    ProductSupport,
    CarrouselComponent,
    BarChartComponent,
    DashboardNavbarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    Ng2TelInputModule,
    NgChartsModule,
    ToastrModule.forRoot(),
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
