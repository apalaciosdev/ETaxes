import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { ProductsHttpService } from 'src/app/services/httpServices/products.service';
import { LocalStorageService } from 'src/app/services/localStorage.service';
import { NotificationToastService } from 'src/app/services/notificationToast.service';
import { TemporalService } from 'src/app/services/temporal.service';
import { UtilsService } from '../../../../services/utils.service';



@Component({
  selector: 'marketplaceComponent',
  templateUrl: './marketplace.component.html',
  providers: [], //Utilizamos el servicio aqui
  styleUrls: ['./marketplace.component.css']
})



export class MarketplaceComponent implements OnInit{

  products: any;

  
  constructor(
    private productsHttpService: ProductsHttpService,
    public utilsService: UtilsService,
    private localStorageService: LocalStorageService,
    private cartService: CartService,
    private notifyToastService : NotificationToastService
  ) { }

  ngOnInit() {
    this.getProducts()
    this.notifyToastService.showSuccess("Data shown successfully !!", "ItSolutionStuff.com")
  }
  


  async getProducts(){
    this.productsHttpService.getProducts().subscribe(
      (response) => { this.products = response; },
      (error) => { console.log(error); }
    ); 

    setTimeout(() => {
      console.log(this.products)
    }, 500);
  }


  addCarrito(product:string){

    this.cartService.addToCart(product);
    

    
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
  

}
