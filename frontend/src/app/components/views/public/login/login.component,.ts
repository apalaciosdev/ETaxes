import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserHttpService } from 'src/app/services/httpServices/user.service';
import { SharedService } from 'src/app/shared.service';
import { Login } from 'src/assets/models/user';
import { FormsService } from '../../../../services/forms.service';
import { UtilsService } from '../../../../services/utils.service';






@Component({
  selector: 'loginComponent',
  templateUrl: './login.component.html',
  providers: [], //Utilizamos el servicio aqui
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit{
  public login: Login;
  public loginForm!: FormGroup;
  public passwordIsValid :boolean = false;
  public sameBillingVal :boolean = false;

  constructor(
    public readonly formBuilder: FormBuilder,
    public readonly service: FormsService,
    public readonly utils: UtilsService,
    private userHttpService: UserHttpService,
    private sharedService: SharedService
  ){
    this.login = {
      mail: "",
      password: ""
    }; 
  }

  ngOnInit() {
    this.initForm()
    
  }

  private initForm() {
    if(this.login){
      this.loginForm = this.formBuilder.group({
        mail: [this.login.mail],
        password: [this.login.password]
      });
    }
    this.service.gestionarValidarErrors(this.loginForm);
  }

  async onSubmit(){
    console.log(this.login)
    await this.loginRequest()
    // this.user = new User("", 0, "", "", "") //vaciamos los inputs
    
    setTimeout(() => {
      // this.router.navigate(['/products']);
      // console.log(this.sharedService.userToken)
    }, 500);
  }
  
  async loginRequest(){
    this.userHttpService.login(this.login).subscribe(
      (response) => { this.sharedService.setUserToken(response) },
      (error) => { console.log(error); }
    ); 
  }
}
