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

  sumUnits(productId: string){
    const items = this.getItems();
    const product = items.find(item => item.uid === productId);

    if (product) {
      product.units += 1;
      this.localStorageService.setItem('cart', JSON.stringify(items));
      this.updateVariableCarrito()
    }
  }

  resUnits(productId: string){
    const items = this.getItems();
    const product = items.find(item => item.uid === productId);

    if (product) {
      product.units -= 1;
      this.localStorageService.setItem('cart', JSON.stringify(items));
      this.updateVariableCarrito()
    }
  }

  addToCart(item: any): void {
    const items = this.getItems();

    // Buscar el objeto en el array de objetos que tenga el mismo uid
    const existingObjectIndex = items.findIndex(objeto => objeto.uid === item.uid);

    if (existingObjectIndex !== -1) {
      // Si se encuentra el objeto, actualizar la cantidad del objeto
      items[existingObjectIndex].units ++;
    } else {
      // Si no se encuentra el objeto, agregar el nuevo objeto al array de objetos
      item.units = 1;
      items.push(item);
    }
    

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


