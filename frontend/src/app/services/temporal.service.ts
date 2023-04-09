import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TemporalService {
  //Carrito
  variableCarrito: Number = 0;
  public variableCarritoSubject = new BehaviorSubject<any>(null);
  private variableTemporalSubject = new BehaviorSubject<any>(null);
  variableTemporal: any;

  actualizarVariableTemporal(valor: any) {
    this.variableTemporal = valor;
    this.variableTemporalSubject.next(valor);
  }

  obtenerVariableTemporal() {
    return this.variableTemporalSubject.asObservable();
  }


  actualizarVariableCarrito(valor: any) {
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