import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsService } from 'src/app/services/forms.service';
import { ProductsHttpService } from 'src/app/services/httpServices/products.service';
import { LocalStorageService } from 'src/app/services/localStorage.service';
import { TemporalService } from 'src/app/services/temporal.service';
import { UtilsService } from 'src/app/services/utils.service';
import { SharedService } from 'src/app/shared.service';
import { Product } from 'src/assets/models/product';



@Component({
  selector: 'createProductComponent',
  templateUrl: './createProduct.component.html',
  providers: [], //Utilizamos el servicio aqui
  // styleUrls: ['./editProduct.component.css']
})



export class CreateProductComponent implements OnInit{
  id: string;
  imgTemporal: any;
  public editProductForm!: FormGroup;
  public product: Product;
  public productImg: String;
  userToken: any;

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
      // await this.getProduct(this.id);
      this.product.image = valor
      // this.temporalService.actualizarVariableTemporal(null);
    });
    // await this.getProduct(this.id);
    // await this.checkUserHaveProduct(this.userToken.mail, this.id)
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
        image: [this.product.image, [Validators.required]],
        user: [this.product.user, [Validators.required]]
      });
    }
    this.service.gestionarValidarErrors(this.editProductForm);
  }

  async onSubmit(){
    // console.log(this.register)
    // await this.registerRequest()
    // this.user = new User("", 0, "", "", "") //vaciamos los inputs
    await this.postProduct();
    setTimeout(() => {
      // this.router.navigate(['/products']);
    }, 500);
  }
  


  // TODO: crear funcion que compruebe que el producto es del usuario, sinó redirigir a sus productos
  async checkUserHaveProduct(user:string, productId:any){
    this.productsHttpService.checkUserHaveProduct(user, productId).subscribe(
      (response:any) => { 
          if(response.exists == false){
            console.log(response)
            this.router.navigate(['/my-products']);
          }
       },
      (error) => { console.log(error); }
    ); 
  }


  
  
  async postProduct(){
    console.log("dale")
    this.productsHttpService.postProduct(this.product).subscribe(
      (response) => { console.log("Product saved"); },
      (error) => { console.log(error); }
    ); 
      
  }
  

}
