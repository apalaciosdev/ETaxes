import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserHttpService } from 'src/app/services/httpServices/user.service';
import { LocalStorageService } from 'src/app/services/localStorage.service';
import { SharedService } from 'src/app/shared.service';
import { Login } from 'src/assets/models/user';
import { FormsService } from '../../../../services/forms.service';
import { UtilsService } from '../../../../services/utils.service';
import { Router } from '@angular/router';
import { ReloadService } from 'src/app/services/reloadService.service';
import { NotificationToastService } from 'src/app/services/notificationToast.service';






@Component({
  selector: 'loginComponent',
  templateUrl: './login.component.html',
  providers: [], //Utilizamos el servicio aqui
  styleUrls: ['./login.component.scss']
})


export class LoginComponent implements OnInit{
  public login: Login;
  public loginForm!: FormGroup;
  public passwordIsValid :boolean = false;
  public sameBillingVal :boolean = false;

  constructor(
    public readonly formBuilder: FormBuilder,
    public readonly service: FormsService,
    public readonly router: Router,
    public readonly utils: UtilsService,
    private userHttpService: UserHttpService,
    private sharedService: SharedService,
    private localStorageService: LocalStorageService,
    public reloadService: ReloadService,
    private notifyToastService : NotificationToastService
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
  }

  public saveData(res:any){
    this.sharedService.setUserToken(res);
    let user = { mail: res.user.mail, name: res.user.name, token: res.token}
    this.localStorageService.setItem('userToken', user);


    this.reloadService.reloadComponent.next(true);
    

    window.history.back(); // Obtener la URL de la última página visitada
    // Opcionalmente puedes agregar una validación para asegurarte de que hay una página anterior en el historial
    this.router.navigateByUrl(window.location.pathname); // Navegar a la última página visitada
  }
  
  async loginRequest(){
    this.userHttpService.login(this.login).subscribe(
      (response) => { this.saveData(response) },
      (error) => { console.log(error);  this.notifyToastService.showError("Vuelve a probar.", "Credenciales incorrectas.")}
    ); 
  }
}
