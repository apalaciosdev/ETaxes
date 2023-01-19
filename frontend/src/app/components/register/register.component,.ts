import { Component } from '@angular/core';
import { User } from 'src/assets/models/user';


import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'registerComponent',
  templateUrl: './register.component.html',
  providers: [] //Utilizamos el servicio aqui
  // styleUrls: ['./app.component.css']
})


export class RegisterComponent {
  public user: User;

  constructor(translate: TranslateService){
    this.user = new User("", 0, "", "", "");

    translate.use('es');
  }


  ngOnInit() {
    
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
