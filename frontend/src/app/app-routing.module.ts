import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/authguard.guard';

import { HomeComponent } from './components/views/public/home/home.component,';
import { MarketplaceComponent } from './components/views/public/marketplace/marketplace.component,';
import { RegisterComponent } from './components/views/public/register/register.component,';
import { LoginComponent } from './components/views/public/login/login.component,';
import { UserProductsComponent } from './components/views/private/userProducts/userProducts.component,';
import { ProductSupport } from './components/views/public/productSupport/productSupport.component,';
import { EditProductComponent } from './components/views/private/editProduct/editProduct.component,';
import { CreateProductComponent } from './components/views/private/createProduct/createProduct.component,';
import { ProductInfoComponent } from './components/views/public/productInfo/productInfo.component,';





const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'marketplace', component: MarketplaceComponent},
  {path: 'product-details/:id', component: ProductInfoComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'product-support', component: ProductSupport},
  {path: 'my-products', component: UserProductsComponent, canActivate: [AuthGuard]},
  {path: 'edit-product/:id', component: EditProductComponent, canActivate: [AuthGuard]},
  {path: 'create-product', component: CreateProductComponent, canActivate: [AuthGuard]},

  // {path: 'products', component: ProductsGridComponent},
  // {path: 'addproduct', component: InputProductsComponent},
  // {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
