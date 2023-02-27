import { Component, OnInit } from '@angular/core';
import { ProductsHttpService } from 'src/app/services/httpServices/products.service';



@Component({
  selector: 'userProductsComponent',
  templateUrl: './userProducts.component.html',
  providers: [] //Utilizamos el servicio aqui
  // styleUrls: ['./app.component.css']
})



export class UserProductsComponent implements OnInit{

  products: any;

  
  constructor(
    private productsHttpService: ProductsHttpService,
  ) { }

  ngOnInit() {
    this.getProducts()
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
