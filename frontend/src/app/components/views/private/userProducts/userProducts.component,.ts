import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsHttpService } from 'src/app/services/httpServices/products.service';
import { LocalStorageService } from 'src/app/services/localStorage.service';
import { UtilsService } from 'src/app/services/utils.service';
import { SharedService } from 'src/app/shared.service';



@Component({
  selector: 'userProductsComponent',
  templateUrl: './userProducts.component.html',
  providers: [], //Utilizamos el servicio aqui
  styleUrls: ['./userProducts.component.scss', '../../../../../assets/css/userProfile.component.scss']
})



export class UserProductsComponent implements OnInit{

  products: any;

  userToken: any;
  
  constructor(
    private productsHttpService: ProductsHttpService,
    private router: Router,
    private sharedService: SharedService,
    private localStorageService: LocalStorageService,
    public utilsService: UtilsService,
  ) { }

  ngOnInit() {
    this.userToken = this.localStorageService.getItem('userToken');;
    this.getProducts(this.userToken.mail);
    // this.sharedService.userToken$.subscribe(userToken => {
      // });
  }
  


  async getProducts(user:any){
    this.productsHttpService.getUserProducts(user, this.userToken.token).subscribe(
      (response) => { this.products = response },
      (error) => { console.log(error); }
    ); 

    // setTimeout(() => {
    //   console.log(this.products)
    // }, 500);
  }
  
  // async deleteProduct(uid: string){
  //   console.log("dale")
  //   this.httpService.deleteProduct(uid).subscribe(
  //     (response) => { console.log("Product dropped"); },
  //     (error) => { console.log(error); }
  //   ); 
  
  //   await this.getProducts()
  //   this.httpService.reloadComponent(this.router)
  
  //   // this.ngOnInit();
  // }
  
  async deleteProduct(productId: string){
    this.productsHttpService.deleteProduct(productId, this.userToken.token).subscribe(
      (response) => { console.log("Product dropped"); this.utilsService.reloadComponent(this.router)},
      (error) => { console.log(error); }
    ); 
    console.log(productId)
  }
}
