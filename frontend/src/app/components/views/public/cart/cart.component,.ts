import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilsService } from '../../../../services/utils.service';
import { CartService } from 'src/app/services/cart.service';
import { Location } from '@angular/common';
import { SalesHttpService } from '../../../../services/httpServices/sales.service';
import { LocalStorageService } from 'src/app/services/localStorage.service';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationToastService } from 'src/app/services/notificationToast.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'cartComponent',
  templateUrl: './cart.component.html',
  providers: [], //Utilizamos el servicio aqui
  styleUrls: ['./cart.component.css']
})



export class CartComponent implements OnInit{
  products:any;
  totalPrice:number = 0;
  user:any;

  constructor(
    public utilsService: UtilsService,
    public salesService: SalesHttpService,
    public cartService: CartService,
    public location: Location,
    private router: Router,
    private localStorageService: LocalStorageService,
    private authService: AuthService,
    private notifyToastService : NotificationToastService,
    private spinnerService: NgxSpinnerService
  ) {
    this.user = this.localStorageService.getItem('userToken');
  }

  async ngOnInit() {
    this.products = this.cartService.getItems()
    this.updateTotalPrice();
  }

  removeProductCart(productId:string){
    this.cartService.removeToCart(productId)
    this.products = this.cartService.getItems()

    this.updateTotalPrice();
    this.products = this.cartService.getItems()
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
    this.products = this.cartService.getItems()
  }

  resUnits(productId:string, price:any){
    this.cartService.resUnits(productId);
    let p = document.getElementById(`product${productId}`);
    let pPriceUnits = document.getElementById(`productPriceUnit${productId}`);
    if(p && pPriceUnits){
      if(Number(p.textContent) > 1){
        p.innerText = (Number(p.textContent) - 1).toString();
        pPriceUnits.innerText = (Number(pPriceUnits.textContent) - price).toString();
        this.totalPrice -= price;
      }

      else{
        this.removeProductCart(productId);
      }
    }
    this.products = this.cartService.getItems()
  }

  updateTotalPrice(){
    this.totalPrice = 0;
    this.products.forEach((product:any) => {
      if(product.offerPrice === 0){
        this.totalPrice += Number(product.price) * Number(product.units);
      }
      else{
        this.totalPrice += Number(product.offerPrice) * Number(product.units);
      }
    });
    this.products = this.cartService.getItems()
  }

  payProducts(){
    if(this.authService.isLogged()){
      this.products.forEach((product:any) => {
        let sale = {
          "productId": product.uid,
          "units": product.units,
          "price":  product.price,
          "purchaseDate": new Date() ,
          "purchaserMail":  this.localStorageService.getItem('userToken').mail
        }
        this.salesService.postSale(sale, this.user.token).subscribe(
          async (response:any) => {
            if(response.msg === 'Stock negativo'){
              this.notifyToastService.showError("No hay más undades disponibles.", "No se ha podido realizar la compra.")
            }
            else{
              await this.showSpinner()
              this.vaciarCarrito();  
              this.router.navigate(['/confirmation'])
            }
          },
          (error) => { this.notifyToastService.showError("Prueba de nuevo más tarde.", "Ha ocurrido un error en nuestros servidores.") }
        ); 
      });
    }
    else{
      this.router.navigate(['/login']);
    }
  }

  public async showSpinner() {
    this.spinnerService.show();

    setTimeout(() => {
      this.spinnerService.hide();
    }, 2000); // 2 seconds
  }

  vaciarCarrito(){
    this.cartService.deleteCart();
    this.router.navigate(['/']);
  }
}
