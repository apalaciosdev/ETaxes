import { HttpClient, HttpHeaders } from  '@angular/common/http';
import { Injectable } from  '@angular/core';


@Injectable({
  providedIn:  'root'
})

export class OffersHttpService {

  private url = 'http://localhost:2022/api/offers';
  
  constructor(private http: HttpClient) { }

  
  getOffers(token:any) {
    return this.http.get(this.url, {
      headers: new HttpHeaders({
        'Authorization': 'my-auth-token',
        'x-token': token
      })
    });
  }
  
  postOffer(offer: any, token:any){
    return this.http.post(`${this.url}`, offer, {
      headers: new HttpHeaders({
        'Authorization': 'my-auth-token',
        'x-token': token
      })
    });
  }

  deleteOffer(offerId: any, token:string){
    return this.http.delete(`${this.url}/${offerId}`, {
      headers: new HttpHeaders({
        'Authorization': 'my-auth-token',
        'x-token': token
      })
    });
  }

  activateOffer(offerId: any, mail:string, token: any){
    return this.http.post(`${this.url}/activate/${offerId}`, {"mail": mail}, {
      headers: new HttpHeaders({
        'Authorization': 'my-auth-token',
        'x-token': token
      })
    });
  }
  
  salesData(mail: string){
    return this.http.post(`${this.url}/salesData`, {"mail": mail});
  }
}
