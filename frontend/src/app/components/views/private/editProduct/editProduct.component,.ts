import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormsService } from 'src/app/services/forms.service';
import { ProductsHttpService } from 'src/app/services/httpServices/products.service';
import { LocalStorageService } from 'src/app/services/localStorage.service';
import { TemporalService } from 'src/app/services/temporal.service';
import { UtilsService } from 'src/app/services/utils.service';
import { SharedService } from 'src/app/shared.service';
import { Product } from 'src/assets/models/product';



@Component({
  selector: 'editProductComponent',
  templateUrl: './editProduct.component.html',
  providers: [], //Utilizamos el servicio aqui
  // styleUrls: ['./editProduct.component.css']
})



export class EditProductComponent implements OnInit{
  id: string;
  imgTemporal: any;
  public editProductForm!: FormGroup;
  public product: Product;

  constructor(
    private productsHttpService: ProductsHttpService,
    private sharedService: SharedService,
    private localStorageService: LocalStorageService,
    public utilsService: UtilsService,
    public readonly formBuilder: FormBuilder,
    public readonly service: FormsService,
    private route: ActivatedRoute,
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


  ngOnInit() {
    this.route.params.subscribe(paramsId => {
      this.id = paramsId['id'];
    });
    this.temporalService.obtenerVariableTemporal().subscribe(valor => {
      this.imgTemporal = valor;
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
    
    setTimeout(() => {
      // this.router.navigate(['/products']);
    }, 500);
  }
  
  // TODO: crear funcion que compruebe que el producto es del usuario, sinó redirigir a sus productos



  

  // async getProducts(user:any){
  //   this.productsHttpService.getUserProducts(user).subscribe(
  //     (response) => { this.products = response },
  //     (error) => { console.log(error); }
  //   ); 

  //   // setTimeout(() => {
  //   //   console.log(this.products)
  //   // }, 500);
  // }
  
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
