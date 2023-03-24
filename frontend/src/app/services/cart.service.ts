import { Injectable } from '@angular/core';
import { LocalStorageService } from './localStorage.service';
import { TemporalService } from './temporal.service';


@Injectable({
  providedIn: 'root'
})
export class CartService {
 
  constructor(
    private localStorageService: LocalStorageService,
    private temporalService: TemporalService,
  ){}

  initVariableCarrito(){
    return this.getItems().length;
  }

  updateVariableCarrito(){
    const count = this.getItems().length;
    this.temporalService.actualizarVariableCarrito(count);
  }

  getItems(): any[] {
    return JSON.parse(this.localStorageService.getItem('cart')) || [];
  }

  addToCart(item: any): void {
    const items = this.getItems();
    items.push(item);
    this.localStorageService.setItem('cart', JSON.stringify(items));
    console.log(this.getItems())
    this.updateVariableCarrito()
  }
  
  removeToCart(productId: any): void {
    const items = this.getItems();
    this.localStorageService.setItem('cart', JSON.stringify(items.filter(objeto => objeto.uid !== productId)));
    console.log(this.getItems())
    this.updateVariableCarrito()
  }
}


