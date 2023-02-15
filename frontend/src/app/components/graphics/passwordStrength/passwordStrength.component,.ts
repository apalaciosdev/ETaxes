import { Component, EventEmitter, Input, OnInit, Output, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { User } from 'src/assets/models/user';





@Component({
  selector: 'passwordStrength',
  templateUrl: './passwordStrength.component.html',
  providers: [], //Utilizamos el servicio aqui
  styleUrls: ['./passwordStrength.css']
})


export class PasswordStrength implements OnInit{
  @Input() public passwordToCheck: string;
  @Output() passwordStrength = new EventEmitter<boolean>();
  bar0: string;
  bar1: string;
  bar2: string;
  bar3: string;

  msg = '';

  private colors = ['darkred', 'orangered', 'yellowgreen', '#a2ca28'];

  private static checkStrength(p:string) {
    let force = 0;
    const regex = /[$-/:-?{-~!"^_@`\[\]]/g;

    const lowerLetters = /[a-z]+/.test(p);
    const upperLetters = /[A-Z]+/.test(p);
    const numbers = /[0-9]+/.test(p);
    const symbols = regex.test(p);

    const flags = [lowerLetters, upperLetters, numbers, symbols];

    let passedMatches = 0;
    for (const flag of flags) {
      passedMatches += flag === true ? 1 : 0;
    }

    force += 2 * p.length + ((p.length >= 10) ? 1 : 0);
    force += passedMatches * 10;

    // short password
    force = (p.length <= 6) ? Math.min(force, 10) : force;

    // poor variety of characters
    force = (passedMatches === 1) ? Math.min(force, 10) : force;
    force = (passedMatches === 2) ? Math.min(force, 20) : force;
    force = (passedMatches === 3) ? Math.min(force, 30) : force;
    force = (passedMatches === 4) ? Math.min(force, 40) : force;

    return force;
  }

  ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
    const password = changes['passwordToCheck'].currentValue;
    this.setBarColors(4, '#DDD');
    if (password) {
      const c = this.getColor(PasswordStrength.checkStrength(password));
      this.setBarColors(c.idx, c.col);

      const pwdStrength = PasswordStrength.checkStrength(password);
      if( pwdStrength === 30 ||  pwdStrength === 40){
        this.passwordStrength.emit(true)
      }
      else{
        this.passwordStrength.emit(false)
      }

      switch (c.idx) {
        case 1:
          this.msg = 'Nada segura';
          break;
        case 2:
          this.msg = 'Poco segura';
          break;
        case 3:
          this.msg = 'Segura';
          break;
        case 4:
          this.msg = 'Muy segura';
          break;
      }
    } else {
      this.msg = '';
    }
  }


  private getColor(s:Number) {
    let idx = 0;
    if (s <= 10) {
        idx = 0;
    } else if (s <= 20) {
        idx = 1;
    } else if (s <= 30) {
        idx = 2;
    } else if (s <= 40) {
        idx = 3;
    } else {
        idx = 4;
    }
    return {
        idx: idx + 1,
        col: this.colors[idx]
    };
  }
  
  private setBarColors(count: number, col: string) {
    // for (let n = 0; n < count; n++) {
    //   // eval("this.bar" + n) = col;
    //   // this.b['ar' + n] = col;
    // }
    if(count === 0){
      this.bar0 = "";
      this.bar1 = "";
      this.bar2 = "";
      this.bar3 = "";
    }
    if(count === 1){
      this.bar0 = col;
      this.bar1 = "";
      this.bar2 = "";
      this.bar3 = "";
    }
    if(count === 2){
      this.bar0 = col;
      this.bar1 = col;
      this.bar2 = "";
      this.bar3 = "";
    }
    if(count === 3){
      this.bar0 = col;
      this.bar1 = col;
      this.bar2 = col;
      this.bar3 = "";
    }
    if(count === 4){
      this.bar0 = col;
      this.bar1 = col;
      this.bar2 = col;
      this.bar3 = col;
    }
  }
  
  


  ngOnInit() {
  
    
  }




  

}
