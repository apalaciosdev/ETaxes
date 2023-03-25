import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UtilsService {
 
  constructor(
    private translate: TranslateService
  ){}

  
  public calculateAge(dateString:any) {
    let today = new Date();
    let birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  public driveImages(url:string) {
    const arr = url.split('/');
    return `https://drive.google.com/uc?export=view&id=${arr[5]}`;
  }

  public maxShowText(text:string, index:number){
    if (text.length > index) {
      return text.slice(0, 15) + '...';
    }
    return text;
  }
}


