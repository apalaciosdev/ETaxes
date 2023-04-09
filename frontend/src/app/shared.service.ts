import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private userTokenSubject = new BehaviorSubject<any>(null);
  userToken$ = this.userTokenSubject.asObservable();

  setUserToken(userToken: any) {
    this.userTokenSubject.next(userToken);
  }
}
