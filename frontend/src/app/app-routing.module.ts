import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/views/public/home/home.component,';
import { MarketplaceComponent } from './components/views/public/marketplace/marketplace.component,';
import { RegisterComponent } from './components/views/public/register/register.component,';
import { LoginComponent } from './components/views/public/login/login.component,';
import { UserProductsComponent } from './components/views/private/userProducts/userProducts.component,';
import { AuthGuard } from './shared/authguard.guard';





const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'marketplace', component: MarketplaceComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'my-products', component: UserProductsComponent, canActivate: [AuthGuard]},

  // {path: 'products', component: ProductsGridComponent},
  // {path: 'addproduct', component: InputProductsComponent},
  // {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
