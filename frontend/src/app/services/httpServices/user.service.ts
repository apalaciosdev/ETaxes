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
}
