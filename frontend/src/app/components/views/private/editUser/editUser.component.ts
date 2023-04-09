import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserHttpService } from 'src/app/services/httpServices/user.service';
import { User } from 'src/assets/models/user';
import { FormsService } from '../../../../services/forms.service';
import { UtilsService } from '../../../../services/utils.service';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/localStorage.service';
import { NotificationToastService } from 'src/app/services/notificationToast.service';


@Component({
  selector: 'editUserComponent',
  templateUrl: './editUser.component.html',
  providers: [] //Utilizamos el servicio aqui
  // styleUrls: ['./app.component.css']
})


export class EditUserComponent implements OnInit{
  public user: User;
  public userMail: string;
  public userToken: any;

  public registerForm!: FormGroup;
  public register: any;
  public passwordIsValid :boolean = false;
  public sameBillingVal :boolean = false;

  constructor(
    public readonly formBuilder: FormBuilder,
    public readonly router: Router,
    public readonly service: FormsService,
    public readonly utils: UtilsService,
    private userHttpService: UserHttpService,
    private localStorageService: LocalStorageService,
    private notifyToastService : NotificationToastService
  ){
    this.register = {}; 
  }

  async ngOnInit() {
    this.userToken = await this.localStorageService.getItem('userToken')
    await this.getUserData(this.userToken.mail)
    this.initForm()
  }

  async getUserData(mail:string){
    await this.userHttpService.getUserData(mail).subscribe(
      (response:any) => { 
        this.register = response[0]; 
        const fechaParaInput = new Date(response[0].years).toISOString().substring(0, 10);
        this.register.years = fechaParaInput
      },
      (error) => { this.notifyToastService.showError("Prueba de nuevo más tarde.", "Ha ocurrido un error en nuestros servidores.") }
    ); 
  }

  private initForm() {
    if(this.register){
      this.registerForm = this.formBuilder.group({
        name: [this.register.name, [Validators.required]],
        mail: [this.register.mail, [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
        password: [this.register.password, [Validators.required]],
        password2: [this.register.password2, [Validators.required]],
        surname1: [this.register.surname1, [Validators.required]],
        surname2: [this.register.surname2, [Validators.required]],
        telephone: [this.register.telephone, [Validators.required]],
        gender: [this.register.gender, [Validators.required]],
        address: [this.register.address, [Validators.required]],
        zipCode: [this.register.zipCode, [Validators.required, Validators.pattern("[0-9]{5}")]],
        region: [this.register.region, [Validators.required]],
        country: [this.register.country, [Validators.required]],
        years: [this.register.years, [Validators.required]],
        billingAddress: [this.register.billingAddress, [Validators.required]],
        billingZipCode: [this.register.billingZipCode, [Validators.required, Validators.pattern("[0-9]{5}")]],
        billingRegion: [this.register.billingRegion, [Validators.required]],
        billingCountry: [this.register.billingCountry, [Validators.required]]
      });
    }
    this.service.gestionarValidarErrors(this.registerForm);
  }

  passwordValid(event:any) {
    this.passwordIsValid = event;
  }
  
  
  public checkPasswords(event: any){
    if(this.register.password === this.register.password2){
      this.registerForm.controls["password2"].setErrors(null);
    }
    else{
      this.registerForm.controls["password2"].setErrors({'notSamePassword': true});
    }
  }

  
  public checkYears(event: any){
    if(this.utils.calculateAge(event) >= 18 && this.utils.calculateAge(event) <= 100){
      this.registerForm.controls["years"].setErrors(null);
    }
    else{
      this.registerForm.controls["years"].setErrors({'ageError': true});
    }
  }

  public firstUpperCase(form:any, control:any){
    this.service.firstUpperCase(form, control)
  }


  public sameBilling(){
    this.sameBillingVal = !this.sameBillingVal;

    if(this.sameBillingVal){
      this.register.billingAddress = this.register.address;
      this.register.billingZipCode = this.register.zipCode;
      this.register.billingRegion = this.register.region;
      this.register.billingCountry = this.register.country;
    }

    else{
      this.register.billingAddress = '';
      this.register.billingZipCode = '';
      this.register.billingRegion = '';
      this.register.billingCountry = '';
      this.registerForm.controls["billingAddress"].markAsTouched();
      this.registerForm.controls["billingZipCode"].markAsTouched();
      this.registerForm.controls["billingRegion"].markAsTouched();
      this.registerForm.controls["billingCountry"].markAsTouched();
      this.registerForm.controls["billingAddress"].markAsDirty();
      this.registerForm.controls["billingZipCode"].markAsDirty();
      this.registerForm.controls["billingRegion"].markAsDirty();
      this.registerForm.controls["billingCountry"].markAsDirty();
      this.registerForm.controls["billingAddress"].setValue("");
      this.registerForm.controls["billingZipCode"].setValue("");
      this.registerForm.controls["billingRegion"].setValue("");
      this.registerForm.controls["billingCountry"].setValue("");
    }
  }

  async onSubmit(){
    await this.editUser()
  }
  
  async editUser(){
    this.userHttpService.editUser(this.register).subscribe(
      (response) => { 
        window.history.back(); // Obtener la URL de la última página visitada
        this.router.navigateByUrl(window.location.pathname); // Navegar a la última página visitada
        this.notifyToastService.showSuccess("y guardados con éxito.", "Datos editados")
      },
      (error) => { this.notifyToastService.showError("Prueba de nuevo más tarde.", "Ha ocurrido un error en nuestros servidores.") }
    ); 
  }
}
