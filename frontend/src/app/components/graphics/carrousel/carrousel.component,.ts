import { Component, Input, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/services/utils.service';



@Component({
  selector: 'carrouselComponent',
  templateUrl: './carrousel.component.html',
  providers: [], //Utilizamos el servicio aqui
  styleUrls: ['./carrousel.component.css']
})



export class CarrouselComponent implements OnInit {
  @Input() public products: any;
  
  constructor(
    public utilsService: UtilsService
  ){}

  ngOnInit(): void {
  }
  

}
