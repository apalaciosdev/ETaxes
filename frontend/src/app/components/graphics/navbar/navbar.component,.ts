import { Component, OnInit } from '@angular/core';
import { TemporalService } from 'src/app/services/temporal.service';
import { CartService } from 'src/app/services/cart.service';
import { AuthService } from 'src/app/services/auth.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Router } from '@angular/router';
import { ReloadService } from '../../../services/reloadService.service';



@Component({
  selector: 'navbarComponent',
  templateUrl: './navbar.component.html',
  providers: [], //Utilizamos el servicio aqui
  styleUrls: ['./navbar.component.css']
})



export class NavbarComponent implements OnInit{
  cantidadProductos:Number = this.cartService.initVariableCarrito();
  isLogged:Boolean = false;
  
  constructor(
    private temporalService: TemporalService,
    private cartService: CartService,
    private authService: AuthService,
    public utilsService: UtilsService,
    public router: Router,
    public reloadService: ReloadService,
  ){}
  

  async ngOnInit() {
    //Cada vez que se haga login o logout, tenemos un "observador" que capta este evento y automáticamente modifica el navbar.
    //Esto se hace para que un usuario no autenticado no tenga acceso al navbar de un usuario que sí está autenticado
    this.reloadService.reloadComponent.subscribe(res => {
      if (res) {
        this.isLogged = true;
      }
    });

    await this.temporalService.obtenerVariableCarrito().subscribe(async (valor) => {
      this.cantidadProductos = !valor ? this.cartService.initVariableCarrito() : valor;
    });
    this.isLogged = await this.authService.isLogged();
  }

  logout(){
    this.authService.logout()
    this.isLogged = false;
  }

}
