import { Component, EventEmitter, Input, OnInit, Output, SimpleChange } from '@angular/core';

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
