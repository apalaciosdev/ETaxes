import { Component } from '@angular/core';



@Component({
  selector: 'homeComponent',
  templateUrl: './home.component.html',
  providers: [], //Utilizamos el servicio aqui
  styleUrls: ['./home.component.css']
})



export class HomeComponent {
  title = 'Article by Jeetendra';
  posts : any;
  
  

}
