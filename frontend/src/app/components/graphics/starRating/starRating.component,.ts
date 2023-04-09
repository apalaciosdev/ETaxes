import { Component, EventEmitter, Input, OnInit, Output, SimpleChange } from '@angular/core';

@Component({
  selector: 'starRatingComponent',
  templateUrl: './starRating.component.html',
  providers: [], //Utilizamos el servicio aqui
  styleUrls: ['./starRating.component.css']
})


export class StarRating implements OnInit{
  @Input() public stars: any;
  intStars = 0;
  msg = '';

  ngOnInit() {
    this.intStars = Number(this.stars);
  }
}
