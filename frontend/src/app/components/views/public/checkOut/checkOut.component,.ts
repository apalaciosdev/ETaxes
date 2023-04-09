import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilsService } from '../../../../services/utils.service';
import { CartService } from 'src/app/services/cart.service';
import { Location } from '@angular/common';
import { Product } from '../../../../../assets/models/product';


@Component({
  selector: 'checkOutComponent',
  templateUrl: './checkOut.component.html',
  providers: [], //Utilizamos el servicio aqui
  styleUrls: ['./checkOut.component.scss']
})


export class CheckOutComponent implements OnInit{
  products:any;
  totalPrice:number = 0;
  card:any
  
  constructor(
    public utilsService: UtilsService,
    public cartService: CartService,
    public location: Location
  ) {
    this.card = {
      field1: '',
      field2: '',
      field3: '',
      field4: '',
      holder: '',
      expiresMonth: '',
      expiresYear: '',
      ccv: ''
    }
  }

  async ngOnInit() {
    this.products = this.cartService.getItems()
    this.updateTotalPrice();
  
  }
  setCardNumber(event:any, fieldName:any){
  
  }

  removeProductCart(productId:string){
    this.cartService.removeToCart(productId)
    this.products = this.cartService.getItems()

    this.updateTotalPrice();
  }


  sumUnits(productId:string, price:any){
    this.cartService.sumUnits(productId);
    let p = document.getElementById(`product${productId}`);
    let pPriceUnits = document.getElementById(`productPriceUnit${productId}`);
    if(p && pPriceUnits){
      p.innerText = (Number(p.textContent) + 1).toString();
      pPriceUnits.innerText = (Number(pPriceUnits.textContent) + price).toString();
    }
    this.totalPrice += price;
  }

  resUnits(productId:string, price:any){
    this.cartService.resUnits(productId);
    let p = document.getElementById(`product${productId}`);
    let pPriceUnits = document.getElementById(`productPriceUnit${productId}`);
    if(p && pPriceUnits){
      if(Number(p.textContent) > 1){
        p.innerText = (Number(p.textContent) - 1).toString();
        pPriceUnits.innerText = (Number(pPriceUnits.textContent) - price).toString();
      }

      else{
        this.removeProductCart(productId);
      }
    }
    this.totalPrice -= price;
  }

  updateTotalPrice(){
    this.totalPrice = 0;
    this.products.forEach((product:any) => {
      this.totalPrice += Number(product.price) * Number(product.units);
    });
  }

}
