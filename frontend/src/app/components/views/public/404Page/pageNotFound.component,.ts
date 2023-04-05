import { Component } from '@angular/core';



@Component({
  selector: 'pageNotFoundComponent',
  templateUrl: './pageNotFound.component.html',
  // providers: [] //Utilizamos el servicio aqui
  styleUrls: ['./pageNotFound.component.css']
})



export class PageNotFoundComponent {
  title = 'Article by Jeetendra';
  posts : any;
  
  

}
