import { Component, EventEmitter, Input, OnInit, Output, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { User } from 'src/assets/models/user';





@Component({
  selector: 'starRatingComponent',
  templateUrl: './starRating.component.html',
  providers: [], //Utilizamos el servicio aqui
  styleUrls: ['./starRating.component.css']
})


export class StarRating implements OnInit{
  @Input() public stars: any;
  intStars = 0;
  // @Output() passwordStrength = new EventEmitter<boolean>();
  // bar0: string;
  // bar1: string;
  // bar2: string;
  // bar3: string;

  msg = '';



  ngOnChanges(): void {
   
   
  }


  ngOnInit() {
    this.intStars = Number(this.stars);
  }
}
