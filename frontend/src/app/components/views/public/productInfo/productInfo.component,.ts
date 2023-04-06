import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsService } from 'src/app/services/forms.service';
import { ProductsHttpService } from 'src/app/services/httpServices/products.service';
import { LocalStorageService } from 'src/app/services/localStorage.service';
import { TemporalService } from 'src/app/services/temporal.service';
import { SharedService } from 'src/app/shared.service';
import { Product } from 'src/assets/models/product';
import { UtilsService } from '../../../../services/utils.service';



@Component({
  selector: 'productInfoComponent',
  templateUrl: './productInfo.component.html',
  providers: [], //Utilizamos el servicio aqui
  styleUrls: ['./productInfo.component.css']
})



export class ProductInfoComponent implements OnInit{

  products: any;
  userToken: any;
  id: any;
  public product: any;

  
  constructor(
    private productsHttpService: ProductsHttpService,
    private sharedService: SharedService,
    private localStorageService: LocalStorageService,
    public utilsService: UtilsService,
    public readonly formBuilder: FormBuilder,
    public readonly service: FormsService,
    private route: ActivatedRoute,
    private router: Router,
    private temporalService: TemporalService

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
      (error) => { console.log(error) }
    ); 
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
