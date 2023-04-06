import { HttpClient, HttpHeaders } from  '@angular/common/http';
import { Injectable } from  '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../../assets/models/product';


@Injectable({
  providedIn:  'root'
})

export class OffersHttpService {

  private url = 'http://localhost:2022/api/offers';
  
  constructor(private http: HttpClient) { }

  
  getOffers() {
    return this.http.get(this.url);
  }
  
  postOffer(offer: any){
    return this.http.post(`${this.url}`, offer);
  }

  deleteOffer(offerId: any){
    return this.http.delete(`${this.url}/${offerId}`);
  }

  activateOffer(offerId: any){
    return this.http.get(`${this.url}/activate/${offerId}`);
  }
  
  salesData(mail: string){
    return this.http.post(`${this.url}/salesData`, {"mail": mail});
  }
  
  // deleteProduct(uid: string){
  //   return this.http.delete(`http://localhost:2022/api/products/${uid}`, {
  //     headers: new HttpHeaders({
  //       'Authorization': 'my-auth-token',
  //       'x-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MjZhNDIyYzYxZTRiMDZjN2JmZDMzMDciLCJpYXQiOjE2NTIxNzg1MjgsImV4cCI6MTY1MjE5MjkyOH0.BulLtKsBrNwwNt67W35k0DdGfYK6LhZA7wuO0ZAXKH4'
  //     })
  //   });
  // }


  
  // async reloadComponent(router: Router) {
  //   let currentUrl = router.url;
  //   router.routeReuseStrategy.shouldReuseRoute = () => false;
  //   router.onSameUrlNavigation = 'reload';
  //   router.navigate([currentUrl]);
  // }

}
