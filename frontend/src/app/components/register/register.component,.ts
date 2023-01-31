import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { User } from 'src/assets/models/user';
import { FormsService } from '../../services/forms.service';






@Component({
  selector: 'registerComponent',
  templateUrl: './register.component.html',
  providers: [] //Utilizamos el servicio aqui
  // styleUrls: ['./app.component.css']
})


export class RegisterComponent implements OnInit{
  public user: User;

  public registerForm!: FormGroup;

  public paramsModal: {
    name: string,
    surname1: string,

  
  };

  public hola: string = "";

  constructor(
    public readonly formBuilder: FormBuilder,
    public readonly service: FormsService,
  ){
    this.user = new User("", 0, "", "", "");

    
  }


  ngOnInit() {
    this.initForm()
    
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      // surname1: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
      // surname2: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
      
      
    });
  
  
  
    this.service.gestionarValidarErrors(this.registerForm);
  }


  private initForm() {

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
  
  public test(event: any){
    var forms = document.querySelectorAll(".needs-validation");
    Array.prototype.slice.call(forms).forEach(function (form) {
      form.addEventListener(
        "submit",
        function (event: { preventDefault: () => void; stopPropagation: () => void; }) {
          console.log(event)
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add("was-validated");
        },
        false
      );
    });
    console.log(event)
  }

  

  

}
