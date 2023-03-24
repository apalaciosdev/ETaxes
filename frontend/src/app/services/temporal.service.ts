import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TemporalService {
  variableTemporal: any;
  private variableTemporalSubject = new BehaviorSubject<any>(null);

  actualizarVariableTemporal(valor: any) {
    this.variableTemporal = valor;
    this.variableTemporalSubject.next(valor);
  }

  obtenerVariableTemporal() {
    return this.variableTemporalSubject.asObservable();
  }



  //Carrito
  variableCarrito: Number = 0;
  public variableCarritoSubject = new BehaviorSubject<any>(null);

  actualizarVariableCarrito(valor: any) {
    console.log(valor)
    this.variableCarrito = valor;
    this.variableCarritoSubject.next(valor);
  }

  sumVariableCarrito(valor?: any) {
    this.variableCarrito = (Number(this.variableCarrito) + 1);
    this.variableCarritoSubject.next(this.variableCarrito);
  }

  resVariableCarrito(valor?: any) {
    this.variableCarrito = (Number(this.variableCarrito) - 1);
    this.variableCarritoSubject.next(this.variableCarrito);
  }

  obtenerVariableCarrito() {
    return this.variableCarritoSubject.asObservable();
  }
}