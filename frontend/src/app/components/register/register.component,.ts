import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { User } from 'src/assets/models/user';
import { FormsService } from '../../services/forms.service';
import { UtilsService } from '../../services/utils.service';






@Component({
  selector: 'registerComponent',
  templateUrl: './register.component.html',
  providers: [] //Utilizamos el servicio aqui
  // styleUrls: ['./app.component.css']
})


export class RegisterComponent implements OnInit{
  public user: User;

  public registerForm!: FormGroup;
  public register: User;


  public hola: string = "";

  constructor(
    public readonly formBuilder: FormBuilder,
    public readonly service: FormsService,
    public readonly utils: UtilsService,
  ){
    this.register = {
      name: "",
      mail: "",
      password: "",
      password2: "",
      surname1: "",
      surname2: "",
      telephone: "",
      gender: "",
      years: new Date(),
      address: "",
      zipCode: "",
      region: "",
      country: "",
      billingAddress: "",
      billingZipCode: "",
      billingRegion: "",
      billingCountry: ""
    }; 
  }


  ngOnInit() {
    this.initForm()
    
  }


  private initForm() {
    if(this.register){
      this.registerForm = this.formBuilder.group({
        name: [this.register.name, [Validators.required]],
        mail: [this.register.mail, [Validators.required]],
        password: [this.register.password, [Validators.required]],
        password2: [this.register.password2, [Validators.required]],
        surname1: [this.register.surname1, [Validators.required]],
        surname2: [this.register.surname2, [Validators.required]],
        telephone: [this.register.telephone, [Validators.required]],
        gender: [this.register.gender, [Validators.required]],
        address: [this.register.address, [Validators.required]],
        zipCode: [this.register.zipCode, [Validators.required]],
        region: [this.register.region, [Validators.required]],
        country: [this.register.country, [Validators.required]],
        years: [this.register.country, [Validators.required]],
        billingAddress: [this.register.billingAddress, [Validators.required]],
        billingZipCode: [this.register.billingZipCode, [Validators.required]],
        billingRegion: [this.register.billingRegion, [Validators.required]],
        billingCountry: [this.register.billingCountry, [Validators.required]]
      });
    }

    this.service.gestionarValidarErrors(this.registerForm);
  }


  // Validation
  public validate() {
    var forms = document.querySelectorAll(".needs-validation");
    Array.prototype.slice.call(forms).forEach(function (form) {
      form.addEventListener(
        "submit",
        function (event: { preventDefault: () => void; stopPropagation: () => void; }) {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add("was-validated");
        },
        false
      );
    });
  }
  
  public checkPasswords(event: any){
    if(this.register.password === this.register.password2){
      this.registerForm.controls["password2"].setErrors(null)
    }
    else{
      this.registerForm.controls["password2"].setErrors({'notSamePassword': true})
    }
  }

  
  public checkYears(event: any){
    if(this.utils.calculateAge(event) >= 18 && this.utils.calculateAge(event) <= 100){
      this.registerForm.controls["years"].setErrors(null)
    }
    else{
      this.registerForm.controls["years"].setErrors({'ageError': true})
    }
  }

  

  

}
