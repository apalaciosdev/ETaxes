import { Component, EventEmitter, Input, OnInit, Output, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { User } from 'src/assets/models/user';





@Component({
  selector: 'spinnerComponent',
  templateUrl: './spinner.component.html',
  providers: [], //Utilizamos el servicio aqui
  styleUrls: ['./spinner.component.css']
})


export class SpinnerComponent implements OnInit{
 

  

  ngOnInit() {
    
  }
}
