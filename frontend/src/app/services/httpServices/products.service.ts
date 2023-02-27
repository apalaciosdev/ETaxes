import { HttpClient, HttpHeaders } from  '@angular/common/http';
import { Injectable } from  '@angular/core';
import { Router } from '@angular/router';


@Injectable({
  providedIn:  'root'
})

export class ProductsHttpService {

  private url = 'http://localhost:2022/api/products';
  
  constructor(private http: HttpClient) { }

  
  getProducts() {
    return this.http.get(this.url);
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
