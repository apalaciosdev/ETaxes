import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatNumber'
})
export class FormatNumberPipe implements PipeTransform {
  transform(value: number | string): string {
    const numberValue = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(numberValue)) {
      return '-';
    }
    const formattedValue = new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(numberValue);
    return formattedValue.replace(',00', '');
  }
}