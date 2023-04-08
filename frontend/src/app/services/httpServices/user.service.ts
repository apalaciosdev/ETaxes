import { HttpClient, HttpHeaders } from  '@angular/common/http';
import { Injectable } from  '@angular/core';
import { Router } from '@angular/router';
import { Login, User } from 'src/assets/models/user';

@Injectable({
  providedIn:  'root'
})

export class UserHttpService {

  private url = 'http://localhost:2022/api/auth';
  
  constructor(private http: HttpClient) { }

  // getPosts() {
  //   return this.http.get(this.url);
  // }

  // deleteProduct(uid: string){
  //   return this.http.delete(`http://localhost:2022/api/products/${uid}`, {
  //     headers: new HttpHeaders({
  //       'Authorization': 'my-auth-token',
  //       'x-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MjZhNDIyYzYxZTRiMDZjN2JmZDMzMDciLCJpYXQiOjE2NTIxNzg1MjgsImV4cCI6MTY1MjE5MjkyOH0.BulLtKsBrNwwNt67W35k0DdGfYK6LhZA7wuO0ZAXKH4'
  //     })
  //   });
  // }

  register(user: User){
    return this.http.post(`${this.url}/register`, user)
  }

  login(login: Login){
    return this.http.post(`${this.url}/login`, login)
  }

  getUserData(mail: any){
    return this.http.post(`http://localhost:2022/api/users/getUserInfo`, {"mail": mail})
  }

  editUser(user: any){
    return this.http.put(`http://localhost:2022/api/users`, user)
  }

  
  // async reloadComponent(router: Router) {
  //   let currentUrl = router.url;
  //   router.routeReuseStrategy.shouldReuseRoute = () => false;
  //   router.onSameUrlNavigation = 'reload';
  //   router.navigate([currentUrl]);
  // }

}
