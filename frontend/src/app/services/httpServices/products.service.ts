import { HttpClient, HttpHeaders } from  '@angular/common/http';
import { Injectable } from  '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../../assets/models/product';


@Injectable({
  providedIn:  'root'
})

export class ProductsHttpService {

  private url = 'http://localhost:2022/api/products';
  
  constructor(private http: HttpClient) { }

  
  getProducts() {
    return this.http.get(this.url);
  }
  
  getProduct(id:any) {
    return this.http.get(`${this.url}/product/${id}`);
  }
  
  getUserProducts(user:any) {
    return this.http.post(`${this.url}/userProducts`, {"user": user});
  }
  
  postProduct(product: Product){
    return this.http.post(`${this.url}`, product);
  }
  
  putProduct(product: Product, id:any){
    return this.http.put(`${this.url}/${id}`, product);
  }
  
  checkUserHaveProduct(user:any, productId:any){
    return this.http.post(`${this.url}/checkUserHaveProduct`, {"user": user, "productId": productId});
  }
  
  deleteProduct(productId:any){
    return this.http.delete(`${this.url}/${productId}`);
  }

  countProducts(mail: string, token:any){
    return this.http.post(`${this.url}/countProducts`, {"mail": mail}, {
      headers: new HttpHeaders({
        'Authorization': 'my-auth-token',
        'x-token': token
      })
    });
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
