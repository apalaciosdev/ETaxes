import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/authguard.guard';

import { HomeComponent } from './components/views/public/home/home.component,';
import { MarketplaceComponent } from './components/views/public/marketplace/marketplace.component,';
import { RegisterComponent } from './components/views/public/register/register.component,';
import { LoginComponent } from './components/views/public/login/login.component,';
import { UserProductsComponent } from './components/views/private/userProducts/userProducts.component,';
import { ProductSupport } from './components/views/public/productSupport/productSupport.component,';
import { EditProductComponent } from './components/views/private/editProduct/editProduct.component';
import { CreateProductComponent } from './components/views/private/createProduct/createProduct.component,';
import { ProductInfoComponent } from './components/views/public/productInfo/productInfo.component,';
import { CartComponent } from './components/views/public/cart/cart.component,';
import { CheckOutComponent } from './components/views/public/checkOut/checkOut.component,';
import { UserProfileComponent } from './components/views/private/userProfile/userProfile.component,';
import { PageNotFoundComponent } from './components/views/public/404Page/pageNotFound.component,';
import { ConfirmationPageComponent } from './components/views/private/confirmationPage/confirmationPage.component,';





const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'marketplace', component: MarketplaceComponent},
  {path: 'product-details/:id', component: ProductInfoComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'cart', component: CartComponent},
  {path: 'check-out', component: CheckOutComponent},
  {path: 'product-support', component: ProductSupport},
  {path: 'dashboard', component: UserProfileComponent, canActivate: [AuthGuard]},
  {path: 'my-products', component: UserProductsComponent, canActivate: [AuthGuard]},
  {path: 'edit-product/:id', component: EditProductComponent, canActivate: [AuthGuard]},
  {path: 'create-product', component: CreateProductComponent, canActivate: [AuthGuard]},
  {path: 'confirmation', component: ConfirmationPageComponent, canActivate: [AuthGuard]},
  {path: '**', component: PageNotFoundComponent}

  // {path: 'products', component: ProductsGridComponent},
  // {path: 'addproduct', component: InputProductsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
