import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormsService } from 'src/app/services/forms.service';
import { ProductsHttpService } from 'src/app/services/httpServices/products.service';
import { LocalStorageService } from 'src/app/services/localStorage.service';
import { UtilsService } from '../../../../services/utils.service';
import { NotificationToastService } from 'src/app/services/notificationToast.service';
import { CartService } from 'src/app/services/cart.service';


@Component({
  selector: 'productInfoComponent',
  templateUrl: './productInfo.component.html',
  providers: [], //Utilizamos el servicio aqui
  styleUrls: ['./productInfo.component.css']
})


export class ProductInfoComponent implements OnInit{
  public product: any;
  products: any;
  userToken: any;
  id: any;

  
  constructor(
    private productsHttpService: ProductsHttpService,
    private localStorageService: LocalStorageService,
    public utilsService: UtilsService,
    public readonly formBuilder: FormBuilder,
    public readonly service: FormsService,
    private route: ActivatedRoute,
    private cartService: CartService,
    private notifyToastService : NotificationToastService
  ) {
    this.product; 
  }

  async ngOnInit() {
    this.userToken = this.localStorageService.getItem('userToken');;
    this.route.params.subscribe(paramsId => {
      this.id = paramsId['id'];
    });

    await this.getProduct(this.id);

  }
  
  async getProduct(id:any){
    this.productsHttpService.getProduct(id).subscribe(
      (response:any) => { this.product = response },
      (error) => { this.notifyToastService.showError("Prueba de nuevo más tarde.", "Ha ocurrido un error en nuestros servidores.") }
    ); 
  }

  addCarrito(product:string){
    this.cartService.addToCart(product);
    this.notifyToastService.showSuccess("al carrito", "Producto añadido")
  }
}
