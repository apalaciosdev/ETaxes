import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsHttpService } from 'src/app/services/httpServices/products.service';
import { LocalStorageService } from 'src/app/services/localStorage.service';
import { UtilsService } from 'src/app/services/utils.service';
import { SharedService } from 'src/app/shared.service';
import { NotificationToastService } from '../../../../services/notificationToast.service';

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
    public notifyToastService: NotificationToastService,
  ) { }

  ngOnInit() {
    this.userToken = this.localStorageService.getItem('userToken');;
    this.getProducts(this.userToken.mail);
  }
  
  async getProducts(user:any){
    this.productsHttpService.getUserProducts(user, this.userToken.token).subscribe(
      (response) => { this.products = response },
      (error) => { this.notifyToastService.showError("Prueba de nuevo más tarde.", "Ha ocurrido un error en nuestros servidores.") }
    ); 
  }
  
  async deleteProduct(productId: string){
    this.productsHttpService.deleteProduct(productId, this.userToken.token).subscribe(
      (response) => { this.utilsService.reloadComponent(this.router)},
      (error) => { this.notifyToastService.showError("Prueba de nuevo más tarde.", "Ha ocurrido un error en nuestros servidores.") }
    ); 
  }
}
