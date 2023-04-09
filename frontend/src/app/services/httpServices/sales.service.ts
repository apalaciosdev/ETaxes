import { HttpClient, HttpHeaders } from  '@angular/common/http';
import { Injectable } from  '@angular/core';

@Injectable({
  providedIn:  'root'
})

export class SalesHttpService {

  private url = 'http://localhost:2022/api/sales';
  
  constructor(private http: HttpClient) { }

  
  getSales() {
    return this.http.get(this.url);
  }
  
  postSale(sale: any, token:any){
    return this.http.post(`${this.url}`, sale, {
      headers: new HttpHeaders({
        'Authorization': 'my-auth-token',
        'x-token': token
      })
    });
  }
  
  salesData(mail: string, token:any){
    return this.http.post(`${this.url}/salesData`, {"mail": mail}, {
      headers: new HttpHeaders({
        'Authorization': 'my-auth-token',
        'x-token': token
      })
    });
  }
}
