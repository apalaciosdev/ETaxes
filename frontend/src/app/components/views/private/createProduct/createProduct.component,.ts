import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { FormsService } from 'src/app/services/forms.service';
import { ProductsHttpService } from 'src/app/services/httpServices/products.service';
import { LocalStorageService } from 'src/app/services/localStorage.service';
import { NotificationToastService } from 'src/app/services/notificationToast.service';
import { TemporalService } from 'src/app/services/temporal.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Product } from 'src/assets/models/product';



@Component({
  selector: 'createProductComponent',
  templateUrl: './createProduct.component.html',
  providers: [], //Utilizamos el servicio aqui
  styleUrls: ['../../../../../assets/css/userProfile.component.scss']
})



export class CreateProductComponent implements OnInit{
  public editProductForm!: FormGroup;
  public product: Product;
  public productImg: String;
  id: string;
  imgTemporal: any;
  userToken: any;

  constructor(
    private productsHttpService: ProductsHttpService,
    private localStorageService: LocalStorageService,
    public utilsService: UtilsService,
    public readonly formBuilder: FormBuilder,
    public readonly service: FormsService,
    private router: Router,
    private temporalService: TemporalService,
    private notifyToastService : NotificationToastService
  ) { 
    this.product = {
      title: "",
      price: 0,
      description: "",
      category: "",
      stock: 0,
      stars: 0,
      image: "",
      user: ""
    }; 
  }

  async ngOnInit() {
    this.product.user = this.localStorageService.getItem('userToken').mail;

    await this.temporalService.obtenerVariableTemporal().subscribe(async valor => {
      this.product.image = valor
    });

    this.initForm();
  }

  private initForm() {
    if(this.product){
      this.editProductForm = this.formBuilder.group({
        title: [this.product.title, [Validators.required]],
        price: [this.product.price, [Validators.required]],
        description: [this.product.description, [Validators.required]],
        category: [this.product.category, [Validators.required]],
        stock: [this.product.stock, [Validators.required]],
        stars: [this.product.stars, [Validators.required]],
        image: [this.product.image, []],
        user: [this.product.user, [Validators.required]]
      });
    }
    this.service.gestionarValidarErrors(this.editProductForm);
  }

  async onSubmit(){
    await this.postProduct();
    this.temporalService.actualizarVariableTemporal(null);
  }

  async checkUserHaveProduct(user:string, productId:any){
    this.productsHttpService.checkUserHaveProduct(user, productId).subscribe(
      (response:any) => { 
          if(response.exists == false){
            this.router.navigate(['/my-products']);
          }
       },
      (error) => { this.notifyToastService.showError("Prueba de nuevo más tarde.", "Ha ocurrido un error en nuestros servidores.") }
    ); 
  }
  
  async postProduct(){
    this.productsHttpService.postProduct(this.product, this.localStorageService.getItem('userToken').token).subscribe(
      (response:any) => {this.router.navigate([`/dashboard`])},
      (error) => {this.notifyToastService.showError("al crear el producto", "Ha ocurrido un error") }
    );   
  }
}
