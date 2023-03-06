import { Component } from '@angular/core';



@Component({
  selector: 'carrouselComponent',
  templateUrl: './carrousel.component.html',
  providers: [], //Utilizamos el servicio aqui
  styleUrls: ['./carrousel.component.css']
})



export class CarrouselComponent {
  title = 'Article by Jeetendra';
  posts : any;
  
  

}
