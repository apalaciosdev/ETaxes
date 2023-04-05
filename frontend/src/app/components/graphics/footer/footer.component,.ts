import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/localStorage.service';
import { TemporalService } from 'src/app/services/temporal.service';
import { CartService } from 'src/app/services/cart.service';



@Component({
  selector: 'footerComponent',
  templateUrl: './footer.component.html',
  providers: [], //Utilizamos el servicio aqui
  styleUrls: ['./footer.component.css']
})



export class FooterComponent implements OnInit{
  cantidadProductos:Number = this.cartService.initVariableCarrito();

  
  
  constructor(
    private localStorageService: LocalStorageService,
    private temporalService: TemporalService,
    private cartService: CartService
  ){}
  

  async ngOnInit() {
    await this.temporalService.obtenerVariableCarrito().subscribe(async (valor) => {
      this.cantidadProductos = !valor ? this.cartService.initVariableCarrito() : valor;
    });
  }

}
