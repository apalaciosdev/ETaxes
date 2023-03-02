import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserHttpService } from 'src/app/services/httpServices/user.service';
import { SupportSearch } from 'src/assets/models/product';
import { FormsService } from '../../../../services/forms.service';
import { UtilsService } from '../../../../services/utils.service';
import { AuthService } from '../../../../services/auth.service';






@Component({
  selector: 'searchComponent',
  templateUrl: './productSupport.component.html',
  providers: [] //Utilizamos el servicio aqui
  // styleUrls: ['./app.component.css']
})


export class ProductSupport implements OnInit{
  public supportSearch: SupportSearch;
  public isLogged: Boolean = false;

  public supportSearchForm!: FormGroup;
  public passwordIsValid :boolean = false;
  public sameBillingVal :boolean = false;

  constructor(
    public readonly formBuilder: FormBuilder,
    public readonly service: FormsService,
    public authService: AuthService,
    private userHttpService: UserHttpService
  ){
    this.supportSearch = {
      nameAndSurnames: "",
      mail: "",
      refProduct: "",
      content: ""
    }; 
  }

  ngOnInit() {
    this.isLogged = this.authService.isLogged()
    this.initForm()
    
  }

  private initForm() {
    if(this.supportSearch){
      this.supportSearchForm = this.formBuilder.group({
        nameAndSurnames: [this.supportSearch.nameAndSurnames, [Validators.required]],
        mail: [this.supportSearch.mail, [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
        refProduct: [this.supportSearch.refProduct, [Validators.required]],
        content: [this.supportSearch.content, [Validators.required]],
      });
    }
    this.service.gestionarValidarErrors(this.supportSearchForm);
  }

  
  async onSubmit(){
    console.log(this.supportSearch)
    await this.registerRequest()
    // this.user = new User("", 0, "", "", "") //vaciamos los inputs
    
    setTimeout(() => {
      // this.router.navigate(['/products']);
    }, 500);
  }
  
  async registerRequest(){
    // this.userHttpService.register(this.supportSearch).subscribe(
    //   (response) => { console.log(response); },
    //   (error) => { console.log(error); }
    // ); 
  }
}
