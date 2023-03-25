import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilsService } from '../../../../services/utils.service';
import { CartService } from 'src/app/services/cart.service';
import { Location } from '@angular/common';
import { Product } from '../../../../../assets/models/product';


@Component({
  selector: 'cartComponent',
  templateUrl: './cart.component.html',
  providers: [], //Utilizamos el servicio aqui
  styleUrls: ['./cart.component.css']
})



export class CartComponent implements OnInit{
  products:any;
  
  constructor(
    public cartService: CartService,
    public location: Location
  ) {
  
  }

  async ngOnInit() {
    this.products = this.cartService.getItems()
    console.log(this.products)
  }

  removeProductCart(productId:string){
    this.cartService.removeToCart(productId)
    this.products = this.cartService.getItems()
  }


  sumUnits(productId:string){
    this.cartService.sumUnits(productId);
    let p = document.getElementById(`product${productId}`);
    if(p){
      p.innerText = (Number(p.textContent) + 1).toString();
    }
  }

  resUnits(productId:string){
    this.cartService.resUnits(productId);
    let p = document.getElementById(`product${productId}`);
    if(p){
      p.innerText = (Number(p.textContent) - 1).toString();
    }
  }

  pagar(){
    // let total = 0
    // this.products.forEach((product:Product) => {
    //   total += Number(product.price);
    // });

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
