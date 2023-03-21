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
}