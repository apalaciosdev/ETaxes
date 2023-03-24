import { Component } from '@angular/core';



@Component({
  selector: 'navbarComponent',
  templateUrl: './navbar.component.html',
  providers: [], //Utilizamos el servicio aqui
  styleUrls: ['./navbar.component.css']
})



export class NavbarComponent {
  title = 'Article by Jeetendra';
  posts : any;
  
  

}
