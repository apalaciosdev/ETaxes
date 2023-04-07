import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatNumber'
})
export class FormatNumberPipe implements PipeTransform {
  transform(value: number): string {
    // Convertimos el número a string para poder trabajar con él
    const strValue = value.toString();

    // Dividimos la cadena en dos partes separadas por el punto decimal
    const parts = strValue.split('.');
    const integerPart = parts[0];
    const decimalPart = parts[1];

    // Agregamos los puntos separadores de miles al número entero
    let formattedValue = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    // Si hay parte decimal, la agregamos con comillas simples
    if (decimalPart) {
      formattedValue += `,${decimalPart}`;
    }

    // Agregamos el símbolo de la moneda
    formattedValue += '€';

    // Retornamos el valor formateado
    return formattedValue;
  }
}