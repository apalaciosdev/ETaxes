import { HttpClient, HttpHeaders } from  '@angular/common/http';
import { Injectable } from  '@angular/core';
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
  
  getUserProducts(user:any, token: any) {
    return this.http.post(`${this.url}/userProducts`, {"user": user}, {
      headers: new HttpHeaders({
        'Authorization': 'my-auth-token',
        'x-token': token
      })
    });
  }
  
  postProduct(product: Product, token:any){
    return this.http.post(`${this.url}`, product, {
      headers: new HttpHeaders({
        'Authorization': 'my-auth-token',
        'x-token': token
      })
    });
  }
  
  putProduct(product: Product, id:any, token:any){
    return this.http.put(`${this.url}/${id}`, product, {
      headers: new HttpHeaders({
        'Authorization': 'my-auth-token',
        'x-token': token
      })
    });
  }
  
  checkUserHaveProduct(user:any, productId:any){
    return this.http.post(`${this.url}/checkUserHaveProduct`, {"user": user, "productId": productId});
  }
  
  deleteProduct(productId:any, token:any){
    return this.http.delete(`${this.url}/${productId}`, {
      headers: new HttpHeaders({
        'Authorization': 'my-auth-token',
        'x-token': token
      })
    });
  }

  countProducts(mail: string, token:any){
    return this.http.post(`${this.url}/countProducts`, {"mail": mail}, {
      headers: new HttpHeaders({
        'Authorization': 'my-auth-token',
        'x-token': token
      })
    });
  }

}
