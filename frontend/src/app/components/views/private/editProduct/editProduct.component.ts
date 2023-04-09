import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsService } from 'src/app/services/forms.service';
import { ProductsHttpService } from 'src/app/services/httpServices/products.service';
import { LocalStorageService } from 'src/app/services/localStorage.service';
import { NotificationToastService } from 'src/app/services/notificationToast.service';
import { TemporalService } from 'src/app/services/temporal.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Product } from 'src/assets/models/product';


@Component({
  selector: 'editProductComponent',
  templateUrl: './editProduct.component.html',
  providers: [], //Utilizamos el servicio aqui
  styleUrls: ['../../../../../assets/css/userProfile.component.scss']
})


export class EditProductComponent implements OnInit{
  id: string;
  imgTemporal: any;
  public editProductForm!: FormGroup;
  public product: Product;
  public productImg: String;
  userToken: any;

  constructor(
    private productsHttpService: ProductsHttpService,
    private localStorageService: LocalStorageService,
    public utilsService: UtilsService,
    public readonly formBuilder: FormBuilder,
    public readonly service: FormsService,
    private route: ActivatedRoute,
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
    this.userToken = this.localStorageService.getItem('userToken');;
    this.route.params.subscribe(paramsId => {
      this.id = paramsId['id'];
    });
    await this.temporalService.obtenerVariableTemporal().subscribe(async valor => {
      if(valor !== null){
        await this.getProduct(this.id);
        this.imgTemporal = valor;
      }
    });
    await this.getProduct(this.id);
    await this.checkUserHaveProduct(this.userToken.mail, this.id)
    this.initForm();
  }

  private initForm() {
    if(this.product){
      this.editProductForm = this.formBuilder.group({
        title: [this.product.title, [Validators.required]],
        price: [this.product.price, [Validators.required]],
        description: [this.product.description, [Validators.required]],
        category: [this.product.category, [Validators.required]],
        stock: [this.product.stock, []],
        stars: [this.product.stars, [Validators.required]],
        image: [this.product.image, []],
        user: [this.product.user, []]
      });
    }
    this.service.gestionarValidarErrors(this.editProductForm);
  }

  async onSubmit(){
    await this.putProduct(this.id);
    await this.temporalService.actualizarVariableTemporal(null);
    this.router.navigate([`/product-details/${this.id}`])
  }

  async checkUserHaveProduct(user:string, productId:any){
    this.productsHttpService.checkUserHaveProduct(user, productId).subscribe(
      (response:any) => { 
        if(response.exists == false){
          this.router.navigate(['/my-products']);
        }
      },
      (error) => {this.notifyToastService.showError("Prueba de nuevo más tarde.", "Ha ocurrido un error en nuestros servidores.") }
    ); 
  }

  async getProduct(id:any){
    this.productsHttpService.getProduct(id).subscribe(
      (response:any) => { 
        this.product = response;
        this.productImg = response.image;
        if( this.imgTemporal){
          this.product.image = this.imgTemporal;
        }
      },
      (error) => { this.notifyToastService.showError("Prueba de nuevo más tarde.", "Ha ocurrido un error en nuestros servidores.") }
    ); 
  }
  
  async putProduct(uid: string){
    this.productsHttpService.putProduct(this.product, uid, this.userToken.token).subscribe(
      (response) => { this.notifyToastService.showSuccess("y guardado", "Producto editado") },
      (error) => { this.notifyToastService.showError("al editar el producto", "Ha ocurrido un error") }
    ); 
      
  }
  

}
