import { Component, OnInit } from '@angular/core';
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
    private temporalService: TemporalService,
    private cartService: CartService
  ){}
  
  async ngOnInit() {
    await this.temporalService.obtenerVariableCarrito().subscribe(async (valor) => {
      this.cantidadProductos = !valor ? this.cartService.initVariableCarrito() : valor;
    });
  }
}
