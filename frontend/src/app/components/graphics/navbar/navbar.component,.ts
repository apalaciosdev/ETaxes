import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/localStorage.service';
import { TemporalService } from 'src/app/services/temporal.service';



@Component({
  selector: 'navbarComponent',
  templateUrl: './navbar.component.html',
  providers: [], //Utilizamos el servicio aqui
  styleUrls: ['./navbar.component.css']
})



export class NavbarComponent implements OnInit{
  cantidadProductos:Number = 0;

  
  
  constructor(
    private localStorageService: LocalStorageService,
    private temporalService: TemporalService
  ){}
  

  async ngOnInit() {
    await this.temporalService.obtenerVariableCarrito().subscribe(async (valor) => {
      this.cantidadProductos = valor;
    });
  }

}
