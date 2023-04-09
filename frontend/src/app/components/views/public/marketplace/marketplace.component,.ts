import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ProductsHttpService } from 'src/app/services/httpServices/products.service';
import { LocalStorageService } from 'src/app/services/localStorage.service';
import { NotificationToastService } from 'src/app/services/notificationToast.service';
import { UtilsService } from '../../../../services/utils.service';

@Component({
  selector: 'marketplaceComponent',
  templateUrl: './marketplace.component.html',
  providers: [], //Utilizamos el servicio aqui
  styleUrls: ['./marketplace.component.scss']
})



export class MarketplaceComponent implements OnInit{
  products: any;

  constructor(
    private productsHttpService: ProductsHttpService,
    public utilsService: UtilsService,
    private cartService: CartService,
    private notifyToastService : NotificationToastService
  ) { }

  ngOnInit() {
    this.getProducts()
  }
  
  async getProducts(){
    this.productsHttpService.getProducts().subscribe(
      (response) => { this.products = response; },
      (error) => { this.notifyToastService.showError("Prueba de nuevo más tarde.", "Ha ocurrido un error en nuestros servidores.") }
    ); 
  }

  addCarrito(product:string){
    this.cartService.addToCart(product);
    this.notifyToastService.showSuccess("al carrito", "Producto añadido")
  }
}
